function createRound(deck) {
  return {
    deck,
    currentCard: deck.cards[0],
    turn: 0,
    incorrectGuesses: [],
    
  }
};

function takeTurn(id, round) {
  round.turn++;

  if (id === round.currentCard.correctAnswer) {
    // If the answer is correct, move to the next card
    round.currentCard = round.deck.cards[1]; // Replace with the logic to move to the next card
    return 'correct!';
  } else {
    // If the answer is incorrect, store the incorrect guess (card id) in the array
    round.incorrectGuesses.push(round.currentCard.id);

    // Move to the next card
    round.currentCard = round.deck.cards[1]; // Replace with the logic to move to the next card
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
}
