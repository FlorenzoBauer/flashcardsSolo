const card = require('../src/card');
function createRound(deck) {
  return {
    deck,
    currentCard: deck.cards[0],
    turn: 0,
    incorrectGuesses: [],
    incorrectCards: [],
  };
}

function takeTurn(id, round) {
  let currentIndex = round.deck.cards.indexOf(round.currentCard);
  round.turn++;
  currentIndex = (currentIndex + 1) % round.deck.cards.length;
 
  console.log('deck', round.deck.cards.length)
  if (round.turn === round.deck.cards.length && round.incorrectCards.length === 0) {
    console.log('End Round', !round.currentCard)
    return !round.currentCard;
  }
  else if (round.turn === round.deck.cards.length && round.incorrectCards.length > 0) {
    round.deck.cards = [...round.incorrectCards];
    round.incorrectCards = [];
    round.turn = 0;
    currentIndex = 0;
    round.currentCard = round.deck.cards[currentIndex];
    return 'Incorrect cards added back to deck.'
  }
  let isCorrect = card.evaluateGuess(id, round.currentCard.correctAnswer);
  console.log('index', currentIndex)
  console.log('isCorrect', isCorrect)
  if(isCorrect ===  true){
    round.currentCard = round.deck.cards[round.turn];
    return 'correct'
  }
  else if(isCorrect === false){
  round.incorrectCards.push(round.currentCard);
  round.currentCard = round.deck.cards[round.turn];
  return 'incorrect'
  }
}


function calculatePercentCorrect(round) {
    const correctGuesses = round.turn - round.incorrectGuesses.length;
    const percentCorrect = (correctGuesses / round.turn) * 100 || 0;
    return percentCorrect.toFixed(2);
    }
    
function endRound(round) {
  const percentCorrect = calculatePercentCorrect(round);
  if (round.turn >= round.deck.cards.length + round.incorrectCards.length) {
    return `** Round over! ** You answered ${percentCorrect}% of the questions correctly!`
    
  }

  

    
}

module.exports = {
  createRound,
  takeTurn,
  calculatePercentCorrect,
  endRound
};
