var _s = require('underscore.string');

//Gets relevant song infromation from title
//Expects ARTIST - SONGNAME [GENRE];
exports.getSongInfoFromTitle = function(string) {
    var song_information = {};
    var string = string.replace('\'', '');

    //var genre = string.match(/\[([^}]*)\]/);//get genre before we clean out non-alpha/num
    var clean_title = string.replace(/\[.*\]|-|\W\s|\*.*\*|\(.*\)/ig, '--');

    var split_string = _s.words(clean_title, '--');

    for(var i = 0, len = split_string.length; i < len; i++) {
        split_string[i] = _s.trim(split_string[i]);
    }

    song_information['artist'] = split_string[0];
    song_information['title'] = split_string[1];

    return song_information;
}


