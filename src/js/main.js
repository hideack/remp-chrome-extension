var RempExtension = (function(){
    var _videos = null;         // ページ中から見つけられたYouTube動画情報
    var _pageTitle = '';        // ページタイトル

    return {
        init: function(){
            console.log("Initialize (main.js)");
            _videos = chrome.extension.getBackgroundPage().videos;
            _pageTitle = chrome.extension.getBackgroundPage().pageTitle;
        },
        render: function(){
            var template = $('#contents_template')[0].innerText;
            var compiled = _.template(template);
            var params = {videos: _videos, title: _pageTitle};
            console.log(params);
            $("#contents").html(compiled(params));
        }
    }
})();

RempExtension.init();
$("#contents").ready(function(){
    RempExtension.render();
});

