var RempExtension = (function(){
    var _videos = null;         // ページ中から見つけられたYouTube動画情報
    var _pageTitle = '';        // ページタイトル
    var _videosString = '';     // ページ中から見つけられたYouTube動画IDを|で連結したもの
    return {
        init: function(){
            console.log("Initialize (main.js)");
            _videos = chrome.extension.getBackgroundPage().videos;
            _pageTitle = chrome.extension.getBackgroundPage().pageTitle;

            if(_videos.length > 0) {
                _videosString = _videos.join('|');
            }
        },
        render: function(){
            var template = $('#contents_template')[0].innerText;
            var compiled = _.template(template);
            var params = {videos: _videos, title: _pageTitle, videos_string: _videosString};
            console.log(params);
            $("#contents").html(compiled(params));
        }
    }
})();

RempExtension.init();
$("#contents").ready(function(){
    RempExtension.render();
});

