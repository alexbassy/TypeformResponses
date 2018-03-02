import React from 'react'

import BaseBlock from './BaseBlock'
import MultipleChoice from './MultipleChoice'
import PictureChoice from './PictureChoice'
import TextBlock from './TextBlock'

const Block = (props) => {
  switch (props.field.type) {
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
      return <BaseBlock {...props} />
  }
  return <BaseBlock {...props} />
}

export default Block
