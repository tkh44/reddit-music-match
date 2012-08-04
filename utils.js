var _s = require('underscore.string');
var spotify = require('spotifyapi');

//Gets relevant song infromation from title
//Expects ARTIST - SONGNAME [GENRE];
exports.getSongInfoFromTitle = function(string) {
    var song_information = {};
    var string = string.replace('\'', '');

    //var genre = string.match(/\[([^}]*)\]/);//get genre before we clean out non-alpha/num
    var clean_title = string.replace(/\[.*\]|-|\W\s|\*.*\*/ig, '--');

    split_string = _s.words(clean_title, '--');

    for(var i = 0, len = split_string.length; i < len; i++) {
        split_string[i] = _s.trim(split_string[i]);
    }

    song_information['artist'] = split_string[0];
    song_information['title'] = split_string[1];

    return song_information;
}


exports.getSpotifyLink = function(artist, title) {
    var artist = artist;
    var title = title;

    var results = spotify.search({
        method: 'track',
        q: title,
        page: 1,
    }, function (error, response){
        var data = response.body;
        tracks = data['tracks'];

        for (var i in tracks) {
            var this_track = tracks[i];
            var potential_artist = this_track['artists'][0]['name'];

            if (_s.slugify(potential_artist) === _s.slugify(artist)) {
                console.log(spotify.uriToHttp(this_track['href']));
                return spotify.uriToHttp(this_track['href']);
            }
        }
    });
}