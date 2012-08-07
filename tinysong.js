var _s = require('underscore.string'),
    request = require('request');

var api = {
    url: 'http://tinysong.com', 
    key: 'd4358e59666e277255df188904b2c217'
};

/**
* Looks up a specific artist, album or track and gives the user
* useful metadata about it.
*
* http://tinysong.com/s/Beethoven?format=json&limit=3&key=APIKey
*
* @param {Object} q An Object containing options, "q" and "method" are requred properties.
* @param {Function} callback This function will be called once the request completes.
*/

searchTinySong = function (options, callback) {
    var url = api.url + options.method + encodeURIComponent(options.q)
        + '?format=json&limit=5&key=' + api.key;
    return request({url: url, json: true}, callback)
}


exports.getTinySongUrl = function(artist, title) {
    var results = searchTinySong({
        method: '/a/', //We want multiple search results (http://tinysong.com/api)
        q: artist + '+' + title
    }, function (error, response){
        var data = response.body;
        if (data.length !== 0 && typeof data != 'undefined') {
            console.log(data);
            return data;
            
        } else {
            return null;
        }
        // for (var i = 0; i < data.length; i++) {
        //     var this_track = data[i]['SongName'];
        //     console.log(this_track);
        //     var potential_artist = this_track['ArtistName'];
        //     var potential_title = this_track['SongName'];
        //     if (_s.slugify(potential_artist) === _s.slugify(artist) 
        //         && _s.slugify(potential_artist) === _s.slugify(title)) {
        //             console.log(this_track);
        //             return this_track['Url'];
        //     }
        // }
        return null;
    });
};

