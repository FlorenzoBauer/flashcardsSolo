const inquirer = require('inquirer');
const {createCard} = require('./src/card.js');
const deck = require('./src/deck.js');
const round = require('./src/round.js');
const game = require('./src/game.js');
const data = require('./src/data.js');
const prototypeQuestions = data.prototypeData;

function start() {
    const cards = prototypeQuestions.map((question) => {
        return createCard(question.id, question.question, question.answers, question.correctAnswer);
    });
    const deck1 =  deck.createDeck(cards);
    const round1 = round.createRound(deck1);
    game.printMessage(deck1);
    game.printQuestion(round1);
}
start();