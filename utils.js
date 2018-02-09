export const getResponsesCount = responses => {
  return responses.items.filter(response => response.answers).length
}

export const getCompletionRate = responses => {
  const completed = getResponsesCount(responses)
  return completed ? responses.total_items / completed : 0
}

export const getResponsesForQuestion = (field, responses) => {
  const { id } = field
  return responses.items.reduce((result, { answers }) => {
    answers.forEach(answer => {
      if (answer.field.id === id) {
        result.push(answer)
      }
    })
    return result
  }, [])
}

export const tallyMultipleChoiceAnswers = (answers) => {
  // first create object of all possible answers
  const totalAnswers = answers.length
  return answers.reduce((result, answerItem) => {
    const answer = answerItem.choice.label
    if (!result[answer]) {
      result[answer] = {
        label: answer,
        count: 0
      }
    }
    result[answer].count++
    result[answer].percentage = (result[answer].count / totalAnswers) * 100
    return result
  }, {})
}
