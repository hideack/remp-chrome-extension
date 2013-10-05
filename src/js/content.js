parse();

function parse()
{
    var videos = parseYoutubeLinks();
    chrome.extension.sendRequest(videos);
}

function parseYoutubeLinks()
{
    console.log("--- content.js ---");

    var parser = function(target, property) {
        $frames = $(target);
        var ids = [];
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

        for (var i=0; i<$frames.length; i++) {
            var url = $frames[i][property];
            var match = url.match(regExp);

            if (match && match[7].length==11){
                var video = {};
                video.videoId = match[7];
                video.rawUrl = url;

                ids.push(video);
            }
        }

        return ids;
    }

    videos = parser('a', 'href');
    iframeVideos = parser('iframe', 'src');

    for (var i=0; i<iframeVideos.length; i++) {
        videos.push(iframeVideos[i]);
    }

    console.log(videos);
    return videos;
}


