'use strict';

const score = [25, 30, 18, 27, 28, 27, 30, 26]; //define array with array literal
    //literal is  something that doesn't change in a programming language

/*primitive are usually defined with literals while other types are not defined usually with it
    in JS Array and Objects can be defined with literals without use of functions
        --> i can still use constructor

*/

const betterScore = [...score]; //duplicate array

//delete 2 lowest-ranking scores

//extract minimums
let minScore = Math.min(...betterScore); //want to keep original score
let index = betterScore.indexOf(minScore);
betterScore.splice(index, 1);

minScore = Math.min(...betterScore);
index = betterScore.indexOf(minScore);
betterScore.splice(index, 1);

/*alternative: sort + deletion

sort function is based on strings such that it's not cirrect for the situation
    need to use the function which will define ordering based on difference


betterScore.sort((a,b) => a - b); //ascending order
betterScore.shift();
betterScore.shift(); // to remove the first element in array
*/
//calculate avg
let avg = 0;
for(const s of betterScore){
    avg += s;
}
avg /= betterScore.length; // can generate floating number

//round the average
avg = Math.round(avg); // rounded to nearest integer

// add avg to betterScore array
betterScore.push(avg);
betterScore.push(avg);

console.log(score);
console.log(betterScore);