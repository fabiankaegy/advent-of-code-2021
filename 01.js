const getInputValues = require('./helper/get-input-values');
const input = await getInputValues( 1 );

input.length //?

let answerA = 0;

input.reduce( ( prev, current ) => {
    if ( prev < current ) {
        answerA++
    }
    
    return current;
}, 9999 )

answerA //? 

let answerB = 0;
let previousSumOfThree = 99999;

for ( let index = 2; index < input.length; index++ ) {
    const sumOfThree = input[index - 2] + input[index - 1] + input[index];

    if ( sumOfThree > previousSumOfThree ) {
        answerB++;
    }

    previousSumOfThree = sumOfThree;
}

answerB //?