function createDeck(cards) {
    return {
      cards,
      numberOfCards: cards.length
    };
  }
function countCards(deck) {
  console.log(deck.numberOfCards)
    return deck.numberOfCards;
}
module.exports = {
    createDeck,
    countCards
}