const getInputValues = require('./helper/get-input-values');
const input = await getInputValues( '6' );

const initialFishAges = input[0].split(',').map(age => parseInt( age, 10 ));

// ----- Part A ----- //

function solvePartA( input ) {

    class Lanternfish {
        constructor( daysTillSpawn = 8 ) {
            this.daysTillSpawn = daysTillSpawn;
        }

        decreaseTimer() {
            this.willSpawnToday ? this.reset() : this.daysTillSpawn--;
        }

        spawn() {
            return new Lanternfish();
        }

        reset() {
            this.daysTillSpawn = 6;
        }

        get willSpawnToday() {
            return this.daysTillSpawn === 0;
        }
    }

    let fishList = input.map( age => new Lanternfish( age ) );

    for (let day = 0; day < 80; day++) {

        let newFish = [];
        fishList.forEach( fish => {
            if ( fish.willSpawnToday ) {
            newFish.push(fish.spawn());
            }
            fish.decreaseTimer()
        } )
        fishList = [...fishList, ...newFish];

        console.log( `There are ${fishList.length} fishes after day ${day}` )
        
    }

    return fishList.length

}

console.log( solvePartA(initialFishAges) )
