'use strict';

const movie = {
    title: 'Avatar',
    genre: 'Sci-Fi',
    duration: '300000'
    'producer house': 'Warner'
}

console.log(movie.title);
console.log(movie['title']);  

movie.director = 'Cameron'; // add new property
//movie['director'] = 'Cameron'

delete movie.director;