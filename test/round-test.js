const chai = require('chai');
const expect = chai.expect;

const { createCard } = require('../src/card');
const { createDeck } = require('../src/deck');
const { createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/round');

describe('round', function () {
  let card1, card2, card3, cards, deck, round;

  beforeEach(function () {
    card1 = createCard(1, 'Question 1', ['A', 'B', 'C'], 'A');
    card2 = createCard(2, 'Question 2', ['D', 'E', 'F'], 'E');
    card3 = createCard(3, 'Question 3', ['H', 'I', 'J'], 'I');
    cards = [card1, card2, card3];
    deck = createDeck(cards);
    round = createRound(deck);
  });

  it('should start a round', function () {
    expect(round.deck).to.deep.equal(deck);
    expect(round.currentCard).to.equal(card1);
    expect(round.turn).to.equal(0);
    expect(round.incorrectGuesses).to.deep.equal([]);
    expect(round.incorrectCards).to.deep.equal([]);
  });

  it('should handle a correct guess and move to the next card', function () {
    const result = takeTurn('A', round);

    expect(result).to.equal('correct!');
    expect(round.currentCard).to.equal(card2);
  });

  it('should handle an incorrect guess, store the incorrect card, and move to the next card', function () {
    takeTurn('A', round);
    const result = takeTurn('B', round);

    expect(result).to.equal('incorrect!');
    expect(round.currentCard).to.equal(card3);
    expect(round.incorrectGuesses).to.deep.equal([card2.id]); 
    expect(round.incorrectCards).to.deep.equal([card2]);
  });

  it('should calculate the percent correct', function () {
    takeTurn('A', round);
    takeTurn('E', round);
    takeTurn('I', round);
    const percentCorrect = calculatePercentCorrect(round);

    expect(percentCorrect).to.equal('100.00');
  });

  it('should end the round', function () {
    takeTurn('A', round);
    takeTurn('D', round);
    takeTurn('H', round);
    const percentCorrect = calculatePercentCorrect(round);
    const end = endRound(round);

    expect(end).to.equal(`** Round over! ** You answered ${percentCorrect}% of the questions correctly!`);
  });
});
