// @flow
import type { Field } from './types/api'

// omit ".00"
export const formatPercentage = (n: number) => {
  const pc = typeof n === 'number' ? n.toFixed(2) : n
  return /\.00$/.test(pc) ? pc.match(/([0-9]+)/)[0] : pc
}

export const getResponsesCount = responses => {
  return responses.items.filter(response => response.answers).length
}

export const getCompletionRate = responses => {
  const completed = getResponsesCount(responses)
  return completed ? responses.total_items / completed : 0
}

export const findQuestion = (fields: Field[], comparison: Function) => {
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

export const getResponsesForQuestion = (field: Field, responses) => {
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
        result.push({
          id: entry.landing_id,
          submissionTime: entry.submitted_at,
          ...answer
        })
      }
    })
    return result
  }, [])
}

export const tallyMultipleChoiceAnswers = ({ field, responses } : { field: Field, responses: any }) => {
  // make a smaller object for each choice
  const fields = field.properties.choices.reduce((result, choice) => {
    result[choice.label] = {
      label: choice.label,
      count: 0
    }
    if (field.type === 'picture_choice') {
      Object.assign(result[choice.label], {
        imageURL: choice.attachment.href
      })
    }
    return result
  }, {})

  // increment each count
  responses.forEach(response => {
    if (field.properties.allow_multiple_selection) {
      response.choices.labels.forEach(label => {
        fields[label].count++
      })
    } else {
      const label = response.choice.label
      fields[label].count++
    }
  })

  // get real total
  const total = Object.keys(fields).reduce((result, label) => {
    result += fields[label].count
    return result
  }, 0)

  // work out percentages from real total
  const responsesWithPercentages = Object.keys(fields).reduce((result, label) => {
    result[label] = Object.assign({}, fields[label], {
      percentage: fields[label].count / total * 100
    })
    return result
  }, {})

  return responsesWithPercentages
}
