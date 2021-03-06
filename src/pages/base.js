import React, {Component} from 'react'
import {AsyncStorage, ActionSheetIOS, View, ActivityIndicator, StyleSheet} from 'react-native'

const pageProperties = {
  navigatorStyle: {
    largeTitle: true
  }
}

export default class BasePage extends Component {
  paths = {
    '/login': this.goToLoginScreen,
    '/callback': this.goToLoginScreen,
    '/': this.skipLoginScreen,
    '/form/:id': this.goToFormResponses
  }

  constructor (...args) {
    super(...args)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent (event) {
    // handle a deep link
    console.log(`onNavigatorEvent:`, event)
    if (event.type === 'DeepLink') {
      const parts = event.link.split('/') // Link parts
      const payload = event.payload // (optional) The payload

      if (parts[0] === 'tab2') {
        // handle the link somehow, usually run a this.props.navigator command
      }
    }
  }

  goToLoginScreen ({logout = false} = {}) {
    const ev = {
      screen: 'responses.Login',
      title: 'Login',
      animated: false,
      navigatorStyle: {
        navBarHidden: true,
        disabledBackGesture: true
      }
    }
    this.props.navigator.resetTo(ev)
  }

  skipLoginScreen () {
    this.props.navigator.resetTo({
      screen: 'responses.ListForms',
      title: 'My typeforms',
      animated: false,
      ...pageProperties
    })
  }

  goToFormResponses (form) {
    this.props.navigator.push({
      screen: 'responses.ViewResponses',
      title: form.title,
      passProps: {form},
      ...pageProperties
    })
  }

  doLogout = async () => {
    console.log('[to do]: clear token from cache')
    this.goToLoginScreen({logout: true})
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

  renderLoading ({ light = false } = {}) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={light ? '#fff' : '#000'} />
      </View>
    )
  }

  async saveLastLocation (path) {
    await AsyncStorage.setItem('lastLocation', path)
  }

  async jumpToLocation () {
    const lastLocation = await AsyncStorage.getItem('lastLocation')
    if (!lastLocation || !this.paths[lastLocation]) return
    this.paths[lastLocation]()
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
