'use strict';

const movie = {
    title: 'Avatar',
    genre: 'Sci-Fi',
    duration: '300000',
    'producer house': 'Warner'
}

console.log(movie.title);
console.log(movie['title']);  

movie.director = 'Cameron'; // add new property
//movie['director'] = 'Cameron'

delete movie.director;

for(const prop in movie){
    console.log(`${prop} is ${movie[prop]}`);
}

const sameMovie = Object.assign({}, movie);
console.log(sameMovie);

//don't need detailedMovie because we modify movie
/*const detailedMovie = Object.assign(movie, {budget: '10k'});
console.log(detailedMovie);
*/
Object.assign(movie, {budget: '10k'});
console.log(movie);

const avatarAgain = {...movie};
console.log(avatarAgain);

