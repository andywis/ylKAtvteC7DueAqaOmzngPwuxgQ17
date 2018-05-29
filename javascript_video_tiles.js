

/*

You will need the following CSS:

    <!-- Original size 320 x 180  (Ratio: 1 : 0.5625)
    224 x 126 size works OK.
    4 tiles fit in 940 -->
    <style>
        .youtube-tile {cursor:pointer; width:233px; height:131px; }
        .youtube-tile div.yt-2 {position: relative }
        .youtube-tile div.yt-2 img {position: absolute; left:0; top:0; width:233px; height:131px; }
        .youtube-tile div.yt-2 div.yt-3 {position:absolute; left:10px; top:10px; color:white; font-family: sans-serif; 
            font-size: 14pt; background-color: rgba(0,0,0,0.3); padding-left: 3px; padding-right: 3px; }
        .end-of-tiles {clear:both; }
        div#right-margin {position:absolute; top:50px; right: 5px; width:180px; }
        #popup-outer {position:fixed; display:none; top:0px;left:0px;right:0px;bottom:0px; padding:5px;
            background-color: rgba(25, 25, 25, 0.8); height:99% }
        #popup-inner-1 {position:relative; background-color:black; color:white; margin: 10px 40px;  }
        #popup-inner-2-yt {padding: 50px 50px 50px 200px; }
    </style>

You will need the following HTML at the end of your document

<div id="popup-outer" style="">
    <div id="popup-inner-1" style="">
        <div>
            <span style="float:right;padding: 5px;" onclick="hide_popup();" title="click to close">&#10005; <!--CLOSE--></span>
        </div>
        <div id="popup-inner-2-yt">
        </div>
    </div>
</div> <!-- /id=popup-outer -->


To copy the video image for a particular youtube video: 

    to find the video still, search in the browser inspector for the video 
    and look for the IMG resources called hqdefault.jpg?......
    (remove the query string part to convert from webp to jpg)
    save it to images/ and rename it with the name of the video ID.
*
*/
function tile(title, videoId, keys, endTitle='', newWindow=false, image_file='') {
    if (endTitle == '') {
        endTitle = title;
    }
    if (image_file == '') {
        image_file = 'images/' + videoId + '.jpg';
    }
    var videoUrl = 'https://youtu.be/' + videoId;
    var html;

    html = '<div class="tile" data-title="' + title + '">';
    if (newWindow) {
        html += '<div class="youtube-tile" onclick="open_new_window(\'' + videoUrl + '\');">';
    }else{
        html += '<div class="youtube-tile" onclick="show_youtube(\'' + videoId + '\');">';
    }
    html +=        '<div class="yt-2">';
    html +=            '<img src="' + image_file + '" />';
    html +=            '<div class="yt-3">' + title + '</div>';
    html +=        '</div>';
    html +=     '</div>';
    html +=     '<a href="' + videoUrl + '" target="_blank">Video</a> ';
    html +=     endTitle + ' <span style="white-space:nowrap;">( ' + keys + ' )</span>';
    html += '</div>';
    document.write(html);
}


function endOfTiles() {
    html = '<div class="end-of-tiles"></div>';
    document.write(html);
}


function show_youtube(youtubeId) {
    document.getElementById('popup-outer').style.display="block";
    document.getElementById('popup-inner-2-yt').innerHTML = 
        '<iframe ' +
        'width="560" ' +
        'height="315" ' +
        'src="https://www.youtube.com/embed/' + youtubeId + '?rel=0" ' +
        'frameborder="0" ' +
        'allowfullscreen>' +
        '</iframe>';
    return false;
}


function hide_popup() {
    document.getElementById('popup-outer').style.display="none";
    document.getElementById('popup-inner-2-yt').innerHTML = '';
    return false;
}


function open_new_window(url) {
    // w=660, h=540 seems to work with Youtube
    window.open(url, "_blank",
        "toolbar=no,scrollbars=yes,resizable=yes,menubar=no,top=200,left=200,width=660,height=540");
    return false;

}
