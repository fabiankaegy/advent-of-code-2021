const getInputValues = require('./helper/get-input-values');
const input = await getInputValues( '6' );

const initialFishAges = input[0].split(',').map(daysTillReplication => parseInt( daysTillReplication, 10 ));

function calculateAmountOfFish( fish, days ) {
    let fishTracker = [0,0,0,0,0,0,0,0,0];

    // add initial fish to the tracker
    fish.forEach( daysTillReplication => {
        fishTracker[daysTillReplication]++;
    } );

    for (let day = 0; day < days; day++) {
        // remove the fish that will replicate today from the array
        const fishThatReplicate = fishTracker.shift(); 
        
        // add the new fish that spawned today to the end of the array
        fishTracker.push(fishThatReplicate);
        
        // add the fish that replicated today to the fish that will replicate in 6 days (resetting their internal clock)
        fishTracker[6] += fishThatReplicate; 
    }

    return fishTracker.reduce( (score, item) => score + item, 0 );
}

// ----- Part A ----- //
console.log( calculateAmountOfFish(initialFishAges, 80) )


// ----- Part B ----- //
console.log( calculateAmountOfFish(initialFishAges, 256) );
