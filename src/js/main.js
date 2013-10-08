var RempExtension = (function(){
    var _login     = false;  // REMPへのログイン状態
    var _videos    = null;   // ページ中から見つけられたYouTube動画情報
    var _pageTitle = '';     // ページタイトル
    var _videoIds  = '';     // ページ中動画のVideo IDを連結した文字列
    return {
        init: function(){
            _videos = chrome.extension.getBackgroundPage().videos;
            _pageTitle = chrome.extension.getBackgroundPage().pageTitle;

            if (_videos.length > 0) {
                _videoIds = _videos.join('|');
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
                    var params = {
                        videos: _videos,
                        title: _pageTitle,
                        videoIds: _videoIds,
                        login: _login
                    };
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

