var express = require('express');
var router = express.Router();
var _ = require('lodash');
const API_KEY = '59954d43';
const API_URL = 'http://www.omdbapi.com/';
var axios = require('axios');


function fetchMovie_id(id_movie){
	return axios
	.get(`http://www.omdbapi.com/?i=${id_movie}&apikey=59954d43&r=json`, {
		crossdomain: true
	})
};
function fetchMovie_name(name){
	return axios
	.get(`http://www.omdbapi.com/?t=${name}&apikey=59954d43&r=json`, {
		crossdomain: true
	})
};
let movies=[
{
	id: "tt0816692",
	movie: "Star Wars",
	yearOfRelease: 2014,
  duration: 169, // en minutes,
  actors: ["Ellen Burstyn", "Matthew McConaughey"],
  poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  boxOffice: 158737441, // en USD$,
  rottenTomatoesScore: 72
}];
let movie_get={}; 
let movie, yearOfRelease, duration, actors, poster, boxOffice, rottenTomatoesScore = null;
let movie_format =
{
	id : null,
	movie: null,
	yearOfRelease: null,
  duration: null, // en minutes,
  actors: [null, null],
  poster: null, // lien vers une image d'affiche,
  boxOffice: null, // en USD$,
  rottenTomatoesScore: null
};
function reset()
{
	movie_get = {};
	movie_format =
	{
		id : null,
		movie: null,
		yearOfRelease: null,
  duration: null, // en minutes,
  actors: [null, null],
  poster: null, // lien vers une image d'affiche,
  boxOffice: null, // en USD$,
  rottenTomatoesScore: null
};
};
/* GET movies listing. */
router.get('/', (req, res) => {
	res.status(200).json({movies});
});

/* GET one movie. */
router.get('/:id', (req, res) => {
	const {id} = req.params;
	fetchMovie_id(id)
	.then(function(response) {
		movie_get = response.data;
	});
	movie_format.id = movie_get.imdbID;
	movie_format.movie = movie_get.Title;
	movie_format.yearOfRelease = Number(movie_get.Year);
	movie_format.duration = (movie_get.Runtime).match(/\d/g);
	movie_format.duration = (movie_format.duration).join("");
	movie_format.duration = Number(movie_format.duration);
	movie_get.Actors = movie_get.Actors.replace(/\,/g, "");
	let actors_split=(movie_get.Actors.split(' '));
	movie_format.actors[0]=actors_split[0]+" "+actors_split[1];
	movie_format.actors[1]=actors_split[2]+" "+actors_split[3];
	movie_format.poster=movie_get.Poster;
	movie_format.boxOffice = (movie_get.BoxOffice).match(/\d/g);
	movie_format.boxOffice = (movie_format.boxOffice).join("");
	movie_format.boxOffice = Number(movie_format.boxOffice);
	movie_format.rottenTomatoesScore = (movie_get.Ratings[1].Value).match(/\d/g);
	movie_format.rottenTomatoesScore = (movie_format.rottenTomatoesScore).join("");
	movie_format.rottenTomatoesScore = Number(movie_format.rottenTomatoesScore);
	res.status(200).json({movie_format});
	reset();
});
/*PUT new movie. */
router.put('/', (req, res) => {
	const {name} = req.body;
	fetchMovie_id(name)
	.then(function(response) {
		movie_get = response.data;
	});
	movie_format.id = movie_get.imdbID;
	movie_format.movie = movie_get.Title;
	movie_format.yearOfRelease = Number(movie_get.Year);
	movie_format.duration = (movie_get.Runtime).match(/\d/g);
	movie_format.duration = (movie_format.duration).join("");
	movie_format.duration = Number(movie_format.duration);
	movie_get.Actors = movie_get.Actors.replace(/\,/g, "");
	let actors_split=(movie_get.Actors.split(' '));
	movie_format.actors[0]=actors_split[0]+" "+actors_split[1];
	movie_format.actors[1]=actors_split[2]+" "+actors_split[3];
	movie_format.poster=movie_get.Poster;
	movie_format.boxOffice = (movie_get.BoxOffice).match(/\d/g);
	movie_format.boxOffice = (movie_format.boxOffice).join("");
	movie_format.boxOffice = Number(movie_format.boxOffice);
	movie_format.rottenTomatoesScore = (movie_get.Ratings[1].Value).match(/\d/g);
	movie_format.rottenTomatoesScore = (movie_format.rottenTomatoesScore).join("");
	movie_format.rottenTomatoesScore = Number(movie_format.rottenTomatoesScore);
	id = movie_format.id;
	movie=movie_format.movie,
	yearOfRelease=movie_format.yearOfRelease, //OK
	duration=movie_format.duration,
	actors=movie_format.actors,
	poster=movie_format.poster, // lien vers une image d'affiche,
	boxOffice=movie_format.boxOffice, // en USD$,
	rottenTomatoesScore = movie_format.rottenTomatoesScore;
	const checkMovie = _.find(movies, ["id",id]);
	if (!checkMovie)
	{
		res.json({
			message : 'Just added new movie',
			movie : {
				id,
				movie,
				yearOfRelease,
				duration,
				actors,
				poster,
				boxOffice,
				rottenTomatoesScore,
			},
		});
		movies.push({
			id,
			movie,
			yearOfRelease,
			duration,
			actors,
			poster,
			boxOffice,
			rottenTomatoesScore
		});
	}
	else
	{
		res.json({
			message : 'Movie already existed!'
		});
	}
	reset();
});

