parse();

function parse() {
    var title = function() {
        var windowTitle = document.title;

        if (windowTitle.length > 20) {
            windowTitle  = windowTitle.substr(0, 20);
            windowTitle += '...';
        }

        return windowTitle;
    };

    var videos = parseYoutubeLinks();
    var parseProperty = {
        videos: videos,
        title: title()
    };

    chrome.extension.sendRequest(parseProperty);
}

function parseYoutubeLinks() {
    var linkVideos, iframeVideos, paramVideos, thumbnails, scriptVideos, videos;
    var parser = function(target, property) {
        var $frames = $(target);
        var ids = [], url, match, i, regExp, matchPoint;

        if (target == 'img') {
            regExp = /^http.*\/\/(i[0-9]?\.ytimg\.com)\/(vi)\/(.*)\/.*\.jpg$/;
            matchPoint = 3;
        } else {
            regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            matchPoint = 7;
        }

        for (i = 0; i < $frames.length; i++) {
            url = $frames[i][property];
            match = url.match(regExp);

            if (match && match[matchPoint].length === 11) {
                ids.push(match[matchPoint]);
            }
        }

        return ids;
    };

    var scriptParser = function() {

        var $scripts = $('script'),
            ids = [], regExp;

        regExp = /^.*http.*\/\/www\.youtube\.com\/v\/(.*?)".*/;

        $scripts.each(function() {
            var script = $(this).text(),
                lines = script.split('},');
            $.each(lines, function() {
                var line = this.replace(/[\r\n]/g, ''),
                    match = line.match(regExp);
                if (match && match[1].length === 11) {
                    ids.push(match[1]);
                }
            });
        });

        return ids;
    };

    linkVideos   = parser('a', 'href');
    iframeVideos = parser('iframe', 'src');
    paramVideos  = parser('param', 'value');
    thumbnails   = parser('img', 'src');
    scriptVideos = scriptParser();

    videos = _.union(
        linkVideos,
        iframeVideos,
        paramVideos,
        thumbnails,
        scriptVideos
    );

    return videos;
}

chrome.extension.onRequest.addListener(function(request) {
    if (request.message === "parse") {
        parse();
    }
});

