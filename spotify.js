var _s = require('underscore.string');
var spotifyWrapper = require('spotifyapi');

exports.getSpotifyLink = function(artist, title) {
  console.log('getting spotify');
  console.log(artist, title);
  var results = spotifyWrapper.search({
    method: 'track',
    q: title,
    page: 1
  }, function(error, response) {
    var data = response.body;
    var tracks = data['tracks'];

    for (var i in tracks) {
      var this_track = tracks[i];
      var potential_artist = this_track['artists'][0]['name'];
      console.log(spotifyWrapper.uriToHttp(this_track['href']));
      if (_s.slugify(potential_artist) === _s.slugify(artist)) {
        //console.log(this_track['artists'][0]['name'],' || ', this_track['name'], ': ',spotify.uriToHttp(this_track['href']));
        // console.log('Artist: ', artist);
        // console.log('Song Title: ', song_title);
        console.log(spotifyWrapper.uriToHttp(this_track['href']));
        return spotifyWrapper.uriToHttp(this_track['href']);
      }
    }
    return null;
  });
};