/* UPDATE movie. */
router.post('/:id', (req, res) => {
	const {id} = req.params;
	const {name} = req.body;
	fetchMovie_id(name)
	.then(function(response) {
		movie_get = response.data;
	});
	movie_format.id = movie_get.imdbID;
	movie_format.movie = movie_get.Title;
	movie_format.yearOfRelease = Number(movie_get.Year);
	movie_format.duration = (movie_get.Runtime).match(/\d/g);
	movie_format.duration = (movie_format.duration).join("");
	movie_format.duration = Number(movie_format.duration);
	movie_get.Actors = movie_get.Actors.replace(/\,/g, "");
	let actors_split=(movie_get.Actors.split(' '));
	movie_format.actors[0]=actors_split[0]+" "+actors_split[1];
	movie_format.actors[1]=actors_split[2]+" "+actors_split[3];
	movie_format.poster=movie_get.Poster;
	movie_format.boxOffice = (movie_get.BoxOffice).match(/\d/g);
	movie_format.boxOffice = (movie_format.boxOffice).join("");
	movie_format.boxOffice = Number(movie_format.boxOffice);
	movie_format.rottenTomatoesScore = (movie_get.Ratings[1].Value).match(/\d/g);
	movie_format.rottenTomatoesScore = (movie_format.rottenTomatoesScore).join("");
	movie_format.rottenTomatoesScore = Number(movie_format.rottenTomatoesScore);
	let movieToUpdate = _.find(movies, ["id",id]);
	if (movieToUpdate)
	{
		movieToUpdate.id = movie_format.id;
		movieToUpdate.movie = movie_format.movie;
		movieToUpdate.yearOfRelease = movie_format.yearOfRelease;
		movieToUpdate.duration = movie_format.duration;
		movieToUpdate.actors = movie_format.actors;
		movieToUpdate.poster= movie_format.poster;
		movieToUpdate.boxOffice = movie_format.boxOffice;
		movie_format.rottenTomatoesScore = movie_format.rottenTomatoesScore;

		res.json({
			message : 'Just updated id with movie',
			movie : {id, movie_format}
		});
	}
	else
	{
		res.json({
			message : 'Don\'t exists in database!',
		});
	}
	reset();
});
/* DELETE movie. */
router.delete('/:id', (req, res) => {
	const {id} = req.params;
	_.remove(movies, ["id", id]);
	res.json({
		message : 'Just removed id',
		movie : {id}
	});
});
module.exports = router;



