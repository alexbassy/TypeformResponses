import React from 'react'
import camelCase from 'lodash.camelcase'
import { View, Text, StyleSheet } from 'react-native'
import Question from '../Question'

const blockColors = {
  multipleChoice: '#72bec8',
  shortText: '#e4ba3f',
  pictureChoice: '#c384c5',
  yesNo: '#c75874',
  longText: '#cb722b',
  email: '#5aaa8f',
  opinionScale: '#729dc6',
  rating: '#d0a462',
  date: '#ef8a77',
  number: '#9291d0',
  dropdown: '#76aebd',
  legal: '#a78267',
  fileUpload: '#7f93a6',
  website: '#b0b47f',
  group: '#cb722b'
}

const BaseBlock = ({ field, responses, totalResponsesCount, answerBackground = '#fff', children }) => {
  const count = responses.length
  const isStatement = field.type !== 'statement'
  const showResponses = isStatement && !!responses
  const iconStyle = {
    backgroundColor: blockColors[camelCase(field.type)]
  }

  return (
    <View style={style.blockContainer}>
      <View style={style.questionContainer}>
        <View style={[style.questionTypeIcon, iconStyle]}/>
        <View style={{ flex: 1, marginRight: 16 }}>
          <Text style={style.question}>
            {field.title}
          </Text>
          {showResponses && (
            <Text style={style.responseRate}>
              {totalResponsesCount &&
              `${count} out of ${totalResponsesCount} people answered this question`}
            </Text>
          )}
        </View>
      </View>
      {isStatement && <View style={[style.answerContainer, { backgroundColor: answerBackground }]}>
        {children}
      </View>}
    </View>
  )
}

export default BaseBlock

const style = StyleSheet.create({
  blockContainer: {
    backgroundColor: '#fff',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8
  },
  questionContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    flex: 1
  },
  answerContainer: {
    flex: 1
  },
  question: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'Apercu Pro'
  },
  questionTypeIcon: {
    width: 5,
    height: 5,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 8
  },
  responseRate: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    color: '#999'
  }
})
