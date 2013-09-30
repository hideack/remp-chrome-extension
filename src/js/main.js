var RempExtension = (function(){
    var _videos = null;

    return {
        init: function(){
            console.log("Initialize (main.js)");
            _videos = chrome.extension.getBackgroundPage().videos;
            console.log(_videos);
        },
        currentPageProperty: function(){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var current = tabs[0];
                console.log(current);
                chrome.extension.sendRequest({greeting: "hello"}, function(response) {
                    console.log(response.farewell);
                });
            });
        }
    }
})();

RempExtension.init();

