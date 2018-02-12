import React from 'react'
import { View } from 'react-native'
import Block from './Block'
import HorizontalBarChart from '../HorizontalBarChart'
import { tallyMultipleChoiceAnswers } from '../../utils'

const MultipleChoice = (props) => {
  const { responses, field } = props
  const choices = tallyMultipleChoiceAnswers({ field, responses })
  return (
    <Block {...props}>
      <View>
        <HorizontalBarChart responses={choices} />
      </View>
    </Block>
  )
}

export default MultipleChoice
