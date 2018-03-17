import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

export const H1 = props => (
  <Text style={[style.Heading, style.Heading1, props.center && style.center]} {...props} />
)

export const H2 = props => (
  <Text style={[style.Heading, style.Heading2, props.center && style.center]} {...props} />
)

export const H3 = props => (
  <Text style={[style.Heading, style.Heading3, props.center && style.center]} {...props} />
)

export const H4 = props => (
  <Text style={[style.Heading, style.Heading4, props.center && style.center]} {...props} />
)

export const H5 = props => (
  <Text style={[style.Heading, style.Heading5, props.center && style.center]} {...props} />
)

export const H6 = props => (
  <Text style={[style.Heading, style.Heading6, props.center && style.center]} {...props} />
)

const style = StyleSheet.create({
  Heading: {
    fontFamily: 'Apercu Pro'
  },
  Heading1: {
    fontSize: 48,
    lineHeight: 56
  },
  Heading2: {
    fontSize: 32,
    lineHeight: 42
  },
  Heading3: {
    fontSize: 24,
    lineHeight: 32
  },
  Heading4: {
    fontSize: 18,
    lineHeight: 24
  },
  Heading5: {
    fontSize: 16,
    lineHeight: 22
  },
  Heading6: {
    fontSize: 14,
    lineHeight: 18
  },
  center: {
    textAlign: 'center'
  }
})
