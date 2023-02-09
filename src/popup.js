console.log = (text) => {
    document.getElementById("console").textContent = text;
}

function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "32");
    return url.toString();
}

const rootEl = document.getElementById("root");

class Item {
    constructor(title, url, parent, level) {
        this.level = (parent?.level || 0) + 1;
        this.el = document.createElement("div");
        this.el.className = "item";
        this.el.style.paddingLeft = (8 * this.level) + "px";
        if (url !== "folder") {
            const favicon = document.createElement("img");
            favicon.src = faviconURL(url);
            favicon.height = 16;
            this.el.appendChild(favicon);
        } else {
            title = "📁 " + title
        }
        const text = document.createTextNode(title);
        this.el.appendChild(text);
        rootEl.appendChild(this.el);       
    }
}

function renderTree(root, parent) {
    if (root.children) { // is a folder
        const item = new Item(root.title, "folder", parent);
        root.children.map(el => renderTree(el, item));
        return item;
    } else { // is a bookmark
        const item = new Item(root.title, root.url, parent);
        return item;
    }
}

// load
chrome.bookmarks.getTree()
.then(([root]) => {
    for (const child of root.children) {
        renderTree(child);
    }
});