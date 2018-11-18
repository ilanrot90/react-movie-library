import axios from 'axios';

const BASE_URL = 'http://www.omdbapi.com/?apikey=493c6020&t=';
const moviesNames = [
    'Harry Potter and the Deathly Hallows: Part 2',
    'Blade Runner 2049',
    'wonder woman',
    'justice league',
    'The Shape of Water',
    'All the Money in the World',
    'The Greatest Showman',
    'Thor: Ragnarok',
    'Spider-Man: Homecoming',
    'Star Wars',
    'Cold Skin',
    'Get Out'
];

export function getMovieNames() {
    return moviesNames;
}

export function getMovies() {
    return moviesNames.map( movieName => {
                let movie = axios.get(`${BASE_URL}${movieName}`)
                                .then(res => res.data)
                                .then(movieDetails => {
                                    let { Title, Year, Runtime, Genre, Director, imdbID, Poster } = movieDetails;

                                    return { Title, Year, Runtime, Genre, Director, imdbID, Poster };
                                });
                return movie;
            });
}

export function findMoviesToShow(name) {
    return axios.get(`${BASE_URL}${name}`)
                .then( res => res.data)
                .then( movieDetails => {
                    let { Title, Year, Runtime, Genre, Director, imdbID, Poster } = movieDetails;

                    return { Title, Year, Runtime, Genre, Director, imdbID, Poster };
                })
}

