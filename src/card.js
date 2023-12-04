function createCard(id, question, answers, correctAnswer) {
    return {
        id,
        question,
        answers,
        correctAnswer
    }

}
function evaluateGuess(guess, correctAnswer) {
    if (guess === correctAnswer) {
      return true
    } else {
      return false
    }
  }

module.exports = {
    createCard,
    evaluateGuess,
}