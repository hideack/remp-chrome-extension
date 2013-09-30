parseYoutubeLinks();

function parse()
{
    var videos = parseYoutubeLinks();
    chrome.extension.sendRequest(videos);
}

function parseYoutubeLinks()
{
    console.log("--- content.js ---");
    $frames = $('iframe');

    var videos = [];
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

    for (var i=0; i<$frames.length; i++) {
        var url = $frames[i].src;
        var match = url.match(regExp);

        if (match && match[7].length==11){
            var video = {};
            video.videoId = match[7];
            video.rawUrl = url;

            videos.push(video);
        }
    }

    console.log(videos);
    return videos;
}

