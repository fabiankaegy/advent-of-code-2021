const getInputValues = require('./helper/get-input-values');
const inputCommands = await getInputValues( 2 );

// ----- Part A ----- //

let depthA = 0;
let horizontalA = 0;

inputCommands.forEach( command => {
    const [ orientation, amount ] = command.split( ' ' );
    
    switch (orientation) {
        case 'up':
            depthA -= parseInt(amount)
            break;
        case 'down':
            depthA += parseInt(amount)
            break;
        case 'forward':
            horizontalA += parseInt(amount)
            break;
        default:
            break;
    }
})

const answerA = depthA * horizontalA; //?

// ----- Part B ----- //

let aim = 0;
let depthB = 0;
let horizontalB = 0;

inputCommands.forEach( command => {
    const [ orientation, amount ] = command.split( ' ' );
    
    switch (orientation) {
        case 'up':
            aim -= parseInt(amount)
            break;
        case 'down':
            aim += parseInt(amount)
            break;
        case 'forward':
            horizontalB += parseInt(amount)
            depthB += aim * parseInt(amount)
            break;
        default:
            break;
    }
})

const answerB = depthB * horizontalB; //?