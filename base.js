import React, { Component } from 'react'
import { AsyncStorage, ActionSheetIOS} from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class BaseComponent extends Component {
  navigate = (...args) => {
    this.props.navigation.navigate(...args)
  }

  doLogout = async () => {
    await AsyncStorage.removeItem('AccessToken')
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  logout = async () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Logout', 'Cancel'],
      title: 'Are you sure you want to logout of your account?',
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        this.doLogout()
      }
    })
  }
}
