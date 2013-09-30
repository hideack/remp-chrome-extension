chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        window.videos = request;
        sendResponse({});
    }
);
