const getInputValues = require('./helper/get-input-values');
const input = await getInputValues( 3 );

// ----- Part A ----- //
const bitMatrix = input.map( row => row.split( '' ) );

const scoresA = [
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
]

bitMatrix.forEach((element) => {
    element.forEach((item, index) => {
        scoresA[index][item]++
    })
});

function matrixToString( input ) {
    return input.join('');
}

function binaryToInt( binraryString ) {
    return parseInt( binraryString, 2 )
}

function matrixToInt( input ) {
    return binaryToInt( matrixToString( input ) );
}

const gammaMatrix = scoresA.map( item => item[0] > item[1] ? 0 : 1);
const epsilonMatrix = scoresA.map( item => item[0] < item[1] ? 0 : 1);

const gamma = matrixToInt( gammaMatrix );
const epsilon = matrixToInt( epsilonMatrix );

const answerA = gamma * epsilon; //?


// ----- Part B ----- //

function filterBitMatrix( inputMatrix, comparissonFunction ) {
    let tempMatrix = [...inputMatrix]

    for ( let bitIndex = 0; bitIndex < 12; bitIndex++ ) {
        if ( tempMatrix.length === 1 ) {
            continue;
        }
        let score = { 0: 0, 1: 0 };
        tempMatrix.forEach( line => {
            score[line[bitIndex]]++
        } );
        const winner = comparissonFunction( score );
        tempMatrix = tempMatrix.filter( line => line[bitIndex] === winner )
    }

    return tempMatrix[0];
}

const filterMoreCommonValue = ( score ) => score[1] >= score[0] ? '1' : '0';
const filterLessCommonValue = ( score ) => score[1] < score[0] ? '1' : '0';

const oxygenGeneratorBitMatrix = filterBitMatrix( bitMatrix, filterMoreCommonValue );
const co2ScubaRatingBitMatrix = filterBitMatrix( bitMatrix, filterLessCommonValue );

const oxygenGenerator = matrixToInt( oxygenGeneratorBitMatrix );
const co2ScubaRating = matrixToInt( co2ScubaRatingBitMatrix );

const answerB = oxygenGenerator * co2ScubaRating; //?
