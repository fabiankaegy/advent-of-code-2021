const fs = require( 'fs' );
const readline = require('readline');

async function getInputValues( day ) {
  const fileStream = fs.createReadStream(`input/${day}.txt`);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const values = []; 

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
    values.push( line );
  }

  return values;
}

module.exports = getInputValues;