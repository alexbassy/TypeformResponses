import React from 'react'
import { View, StyleSheet } from 'react-native'
import Block from './Block'
import HorizontalBarChart from '../HorizontalBarChart'
import { tallyMultipleChoiceAnswers } from '../../utils'

const MultipleChoice = (props) => {
  const choices = tallyMultipleChoiceAnswers(props.responses)
  return (
    <Block {...props}>
      <View style={style.barGraphContainer}>
        <HorizontalBarChart responses={choices} />
      </View>
    </Block>
  )
}

export default MultipleChoice

const style = StyleSheet.create({
  barGraphContainer: {
    // flexDirection: 'row'
  }
})
