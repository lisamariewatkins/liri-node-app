var Twitter = require('twitter');
var key = require('./key.js'); //./ means current dir
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

//====================================================================================

function getTweets(){
	var client = new Twitter(key.twitterKeys);
	var params = {screen_name: 'lisamwatkinstx'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	if (!error){
		var obj = tweets;
		console.log("My Tweets:")
		console.log("-----------------------------")
		for (var i = 0; i < obj.length; i++){
			console.log(obj[i].text);
			console.log("-----------------------------");
		}	
	}
	else{
		console.log(error);
	}
});
}

//====================================================================================

function getSpotify(songName){
	
	spotify.search({type:'track', query: songName}, function(err, spotifyData){
		if (err){
			console.log(err);
		}
		if (spotifyData.tracks.items.length === 0){
			console.log('Err - sorry! Song not found in Spotify database. Maybe check your spelling.')
		}
		else{
			for (var i = 0; i < spotifyData.tracks.items.length; i++){
				console.log('Spotify Search Results:')
				console.log("-----------------------------")
				console.log('Song: ' + JSON.stringify(spotifyData.tracks.items[i].name, null, 2))
				console.log('Artist: ' + JSON.stringify(spotifyData.tracks.items[i].artists[0].name, null, 2));
				console.log('Album: ' + JSON.stringify(spotifyData.tracks.items[i].album.name, null, 2));
				console.log('Spotify Link: ' + JSON.stringify(spotifyData.tracks.items[i].preview_url, null, 2));
				console.log("-----------------------------")
			}
			
		}
	});
}

//=======================================================================================

function getMovie(movie){
	request('http://www.omdbapi.com/?t='+ movie + '&y=&plot=short&r=json&tomatoes=true', function(error, response, body){

		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			console.log("Title: " + data.Title);
			console.log("Year: " + data.Year);
			console.log("IMDB Rating: " + data.imdbRating);
			console.log("Country: " + data.Country);
			console.log("Language: " + data.Language);
			console.log("Plot: " + data.Plot);
			console.log("Actors: " + data.Actors);
			console.log("Rotten Tomatoes Rating: " + data.tomatoRating);
			console.log("Rotten Tomatoes URL: " + data.tomatoURL)
		}
		if(error){
			console.log(error);
		}
	})
}

//========================================================================================

function doWhatItSays(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){
			console.log(err);
		}
		else{
			dataArray = data.split(',');
			var controlla = dataArray[0]; //by Drake
			switch(controlla){
				case 'my-tweets':
					getTweets();
					break;
				case 'spotify-this-song':
					var songName = '';
					songName = process.argv[3];
					getSpotify(songName);
					break;
				case 'movie-this':
					var movieName = '';
					movieName = process.argv[3];
					getMovie(movieName);
					break;
				default:
					console.log('Please add one of the following commands along with its appropriate objective to your text document: my-tweets, spotify-this-song, movie-this');
			}
		}
	})
}

//========================================================================================

if (process.argv[2] === 'my-tweets'){
	getTweets();
}

if (process.argv[2] === 'spotify-this-song'){
	var songName = '';
	songName = process.argv[3];
	getSpotify(songName);
}

if (process.argv[2]==='movie-this'){
	var movieName = '';
	movieName = process.argv[3];
	getMovie(movieName);
}

if (process.argv[2] ==='do-what-it-says'){
	doWhatItSays();
}