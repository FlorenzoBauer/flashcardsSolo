const data = require('./data.js');
const prototypeQuestions = data.prototypeData;
const util = require('./util.js');
const decks = require('./deck.js');
function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${decks.countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}

function printQuestion(round) {
  util.main(round);
}

module.exports = { printMessage, printQuestion };
