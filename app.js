//Globals
var http = require('http'),
  utils = require('./utils'),
  spotify = require('./spotify'),
  tinysong = require('./tinysong'),
  async = require('async'),
  _s = require('underscore.string');

var load_time = Math.round(new Date().getTime() / 1000);

//Our reddits to scrape
// var reddits = ['kyes_playground'];
var reddits = ['listenToThis'];

var lookups = [];

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
    if (res.statusCode === 200) {
      res.on('data', function(d) {
        data.push(d);
      });

      res.on('end', function() {
        data = data.join('');

        var reddit = JSON.parse(data).data.children,
          len = reddit.length;

        //only taking top 3
        if (len > 5) {
          len = 5;
        }
        
        
        var musicData = [];
        
        var extract = function(post, callback) {
          if (!post.data.is_self) {
            var data = post.data,
              score = data.score,
              title = data.title,
              url = data.url;
            
            musicData.push({
              data: data,
              score: score,
              title: title,
              url: url
            });
          }
          callback();
        };
        async.each(reddit, extract, function(err) {
          for ( var i = 0; i < musicData.length; i++) {
            console.log(musicData[i].title);
          }
        });
        
        // for (var i = 0; i < len; i++) {
        //   var this_post = reddit[i].data;
        //   //we dont care about self posts
        //   if (!this_post.is_self) {
        //     (function(post) {
        //       lookups[i] = {};
        //       var score = post.score,
        //         title = post.title.toString(),
        //         url = post.url;

        //       var song_information = utils.getSongInfoFromTitle(title);

        //       var artist = song_information.artist;
        //       var song_title = song_information.title;

        //       // var song = {};
        //       // song['artist'] = artist;
        //       // song['title'] = song_title;

        //       //var spotifyLink = utils.getSpotifyLink(artist, song_title);
        //       //console.log('Score: ',score);
        //       // console.log('Title: ', title);
        //       // console.log('Artist: ', artist);
        //       // console.log('Song Title: ', song_title);

        //       lookups[i]['post_title'] = title;
        //       lookups[i]['artist'] = artist;
        //       lookups[i]['song_title'] = song_title;
        //       lookups[i]['spotify'] = spotify.getSpotifyLink(artist, song_title);
        //     })(this_post);
        //   }
        // }
      });
    }
  }).on('error', function(e) {
    console.log('Got error: ', e.message);
  });
}

function displayResults() {
  for (var k = 0; k < lookups.length; k++) {
    console.log('Post Title: ', lookups[k]['post_title']);
    console.log('Artist: ', lookups[k]['artist']);
    console.log('Song Title: ', lookups[k]['song_title']);
    console.log('Spotify Link', lookups[k]['spotify']);
    console.log();
  }
}

// setInterval(function(){
//     getRedditMusic();
// }, 1000 * 60 * 3);//Every 3 minutes

getRedditMusic();

// setTimeout(function() {
//   displayResults();
// }, 3000);
