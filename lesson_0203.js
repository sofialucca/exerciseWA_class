'use strict';
//to declare variables
let c = 8;
console.log(c);

let a = 5;
const b = '6';

a = 'hello';

/*b = 'another hello'; not possile because const
//var c;
// d = 6; not accetable in strict mode
*/


console.log(a);
console.log(b);

//comparison
a = 6;

console.log('double equal:')
if ( a == b){
    console.log('a and b are equals');
}else{
    console.log('they are not equal');
}

console.log('triple equal:');
if ( a === b){
    console.log('a and b are equals');
}else{
    console.log('they are not equal');
}