import React from 'react'
import { View } from 'react-native'
import Block from './Block'
import HorizontalBarChart from '../HorizontalBarChart'
import { tallyMultipleChoiceAnswers } from '../../utils'

const PictureChoice = (props) => {
  const { field, responses } = props
  const choices = tallyMultipleChoiceAnswers({ field, responses })

  return (
    <Block {...props}>
      <View>
        <HorizontalBarChart responses={choices} />
      </View>
    </Block>
  )
}

export default PictureChoice
