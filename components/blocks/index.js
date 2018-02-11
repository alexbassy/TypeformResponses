import React from 'react'
import { getResponsesForQuestion } from '../../utils'

import Block from './Block'
import MultipleChoice from './MultipleChoice'
import PictureChoice from './PictureChoice'
import ShortText from './ShortText'

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
      return <ShortText {...props} />
    case 'picture_choice':
      return <PictureChoice {...props} />
    case 'statement':
      return null
    default:
      return <Block {...props} />
  }
}
