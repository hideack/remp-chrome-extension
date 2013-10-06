var RempExtension = (function(){
    var _videos    = null;         // ページ中から見つけられたYouTube動画情報
    var _pageTitle = '';        // ページタイトル
    var _plugin    = '';     // プラグイン用
    return {
        init: function(){
            console.log("Initialize (main.js)");
            _videos = chrome.extension.getBackgroundPage().videos;
            _pageTitle = chrome.extension.getBackgroundPage().pageTitle;

            if(_videos.length > 0) {
                videoParams = _videos.join('|');
                _plugin = "<iframe width=250px height=80px src='http://www.remp.jp/plugins/appendlibrary/" + _pageTitle + "/" + videoParams + "'></iframe>";
            }
        },
        render: function(){
            var template = $('#contents_template')[0].innerText;
            var compiled = _.template(template);
            var params = {videos: _videos, title: _pageTitle, plugin: _plugin};
            console.log(params);
            $("#contents").html(compiled(params));
        }
    }
})();

RempExtension.init();
$("#contents").ready(function(){
    RempExtension.render();
});

