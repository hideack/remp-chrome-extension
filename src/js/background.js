chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        window.videos = request;
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

