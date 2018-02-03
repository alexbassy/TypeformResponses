import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native'

export const TFTextInput = props => {
  return (
    <View style={style.TextInputContainer}>
      <TextInput
        style={style.TextInput}
        {...props}
      />
    </View>
  )
}

export const TFForm = props => {
  return (
    <View style={style.Form}>
      {props.children}
    </View>
  )
}

export const TFButton = props => {
  return (
    <TouchableOpacity
      style={[style.ButtonContainer, props.large && style.ButtonContainerLarge]}
      activeOpacity={0.75}
      {...props}
    >
      <Text
        style={[style.Button, props.large && style.ButtonLarge]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  Form: {
    width: '100%',
    paddingHorizontal: 32
  },
  TextInputContainer: {
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fff',
    borderColor: '#d3d3d3',
    marginBottom: 16
  },
  TextInput: {
    fontFamily: 'Apercu Pro',
    padding: 8,
    paddingVertical: 12
  },
  ButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262627',
    width: '100%',
    height: 40,
    borderRadius: 3
  },
  ButtonContainerLarge: {
    height: 60
  },
  Button: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Apercu Pro'
  },
  ButtonLarge: {
    fontSize: 22
  }
})
