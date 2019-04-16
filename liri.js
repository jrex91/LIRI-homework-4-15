require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api')

var axios = require("axios")

var spotify = new Spotify(keys.spotify);

var command = process.argv[2]

var search = process.argv.slice(3).join(" ")

if (command === "spotify-this") {
    spotify.search({
        type: 'track',
        query: search,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
} else if (command === "concert-this") {
    axios.get(`https://rest.bandsintown.com/artists/${search}/events?app_id=codingbootcamp`)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

} else if (command === "movie-this") {
    axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${search}`)
        .then(function (response) {
            var ombdSearch = response.data;
            console.log(ombdSearch.Title);
            console.log(ombdSearch.Year);
            console.log(ombdSearch.imdbRating);
            console.log(ombdSearch.Ratings[1]);
            console.log(ombdSearch.Country);
            console.log(ombdSearch.Language);
            console.log(ombdSearch.Plot);
            console.log(ombdSearch.Actors);
        })
        .catch(function (error) {
            console.log(error);
        });
}