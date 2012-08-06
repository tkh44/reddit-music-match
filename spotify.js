var _s = require('underscore.string');
var spotify = require('spotifyapi');

exports.getSpotifyLink = function(artist, title) {
    var artist = artist;
    var title = title;

    var results = spotify.search({
        method: 'track',
        q: title,
        page: 1,
    }, function (error, response){
        var data = response.body;
        var tracks = data['tracks'];

        for (var i in tracks) {
            var this_track = tracks[i];
            var potential_artist = this_track['artists'][0]['name'];

            if (_s.slugify(potential_artist) === _s.slugify(artist)) {
                console.log(this_track['artists'][0]['name'],' || ', this_track['name'], ': ',spotify.uriToHttp(this_track['href']));
                return spotify.uriToHttp(this_track['href']);
            }
        }
        return null;
    });
}