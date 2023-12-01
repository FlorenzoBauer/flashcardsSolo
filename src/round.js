function createRound(deck) {
  return {
    deck,
    currentCard: deck.cards[0],
    turn: 0,
    incorrectGuesses: [],
    incorrectCards: []
  }
};
function createRound(deck) {
  return {
    deck,
    currentCard: deck.cards[0],
    turn: 0,
    incorrectGuesses: [],
    incorrectCards: [],  // Initialize incorrectCards as an empty array
  };
}

function takeTurn(id, round) {
  round.turn++;
  const currentIndex = round.deck.cards.indexOf(round.currentCard);
  const deckSize = round.deck.cards.length + round.incorrectCards.length;

  if (id === round.currentCard.correctAnswer) {
    const nextIndex = (currentIndex + 1) % deckSize;

    if (nextIndex === round.deck.cards.length && round.incorrectCards.length > 0) {
      // Completed the deck and incorrect cards, restart with the original deck
      round.deck.cards = [...round.deck.cards, ...round.incorrectCards];
      round.incorrectCards = [];
    }

    round.currentCard = round.deck.cards[nextIndex];
    return 'correct!';
  } else {
    round.incorrectGuesses.push(round.currentCard.id);
    round.incorrectCards.push(round.currentCard); // Store the incorrect card

    if (round.deck.cards.length > 1) {
      // Move to the next card from the deck
      const nextIndex = (currentIndex + 1) % deckSize;
      round.currentCard = round.deck.cards[nextIndex];
    } else if (round.incorrectCards.length > 0) {
      // No more deck cards, switch to incorrect cards
      round.deck.cards = [...round.incorrectCards];
      round.incorrectCards = [];
      round.currentCard = round.deck.cards[0];
    }

    return 'incorrect!';
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
