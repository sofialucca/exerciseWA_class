'use stric';

const type = typeof NaN;
console.log('NaN  is a ' + type); //number
console.log(`NaN === NaN? ${NaN === NaN}\n`); //false they will always be different

console.log(`null == false? ${null == false}`); //true --> false because it is a falsy but is not false
console.log(`'' == false? ${'' == false}`); //true
console.log(`3 == true? ${3 == true}\n`);   //true --> because i trasform true into 1 st it's not equal to 3
console.log(`0 == -0? ${0== -0}\n`); //true

console.log(`true + true = ${true + true}`);    //2
console.log(`true !== 1? ${true !== 1}`);   //true it is not converted because it's a triple disequality

console.log(`5 + '10' = ${5 + '10'}\n`); //510 --> result is a string which result of a conversion

console.log(`1 < 2 < 3? ${1 < 2 < 3}`);     //true
console.log(`3 > 2 > 1? ${3 > 2 > 1}\n`);   //false because i perform conversion

console.log(`0.2 + 0.1 === 0.3? ${0.2 + 0.1 === 0.3}\n`);   //false -->because calclulation with floating points are not precise casuing error in equalities, need to round the result of sum

console.log('b' + 'a' + + 'a' + 'a');    /*baNaNa --> ('b' + 'a' + (+ 'a') + 'a')
        tries to convert a into a number but it isn't so it gives NaN
    */