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

const Block = ({ field, responses, allResponses, answerBackground = '#fff', children }) => {
  const count = responses.length
  const totalCount = allResponses.items.length
  const responseRateText = `${count} out of ${totalCount} people answered this question`
  const iconStyle = {
    backgroundColor: blockColors[camelCase(field.type)]
  }
  return (
    <View style={style.blockContainer}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={[style.questionTypeIcon, iconStyle]}/>
        <View style={{ flex: 1, backgroundColor: answerBackground }}>
          <View>
            <Text>
              {field.title}
            </Text>
            {responses && (
              <Text style={style.responseRate}>
                {responseRateText}
              </Text>
            )}
          </View>
        </View>
      </View>
      {children}
    </View>
  )
}

export default Block

const style = StyleSheet.create({
  blockContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 3,
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingRight: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8
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
