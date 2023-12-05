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
  if (round.currentCard === undefined) {
    console.log('End Round', round.currentCard)
    return round.currentCard;
  }

  let isCorrect = card.evaluateGuess(id, round.currentCard.correctAnswer);
  if(isCorrect ===  true){
    if (round.deck.cards.length === 1 && round.incorrectCards.length > 0) {
      round.deck.cards.splice(0, 1);
      round.deck.cards = [...round.incorrectCards];
      round.incorrectCards = [];
      round.currentCard = round.deck.cards[0];
      return `correct! You're incorrect cards added back to deck.`
    }
    round.deck.cards.splice(0, 1);
    round.currentCard = round.deck.cards[0];
    return 'correct'
  }
  else if(isCorrect === false){
    if (round.deck.cards.length === 1 && round.incorrectCards.length > 0) {
      round.deck.cards.splice(0, 1);
      round.deck.cards = [...round.incorrectCards];
      round.incorrectCards = [];
      round.currentCard = round.deck.cards[0];
      return `incorrect! You're incorrect cards are being added back to deck.`
    }
  round.incorrectCards.push(round.currentCard);
  round.incorrectGuesses.push(round.currentCard.id);
  round.deck.cards.splice(0, 1);
  round.currentCard = round.deck.cards[0];
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
    return `** Round over! ** You answered ${percentCorrect}% of the questions correctly!`
}

module.exports = {
  createRound,
  takeTurn,
  calculatePercentCorrect,
  endRound
};
