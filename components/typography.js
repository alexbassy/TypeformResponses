import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

export const TFHeading1 = props => (
  <Text style={[style.Heading, style.Heading1]} {...props} />
)

export const TFHeading2 = props => (
  <Text style={[style.Heading, style.Heading2]} {...props} />
)

export const TFHeading3 = props => (
  <Text style={[style.Heading, style.Heading3]} {...props} />
)

export const TFHeading4 = props => (
  <Text style={[style.Heading, style.Heading4]} {...props} />
)

export const TFHeading5 = props => (
  <Text style={[style.Heading, style.Heading5]} {...props} />
)

export const TFHeading6 = props => (
  <Text style={[style.Heading, style.Heading6]} {...props} />
)

const style = StyleSheet.create({
  Heading: {
    fontFamily: 'Apercu Pro'
  },
  Heading1: {
    fontSize: 48
  },
  Heading2: {
    fontSize: 32
  },
  Heading3: {
    fontSize: 24
  },
  Heading4: {
    fontSize: 18
  },
  Heading5: {
    fontSize: 16
  },
  Heading6: {
    fontSize: 14
  }
})
