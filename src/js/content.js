parse();

function parse()
{
    var videos = parseYoutubeLinks();
    chrome.extension.sendRequest(videos);
}

function parseYoutubeLinks()
{
    var parser = function(target, property) {
        $frames = $(target);
        var ids = [];
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

        for (var i=0; i<$frames.length; i++) {
            var url = $frames[i][property];
            var match = url.match(regExp);

            if (match && match[7].length==11){
                ids.push(match[7]);
            }
        }

        return ids;
    }

    linkVideos = parser('a', 'href');
    iframeVideos = parser('iframe', 'src');

    videos = _.union(linkVideos, iframeVideos);

    return videos;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.message === "parse") {
        parse();
    }
});
