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
    var linkVideos, iframeVideos, paramVideos, videos;
    var parser = function(target, property) {
        var $frames = $(target);
        var ids = [], url, match, i;
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

        for (i = 0; i < $frames.length; i++) {
            url = $frames[i][property];
            match = url.match(regExp);

            if (match && match[7].length == 11) {
                ids.push(match[7]);
            }
        }

        return ids;
    }

    linkVideos = parser('a', 'href');
    iframeVideos = parser('iframe', 'src');
    paramVideos = parser('param', 'value');

    videos = _.union(linkVideos, iframeVideos, paramVideos);

    return videos;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.message === "parse") {
        parse();
    }
});

