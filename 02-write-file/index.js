const fs = require('fs');
const path = require('path');
const {stdin} = process;

const pathToText = path.join(__dirname, '', 'text.txt');
fs.open(pathToText, 'w', (error) => {
  if(error) throw error;
});

const output = fs.createWriteStream(pathToText);
console.log('Привет!');
stdin.on('data', data => {
  if(data.toString().trim() === 'exit') process.exit();
  output.write(data);
});


process.on('SIGINT', function() {
  process.exit();
} );
  
process.on('exit', function() {
  console.log('Пока!)' );
} );