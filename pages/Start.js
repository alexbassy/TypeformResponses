import React from 'react'
import { AsyncStorage } from 'react-native'
import BaseComponent from '../base'

export default class Start extends BaseComponent {
  async componentDidMount () {
    const token = await AsyncStorage.getItem('AccessToken')
    if (token) {
      return this.skipLoginScreen()
    } else {
      return this.goToLoginScreen()
    }
  }

  render () {
    return null
  }
}
