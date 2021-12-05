const getInputValues = require('./helper/get-input-values');
const input = await getInputValues( '5' );

const lines = input.map( line => {
    const rawVectors = line.split( ' -> ' );
    return rawVectors.map( rawVector => rawVector.split(',').map( string => parseInt(string) ) )
} );

// ----- Part A ----- //

function compare( a, b ) {
    return JSON.stringify(a) == JSON.stringify(b);
}

const horizontalOrVerticalLines = lines.filter( line => {
    const [start, end] = line;
    return start[0] === end[0] || start[1] === end[1];
} );

let graphWidth = 0;
let graphHeight = 0;

horizontalOrVerticalLines.forEach( line => {
    const [start, end] = line;
    if ( start[0] > graphWidth ) { graphWidth = start[0] }
    if ( end[0] > graphWidth ) { graphWidth = end[0] }
    if ( start[1] > graphHeight ) { graphHeight = start[1] }
    if ( end[1] > graphHeight ) { graphHeight = end[1] }
});

const graph = [];
// fill graph with zeros
for (let height = 0; height < graphHeight+1; height++) {
    for (let width = 0; width < graphWidth+1; width++) {

        if ( ! graph[height] ) {
            graph[height] = []
        }
    
        if ( ! graph[height][width] ) {
            graph[height][width] = 0;
        }

        graph[height][width] = 0;
    }
}

function drawLine( line ) {
    const [start, end] = line;
    const endX = end[0];
    const endY = end[1];

    let current = [ ...start ];
    while ( ! compare( current, end ) ) {
        const [currentX, currentY] = current;

        markPoint(currentX, currentY);

        if ( endX > currentX ) { current[0]++ }
        if ( endX < currentX ) { current[0]-- }
        
        if ( endY > currentY ) { current[1]++ }
        if ( endY < currentY ) { current[1]-- }
    }
    markPoint(endX, endY);
}


function markPoint( x, y ) {
    graph[y][x]++
}

horizontalOrVerticalLines.forEach(drawLine)

const answerA = graph.reduce( (result, x) => {
    x.forEach( y => {
        if ( y > 1 ) {
            result++
        }
    } )
    return result;
}, 0 )

answerA

console.table(graph)

