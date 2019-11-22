var express = require('express');
var router = express.Router();
var _ = require('lodash');
const API_KEY = '59954d43';
const API_URL = 'http://www.omdbapi.com/';
var axios = require('axios');


function fetchMovie(name){
	return axios
	.get(`http://www.omdbapi.com/?t=${name}&apikey=59954d43&r=json`, {
		crossdomain: true
	})
};
let movies=[
{
	id: 0,
	movie: "Interstellar",
	yearOfRelease: 2014,
  duration: 169, // en minutes,
  actors: "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
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
/* GET movies listing. */
router.get('/', (req, res) => {
	res.status(200).json({movies});
});

/* GET one movie. */
router.get('/:id', (req, res) => {
	const {id} = req.params;
	fetchMovie(id)
	.then(function(response) {
		movie_get = response.data;
	});
	movie_format.movie = movie_get.Title;
	movie_format.yearOfRelease = Number(movie_get.Year);
	movie_format.duration = (movie_get.Runtime).match(/\d/g);
	movie_format.duration = (movie_format.duration).join("");
	movie_format.duration = Number(movie_format.duration);
	movie_format.actors=movie_get.Actors;
	movie_format.poster=movie_get.Poster;
	movie_format.boxOffice = (movie_get.BoxOffice).match(/\d/g);
	movie_format.boxOffice = (movie_format.boxOffice).join("");
	movie_format.boxOffice = Number(movie_format.boxOffice);
	movie_format.rottenTomatoesScore = (movie_get.Ratings[1].Value).match(/\d/g);
	movie_format.rottenTomatoesScore = (movie_format.rottenTomatoesScore).join("");
	movie_format.rottenTomatoesScore = Number(movie_format.rottenTomatoesScore);
	 res.status(200).json({movie_format});
	});
/*PUT new movie. */
router.put('/', (req, res) => {
	const {name} = req.body;
	fetchMovie(name)
	.then(function(response) {
		movie_get = response.data;
	});
	movie_format.movie = movie_get.Title;
	movie_format.yearOfRelease = Number(movie_get.Year);
	movie_format.duration = (movie_get.Runtime).match(/\d/g);
	movie_format.duration = (movie_format.duration).join("");
	movie_format.duration = Number(movie_format.duration);
	movie_format.actors=movie_get.Actors;
	movie_format.poster=movie_get.Poster;
	movie_format.boxOffice = (movie_get.BoxOffice).match(/\d/g);
	movie_format.boxOffice = (movie_format.boxOffice).join("");
	movie_format.boxOffice = Number(movie_format.boxOffice);
	movie_format.rottenTomatoesScore = (movie_get.Ratings[1].Value).match(/\d/g);
	movie_format.rottenTomatoesScore = (movie_format.rottenTomatoesScore).join("");
	movie_format.rottenTomatoesScore = Number(movie_format.rottenTomatoesScore);
	const id = Number(_.uniqueId()); //OK
	movie_format.id = id;
	movie=movie_format.movie,
	yearOfRelease=movie_format.yearOfRelease, //OK
	duration=movie_format.duration,
	actors=movie_format.actors,
	poster=movie_format.poster, // lien vers une image d'affiche,
	boxOffice=movie_format.boxOffice, // en USD$,
	rottenTomatoesScore = movie_format.rottenTomatoesScore;
	res.json({
		message : 'Just added new movie',
		movie : {id,
		movie,
		yearOfRelease,
		duration,
		actors,
		poster,
		boxOffice,
		rottenTomatoesScore},
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
});

/* UPDATE movie. */
router.post('/:id', (req, res) => {
	const {id} = req.params;
	const {movie} = req.body;
	const movieToUpdate = _.find(movies, ["Title",id]);
	movieToUpdate.movie = movie;
	res.json({
		message : 'Just updated ${id} with ${movie}'
	});
});
/* DELETE movie. */
router.delete('/:id', (req, res) => {
	const {id} = req.params;
	_.remove(movies, ["movie", id]);
	res.json({
		message : 'Just removed ${id}'
	});
});
module.exports = router;



