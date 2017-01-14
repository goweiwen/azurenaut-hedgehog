// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        var img = Array.from(document.getElementsByTagName('img'));
        img = img.filter(element => element.width >= 200 && element.height >= 200);
        var src = img.map(element => element.src);
        sendResponse(src);
    }
});