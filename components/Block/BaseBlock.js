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
  const iconStyle = {
    backgroundColor: blockColors[camelCase(field.type)]
  }
  return (
    <View style={style.blockContainer}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={[style.questionTypeIcon, iconStyle]}/>
        <View style={{ flex: 1 }}>
          <View>
            <Text>
              {field.title}
            </Text>
            {responses && (
              <Text style={style.responseRate}>
                {totalResponsesCount &&
                `${count} out of ${totalResponsesCount} people answered this question`}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={[style.answerContainer, { backgroundColor: answerBackground }]}>
        {children}
      </View>
    </View>
  )
}

export default BaseBlock

const style = StyleSheet.create({
  blockContainer: {
    backgroundColor: '#fff',
    borderRadius: 3,
    marginHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8
  },
  answerContainer: {
    flex: 1,
    paddingHorizontal: 8
  },
  questionTypeIcon: {
    width: 20,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 8,
    marginTop: 3
  },
  responseRate: {
    fontSize: 12,
    lineHeight: 18,
    color: '#999'
  }
})
