chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        window.videos = request.videos;
        window.pageTitle  = request.title;

        // Badge
        var videoNum = window.videos.length;

        var colorPattern;
        if (videoNum == 0) {
            colorPattern = [128, 128, 128, 255];
        } else {
            colorPattern = [255, 0, 0, 255];
        }

        var tabId = sender.tab.id;
        var text = {"text": (String)(videoNum), "tabId": tabId};
        var color = {"color": colorPattern, "tabId": tabId};

        chrome.browserAction.setBadgeText(text);
        chrome.browserAction.setBadgeBackgroundColor(color);

        sendResponse({});
    }
);

chrome.tabs.onSelectionChanged.addListener(function(tabId, opt) {

    var request = {};
    request.message = "parse";

    chrome.tabs.sendRequest(tabId, request, function(){
       //callback
    });

});


