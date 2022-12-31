$(document).ready(function () {
    var key = config.SECRET_KEY;
    var playlistId = 'UUS_hnpJLQTvBkqALgapi_4g'; //sbskpop
    startLoad(playlistId);

    const today = new Date().toISOString().slice(0, 10);

    $('#channel').change(function () {
        $('main').empty();
        playlistId = $(this).val();
        if(playlistId == 'afreeca1' || playlistId == 'afreeca2'){
            afreecaLoad(playlistId);
        }else{
            startLoad(playlistId);
        }
    })

    function afreecaLoad(playlistId){
        if(playlistId == 'afreeca1'){
            $('#video').html(`
                <iframe src="https://play.afreecatv.com/dkdleliii/244171684/embed" width="960" height="540" frameborder="0" allowfullscreen></iframe>
            `);
        }else{
            $('#video').html(`
                <iframe src="https://play.afreecatv.com/zesting/244133868/embed" width="960" height="540" frameborder="0" allowfullscreen></iframe>
            `);
        }
    }

    function startLoad(playlistId) {
        var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

        var options = {
            part: 'snippet',
            key: key,
            maxResults: 20,
            playlistId: playlistId
        }

        loadVideo();

        function loadVideo() {
            $.getJSON(URL, options, function (data) {
                //console.log(data);
                var id = data.items[0].snippet.resourceId.videoId;
                mainVideo(id);
                resultsLoop(data);
            })
        }

        function mainVideo(id) {
            $('#video').html(`
                <iframe width="1400" height="780" src="https://www.youtube-nocookie.com/embed/${id}"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
            `);
        }

        function resultsLoop(data) {
            $.each(data.items, function (i, item) {

                var thumb = item.snippet.thumbnails.medium.url;
                var title = item.snippet.title;
                var published = item.snippet.publishedAt.substring(0, 10);
                var video = item.snippet.resourceId.videoId;
                if (today == published) {
                    $('main').append(`
                    <article class="item" data-key="${video}">
                        <img src="${thumb}" alt="thumbnail" class="thumb">
                        <div class="details">
                            <h4>${title}</h4>
                            <p><i class="fa-solid fa-bolt" style="color: red;"></i> Published in ${published}</p>
                        </div>
                    </article>
                    `);
                } else {
                    $('main').append(`
                    <article class="item" data-key="${video}">
                        <img src="${thumb}" alt="thumbnail" class="thumb">
                        <div class="details">
                            <h4>${title}</h4>
                            <p><i class="fa-regular fa-clock"></i> Published in ${published}</p>
                        </div>
                    </article>
                    `);
                }

            });
        }
        $('main').on('click', 'article', function () {
            var id = $(this).attr('data-key');
            mainVideo(id);
        });
    }
});