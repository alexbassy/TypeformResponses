export const getResponsesCount = responses => {
  return responses.items.filter(response => response.answers).length
}

export const getCompletionRate = responses => {
  const completed = getResponsesCount(responses)
  return completed ? responses.total_items / completed : 0
}

export const findQuestion = (fields, comparison) => {
  for (let field of fields) {
    if (field.type !== 'group') {
      if (comparison(field)) {
        return field
      }
    } else {
      for (let subField of field.properties.fields) {
        if (comparison(subField)) {
          return subField
        }
      }
    }
  }
  return null
}

export const getResponsesForQuestion = (field, responses) => {
  if (!field) {
    return []
  }
  const { id } = field
  return responses.items.reduce((result, entry) => {
    if (!entry.answers || !entry.answers.length) {
      return result
    }
    entry.answers.forEach(answer => {
      if (answer.field.id === id) {
        result.push(answer)
      }
    })
    return result
  }, [])
}

export const tallyMultipleChoiceAnswers = ({ field, responses }) => {
  // first create object of all possible answers
  const totalAnswers = responses.length
  return responses.reduce((result, answerItem) => {
    const answer = answerItem.choice.label
    if (!result[answer]) {
      result[answer] = {
        label: answer,
        count: 0
      }
    }

    if (field && field.type === 'picture_choice') {
      const choice = field.properties.choices.find(x => x.label === answer)
      result[answer].imageURL = choice.attachment.href
    }

    result[answer].count++
    result[answer].percentage = (result[answer].count / totalAnswers) * 100
    return result
  }, {})
}
