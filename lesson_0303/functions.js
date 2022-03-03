'use strict';

function Movie(title, genre, duration){
    this.title = title;
    this.genre = genre;
    this.time = duration;
    this.isLong = () => (duration > 180);
}

let avatar = new Movie('Avatar', 'Sci-Fi', 300000);
let back2theFuture = new Movie('Back to the future', 'Sci-Fi', 170);

console.log(avatar);
console.log(back2theFuture.isLong());