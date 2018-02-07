import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import camelCase from 'lodash.camelcase'

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

const Block = ({ field, children }) => {
  return (
    <View key={field.id} style={style.blockContainer} onPress={() => console.log(field)}>
      <View style={[style.questionTypeIcon, {
        backgroundColor: blockColors[camelCase(field.type)]
      }]} />
      <Text>{field.type} {field.title}</Text>
      {children}
    </View>
  )
}

export const ShortTextBlock = ({ field }) => {
  return (
    <Block
      key={field.id}
      field={field}
    >
      {}
    </Block>
  )
}

export const DefaultBlock = ({ field }) => {
  return (
    <Block
      key={field.id}
      field={field}
    />
  )
}

export default (field) => {
  switch (field.type) {
    case 'short_text':
      return <ShortTextBlock field={field} />
    case 'statement':
      return null
    default:
      return <DefaultBlock field={field} />
  }
}

const style = StyleSheet.create({
  blockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 3,
    marginHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  questionTypeIcon: {
    width: 20,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 8
  }
})
