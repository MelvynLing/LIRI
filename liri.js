
//////////////////////////////////////////////GLOBAL VARIABLES///////////////////////////////////////////
var keys = require("./keys.js");
var Twitter = require("twitter");
var request = require('request');
var fs = require('fs');
var query = process.argv.slice(3);
var command = process.argv[2];

/////////////////////////////////////////////////////TWEET RETRIVAL/////////////////////////////////////////////////
var tweetRetrieve = function () {
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'TheRealFakeMel'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                //console.log(tweets);
                for (var i=0; i<tweets.length; i++) {
                console.log("  ");
                console.log("==============================================================================");
                console.log(tweets[i].user.screen_name + " Tweeted: ");
                console.log(tweets[i].text);
                console.log("This was Tweeted out at: " + tweets[i].created_at);
                console.log("==============================================================================");
                }
            }
        });
}

/////////////////////////////////////////////////////SPOTIFY RETRIVAL/////////////////////////////////////////////////
var spotifyRetrieve = function (query) {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query}, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }      
        console.log("==============================================================================");
        console.log("                     YOUR SONG SEARCH INFO");
        console.log("==============================================================================");
            console.log('artist(s): '+ data.tracks.items[0].album.artists[0].name);
            console.log('Name of Song: '+ data.tracks.items[0].name);
            console.log('Song Preview: '+ data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('');
        console.log("==============================================================================");
        
    });
}
/////////////////////////////////////////////////////MOVIE RETRIVAL/////////////////////////////////////////////////
var movieRetrieve = function (query) {
request('https://www.omdbapi.com/?t=' + query +'&apikey=214b2756' , function (error, response, body) {
if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            console.log(" ");
            console.log("==============================================================================");
            console.log("                     YOUR MOVIE SEARCH INFO");
            console.log("==============================================================================");
            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rationg: " + jsonData.imbdRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
            console.log("Rotten Tomatoes URL: " + jsonData.tomatoURL);
            console.log("==============================================================================");
            }
        });
    }

    /////////////////////////////////////////////////////READ WITH FS/////////////////////////////////////////////////
function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(respError, data) {

        function errorFunction(respError) {
            if (respError) {
                return console.log("Error occured: ", respError);
             }
        };

        var randomArray = data.split(", ");

        errorFunction();

        if (randomArray[0] == "spotify-this-song") {
            spotifyRetrieve(randomArray[1]);
        } else if (randomArray[0] == "movie-this") {
            movieRetrieve(randomArray[1]);
        } else {
            tweetRetrieve();
        }
    });
};


/////////////////////////////////////////////////////SWITCH STATEMENTs////////////////////////////////////////////////
    switch(command) {
            case 'my-tweets':
                tweetRetrieve(); 
            break;
            case 'spotify-this-song':
                spotifyRetrieve(query); 
            break;
            case 'movie-this':
                movieRetrieve(query); 
            break;
            case 'do-what-it-says':
                doWhatItSays(); 
            break;
                default:
                        //this is the error log if the search cannot be found
                        console.log('LIRI KNOWS A LOT... but not what that is in particular')
    }



