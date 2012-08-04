//Globals
var http = require('http'),
    utils = require('./utils'),
    spotify = require('spotifyapi');

_s = require('underscore.string');

var load_time = Math.round(new Date().getTime() / 1000);

//Our reddits to scrape
var reddits = [
    'kyes_playground'
];


function getRedditMusic() {
    console.log('Checking reddit...');
    var options = {
        host: 'www.reddit.com',
        port: 80,
        path: '/r/' + reddits[0] + '/.json'
    };

    //console.log('Current options: ', options);
    var data = [];

    http.get(options, function(res) {
        console.log('Got response: ', res.statusCode, '\n');

        //Saftey check on reddits status, non 200 status means its too busy for us
        if(res.statusCode === 200){
            res.on('data', function(d) {
                data.push(d);
            });

            res.on('end', function() {
                data = data.join('');

                var reddit = JSON.parse(data).data.children,
                    len = reddit.length;

                //only taking top 3
                if (len > 3) {
                    len = 3;
                }

                for (var i = 0; i < len; i++) {
                    var post = reddit[i].data;

                    //we dont care about self posts
                    if (!post.is_self) {
                        var score = post.score,
                            title = post.title.toString(),
                            url = post.url;

                        var song_information = utils.getSongInfoFromTitle(title);
                        
                        var artist = song_information.artist;
                        var song_title = song_information.title;

                        var spotifyLink = utils.getSpotifyLink(artist, song_title);
                        // console.log('Score: ',score);
                        console.log('Title: ', title);
                        console.log('Artist: ', artist);
                        console.log('Song Title: ', song_title);
                        console.log('Url  : ', url);
                        //console.log('Spotify Link', spotifyLink);

                        console.log();
                    }
                }
            });
        }
    }).on('error', function(e) {
        console.log('Got error: ', e.message);
    });
}

setInterval(function(){
    getRedditMusic();
}, 1000 * 60 * 3);//Every 3 minutes

getRedditMusic();


