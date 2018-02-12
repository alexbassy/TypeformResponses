import React from 'react'
import Block from './Block'
import HorizontalBarChart from '../HorizontalBarChart'
import Expandable from '../Expandable'
import { tallyMultipleChoiceAnswers } from '../../utils'

const PictureChoice = (props) => {
  const { field, responses } = props
  const choices = tallyMultipleChoiceAnswers({ field, responses })
  return (
    <Block {...props}>
      <Expandable maxHeight={300}>
        <HorizontalBarChart responses={choices} />
      </Expandable>
    </Block>
  )
}

export default PictureChoice
