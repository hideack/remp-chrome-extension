var RempExtension = (function(){
    var _login     = false;  // REMPへのログイン状態
    var _videos    = null;   // ページ中から見つけられたYouTube動画情報
    var _pageTitle = '';     // ページタイトル
    var _plugin    = '';     // プラグイン用
    return {
        init: function(){
            _videos = chrome.extension.getBackgroundPage().videos;
            _pageTitle = chrome.extension.getBackgroundPage().pageTitle;

            if(_videos.length > 0) {
                videoParams = _videos.join('|');
                _plugin = "<iframe width=250px height=80px src='http://www.remp.jp/plugins/appendlibrary/" + _pageTitle + "/" + videoParams + "'></iframe>";
            }

        },
        render: function(){
            $.getJSON("http://www.remp.jp/api/status/login", function(){
                _login = true;
            })
            .fail(function(){
                _login = false;
            })
            .always(function(){
                $.get("/template/popup_content.html", function(template){
                    var compiled = _.template(template);
                    var params = {videos: _videos, title: _pageTitle, plugin: _plugin, login: _login};
                    $("#contents").html(compiled(params));
                });
            });
        },
        link: function(url, selected) {
            chrome.tabs.create({
                'url': url,
                'selected': selected
            });
        }
    }
})();

RempExtension.init();
$("#contents").ready(function(){
    RempExtension.render();
});

