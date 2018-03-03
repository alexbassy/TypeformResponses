import React from 'react'
import BaseBlock from './BaseBlock'
import HorizontalBarChart from '../HorizontalBarChart'
import Expandable from '../Expandable'
import { tallyMultipleChoiceAnswers } from '../../utils'

const PictureChoice = (props) => {
  const { field, responses } = props
  const choices = tallyMultipleChoiceAnswers({ field, responses })
  return (
    <BaseBlock {...props}>
      <Expandable>
        <HorizontalBarChart responses={choices} />
      </Expandable>
    </BaseBlock>
  )
}

export default PictureChoice
