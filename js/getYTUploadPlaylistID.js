$(document).ready(function () {
    var key = config.SECRET_KEY;
    var id = 'UCPde4guD9yFBRzkxk2PatoA'; //type here the externalId (ctrl-u)
    var URL = 'https://www.googleapis.com/youtube/v3/channels';

    var options = {
        part: 'contentDetails',
        key: key,
        id: id
    }

    getID();

    function getID() {
        $.getJSON(URL, options, function (data) {
            console.log(data);
            var id = data.items[0].contentDetails.relatedPlaylists.uploads;
            console.log(id);
        })
    }

});
