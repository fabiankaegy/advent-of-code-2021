# Advent of Code 2021

Very sloppy implementations of the 2021 Advent of Code challenges written in vanilla JavaScript. In order to run the scripts I use [Quokka JS](https://quokkajs.com) to live eveluate it straigth in VSCode. 

## Using Inputs
There is a helper in the repo that automatocally parses the daily input into an array of strings representing the individual lines.

```js
const getInputValues = require('./helper/get-input-values');

// replace 'x' with the name of the .txt file located in the `input` folder
const input = await getInputValues( 'x' );
```