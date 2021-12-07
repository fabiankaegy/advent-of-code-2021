(async() =>{const getInputValues = require('./helper/get-input-values');
const input = await getInputValues( '7' );
const sampleInput = await getInputValues( '7-sample' );
const correctSampleAnswer = 37;
const correctSampleAnsweB = 168;

const crabPositions = input[0].split(',').map( item => parseInt( item, 10 ) );
const sampleCrabPositions = sampleInput[0].split(',').map( item => parseInt( item, 10 ) );


// ----- Part A ----- //

function calculateFuelUsage( crabPositions ) {
    const distribution = getDistributionArray(crabPositions);
    const mostCommonPosition = getMostCommonPosition( distribution );
    
    let fuelUsage = 0;
    distribution.forEach( ({ ocurrance, position }) => {
        fuelUsage += ocurrance * Math.abs( mostCommonPosition - position );
    } );
    
    return fuelUsage;
}

function getEmptyDistributionArray( input ) {
    let values = [];
    // get highest position so we know the length of our distribution array
    let highest = 0;
    input.forEach( position => {
        if ( position > highest ) {
            highest = position;
        }
    } )
    
    // fill the distribuiton array with empty data
    for (let index = 0; index <= highest; index++) {
        values[index] = { position: index, ocurrance: 0 };
    }

    return values;
}

function getDistributionArray( input ) {
    let values = getEmptyDistributionArray( input )

    // plot the individual positions in the distribution
    input.forEach(position => {
        values[position].ocurrance++;
    });

    return values;
}

function getMostCommonPosition( array ) {
    let mostCommon = { ocurrance: 0 };
    for (let index = 0; index < array.length; index++) {
        if ( array[index].ocurrance > mostCommon.ocurrance ) {
            mostCommon = array[index];
        }
    }

    return mostCommon.position;    
}

function brutForceA( positions ) {
    const distribution = getDistributionArray( positions );
    let scoreBoard = getEmptyDistributionArray(positions);

    distribution.forEach( ({ position, ocurrance }) => {
        scoreBoard.forEach( ({position: boardPosition}) => {
            const difference = Math.abs( boardPosition - position );
            scoreBoard[boardPosition].ocurrance += ocurrance * difference;
        } )
    } )

    let fuelUsage = Infinity;
    scoreBoard.forEach( ({ocurrance: fuelForUsedForPosition}) => {
        if ( fuelForUsedForPosition < fuelUsage ) {
            fuelUsage = fuelForUsedForPosition;
        }
    } )

    return fuelUsage;

}

const sampleAnswerA = brutForceA( sampleCrabPositions );
const answerA = brutForceA( crabPositions );

console.assert( sampleAnswerA === correctSampleAnswer, `${sampleAnswerA} is incorrect. It should be ${correctSampleAnswer}.`  );
console.info( `The answer for Part A is: ${answerA}` );


// ---- Part B ---- // 

function brutForceB( positions ) {
    const distribution = getDistributionArray( positions );
    let scoreBoard = getEmptyDistributionArray(positions);

    distribution.forEach( ({ position, ocurrance }) => {
        scoreBoard.forEach( ({position: boardPosition}) => {
            const difference = Math.abs( boardPosition - position );
            scoreBoard[boardPosition].ocurrance += ocurrance * getFuelUsageOfSteps(difference);
        } )
    } )

    let fuelUsage = Infinity;
    scoreBoard.forEach( ({ocurrance: fuelForUsedForPosition}) => {
        if ( fuelForUsedForPosition < fuelUsage ) {
            fuelUsage = fuelForUsedForPosition;
        }
    } )

    return fuelUsage;

}

// const sampleAnswerB = brutForceB( sampleCrabPositions );
const answerB = brutForceB( crabPositions );
// console.assert( sampleAnswerB === correctSampleAnsweB, `${sampleAnswerB} is incorrect. It should be ${correctSampleAnsweB}.`  );
console.info( `The answer to B ia: ${answerB}` );

function getFuelUsageOfSteps( steps ) {
    let cost = 0;
    let price = 1;
    for (let step = 0; step < steps; step++) {
        cost += price;
        price++
    }
    return cost;
}
})()
