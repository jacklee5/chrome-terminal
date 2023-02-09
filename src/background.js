// chrome.omnibox.onInputChanged.addListener(text => {
//     chrome.omnibox.setDefaultSuggestion("yuhyuyhyuh")
// })

// desired behavior: you can set the root folder when you click the extension icon
chrome.omnibox.setDefaultSuggestion({
    description: "bruh"
})
chrome.omnibox.onInputEntered.addListener(text => {
    console.log("yuh");
});
chrome.bookmarks.getTree(tree => console.log(tree));