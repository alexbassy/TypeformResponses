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
      style={style.ButtonContainer}
      activeOpacity={0.75}
      onPress={props.onPress || (() => {})}
    >
      <Text style={style.Button}>
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
    borderColor: '#d3d3d3',
    padding: 10,
    marginBottom: 16
  },
  TextInput: {
    fontFamily: 'apercu-regular'
  },
  ButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262627',
    width: '100%',
    height: 40,
    borderRadius: 3
  },
  Button: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'apercu-regular',
  }
})
