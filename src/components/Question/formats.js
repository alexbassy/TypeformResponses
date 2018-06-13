import React from 'react'
import styled from 'styled-components'

export const EXPRESSION_FIND_FIELDS = /({{(field|hidden):[a-z0-9-]+}})/g

const PipedField = styled.Text`
  color: #4fb0ae;
`

const HiddenField = styled.Text`
  color: red;
`

export function stripBoldAndItalic (text) {
  return text.replace(/[*_]/g, '')
}

export const types = {
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
