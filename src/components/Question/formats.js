import React from 'react'
import {Text, StyleSheet} from 'react-native'

export const FIND_TAGS = /((\*(.+?)\*)|(_(.+?)_)|({{(field|hidden):.+}}))/g

export const types = {
  bold: {
    expression: /(\*(.+?)\*)/,
    render: (token) => (
      <Text key={token} style={[{fontWeight: '800'}]}>
        {token}
      </Text>
    ),
    stripFormatting: token => token.replace(/\*(.+?)\*/, '$1')
  },
  italic: {
    expression: /(_(.+?)_)/,
    render: (token) => (
      <Text key={token} style={[{fontStyle: 'italic'}]}>
        {token}
      </Text>
    ),
    stripFormatting: token => token.replace(/_(.+?)_/, '$1')
  },
  field: {
    expression: /({{field:.+}})/,
    render: (token, fields) => {
      return (
        <Text key={token} style={$.pipingText}>
          {fields[token]}
        </Text>
      )
    },
    stripFormatting: token => token.replace(/{{field:(.+?)}}/, '$1')
  },
  hidden: {
    expression: /({{hidden:.+}})/,
    render: (token) => {
      return (
        <Text key={token} style={[{color: 'red'}]}>
          {token}
        </Text>
      )
    },
    stripFormatting: token => token.replace(/{{hidden:(.+?)}}/, '$1')
  }
}

const $ = StyleSheet.create({
  bold: {
    fontWeight: '600'
  },
  italic: {
    fontStyle: 'italic'
  },
  pipingText: {
    color: '#4fb0ae'
  },
  hidden: {
    backgroundColor: 'lightblue'
  }
})
