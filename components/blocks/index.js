import React from 'react'
import { getResponsesForQuestion } from '../../utils'

import Block from './Block'
import MultipleChoice from './MultipleChoice'
import PictureChoice from './PictureChoice'
import TextBlock from './TextBlock'

export default (field, responses) => {
  const questionResponses = getResponsesForQuestion(field, responses)

  const props = {
    key: field.id,
    field: field,
    responses: questionResponses,
    allResponses: responses
  }

  switch (field.type) {
    case 'multiple_choice':
      return <MultipleChoice {...props} />
    case 'short_text':
    case 'long_text':
    case 'email':
    case 'number':
    case 'url':
    case 'date':
      return <TextBlock {...props} />
    case 'picture_choice':
      return <PictureChoice {...props} />
    case 'statement':
      return null
    default:
      return <Block {...props} />
  }
}
