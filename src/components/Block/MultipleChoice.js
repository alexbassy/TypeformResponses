import React from 'react'
import { View } from 'react-native'
import BaseBlock from './BaseBlock'
import HorizontalBarChart from '../HorizontalBarChart'
import { tallyMultipleChoiceAnswers } from '../../utils'

const MultipleChoice = (props) => {
  const { responses, field } = props
  const choices = tallyMultipleChoiceAnswers({ field, responses })
  return (
    <BaseBlock {...props}>
      <View>
        <HorizontalBarChart responses={choices} />
      </View>
    </BaseBlock>
  )
}

export default MultipleChoice
