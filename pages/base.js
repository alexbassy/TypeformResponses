import React, { Component } from 'react'
import { ActionSheetIOS } from 'react-native'
import Api from '../api'

const pageProperties = {
  navigatorStyle: {
    largeTitle: true
  }
}

export default class BaseComponent extends Component {
  async getToken () {
    return await Api.getToken('AccessToken')
  }

  onNavigatorEvent (event) {
    console.log(event)
    // handle a deep link
    if (event.type === 'DeepLink') {
      const parts = event.link.split('/') // Link parts
      const payload = event.payload // (optional) The payload

      if (parts[0] === 'tab2') {
        // handle the link somehow, usually run a this.props.navigator command
      }
    }
  }

  goToLoginScreen ({ logout = false } = {}) {
    const ev = {
      screen: 'responses.Login',
      title: 'Login',
      animated: false,
      ...pageProperties
    }
    this.props.navigator.resetTo(ev)
  }

  skipLoginScreen () {
    this.props.navigator.resetTo({
      screen: 'responses.ListForms',
      title: 'Your typeforms',
      animated: false,
      ...pageProperties
    })
  }

  goToListForms () {
    this.props.navigator.push({
      screen: 'responses.ListForms',
      title: 'Your typeforms',
      ...pageProperties
    })
  }

  goToFormResponses (form) {
    this.props.navigator.push({
      screen: 'responses.ViewResponses',
      title: form.title,
      passProps: { form },
      ...pageProperties
    })
  }

  doLogout = async () => {
    console.log('[to do]: clear token from cache')
    this.goToLoginScreen({ logout: true })
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

  openSettings = () => {
    this.props.navigator.showModal({
      screen: 'responses.Settings',
      title: 'Settings',
      animationType: 'slide-up',
      ...pageProperties
    })
  }
}
