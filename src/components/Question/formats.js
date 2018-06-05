import React from 'react'
import styled from 'styled-components'

export const FIND_TAGS = /((\*(.+?)\*)|(_(.+?)_)|({{(field|hidden):.+?}}))/g

const PipedField = styled.Text`
  color: #4fb0ae;
`

const HiddenField = styled.Text`
  color: red;
`

export const types = {
  bold: {
    expression: /(\*(.+?)\*)/,
    render: (token) => token,
    strip: token => token.replace(/\*(.+?)\*/, '$1')
  },
  italic: {
    expression: /(_(.+?)_)/,
    render: (token) => token,
    strip: token => token.replace(/_(.+?)_/, '$1')
  },
  field: {
    expression: /({{field:.+}})/,
    render: (token, fields) => {
      return (
        <PipedField key={token}>
          {fields[token]}
        </PipedField>
      )
    },
    strip: token => token.replace(/{{field:(.+?)}}/, '$1')
  },
  hidden: {
    expression: /({{hidden:.+}})/,
    render: (token) => {
      return (
        <HiddenField key={token}>
          {token}
        </HiddenField>
      )
    },
    strip: token => token.replace(/{{hidden:(.+?)}}/, '$1')
  }
}
