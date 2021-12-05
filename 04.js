const getInputValues = require('./helper/get-input-values');
const input = await getInputValues( '4' );

// ----- Part A ----- //
const calledNumbers = input[0].split( ',' );
let bingoBoards = [];
let boardIndex = 0;

input.forEach( line => {

    if ( line.length > 14 ) {
        return;
    }

    if ( line.length === 0 ) {
        boardIndex++
        return;
    }

    bingoBoards[boardIndex] = [ ...bingoBoards[boardIndex]||[], line.split( ' ' ).filter( number => number !== '' ) ]

} )

bingoBoards = bingoBoards.filter( board => board.length )

function checkForWinningStreak( inputArray ) {
    return inputArray.every( value => value === 'X' );
}

class Board {
    constructor( matrix ) {
        if ( matrix.length !== 5 ) {
            throw new Error( 'The Board does not contain 5 rows' );
        }

        matrix.forEach( (row, index) => {
            if ( row.length !== 5 ) {
                throw new Error( `Row ${index} does not contain enough numbers` );
            }
        } )
        this.matrix = matrix.map(row => row.map( number => parseInt( number, 10 ) ));
    }

    testValue( value ) {
        for (let rowIndex = 0; rowIndex < this.matrix.length; rowIndex++) {
            const row = this.matrix[rowIndex];

            for (let numberIndex = 0; numberIndex < row.length; numberIndex++) {
                const number = row[numberIndex];
                
                if ( number == value ) {
                    this.matrix[rowIndex][numberIndex] = 'X'
                }
            }
        }
    }

    get isWinning() {
        return this.hasCompleteRow || this.hasCompleteColumn;
    }

    get hasCompleteRow() {
        return !! this.matrix.filter( checkForWinningStreak ).length
    }

    get hasCompleteColumn() {
        return !! this.flipped.filter( checkForWinningStreak ).length
    }

    get flipped() {
        let transposed = [];
        for(let index = 0; index < 5; index++) {
            transposed[index] = [];
            for(let counter = 0; counter < 5; counter++) {
                transposed[index][counter] = this.matrix[counter][index];
            }
        }
        return transposed;
    }

    get sum() {
        let sum = 0;
        this.matrix.forEach( row => {
            row.forEach( number => {
                if ( number !== 'X' ) {
                    sum += parseInt( number, 10 )
                }
            } )
        } )
        return sum;
    }
}


let winningBoard;
const actuallCalledNumbers = [];
const boards = bingoBoards.map( matrix => new Board( matrix ) );

for ( let round = 0; round < calledNumbers.length && !winningBoard; round++ ) {
    const calledNumber = calledNumbers[round];
    actuallCalledNumbers.push(calledNumber);
    
    boards.forEach( board => {
        board.testValue( calledNumber );
    })

    boards.forEach( board => {
        if ( board.isWinning ) {
            winningBoard = board;
        }
     })
}
const lastCalledNumber = actuallCalledNumbers[actuallCalledNumbers.length - 1];

const answerA = winningBoard.sum * lastCalledNumber;

console.log( answerA );

// ----- Part B ----- //

let tmpBoards = bingoBoards.map( matrix => new Board( matrix ) );
let lastBoard;
let lastCalledNumberB;
for ( let round = 0; round < calledNumbers.length && !lastCalledNumberB; round++ ) {
    const calledNumber = calledNumbers[round];

    tmpBoards.forEach( board => {
        board.testValue( calledNumber );
    })

    tmpBoards = tmpBoards.filter( board => !board.isWinning );

    if ( tmpBoards.length === 1 ) {
        lastBoard = tmpBoards[0];
    }
    
    if ( tmpBoards.length === 0 ) {
        lastCalledNumberB = calledNumber;
    }
}

const answerB = lastBoard.sum * lastCalledNumberB;

console.log( answerB )
