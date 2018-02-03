import React from 'react'
import url from 'url'
import querystring from 'querystring'
import { StyleSheet, Alert, KeyboardAvoidingView, Linking, AsyncStorage } from 'react-native'
import { clientID, clientSecret, callback, endpoint, scopes } from './secrets'
import { TFHeading2 } from './components/typography'
import { TFForm, TFButton } from './components/form-elements'

export default class Login extends React.Component {
  state = {}

  async componentDidMount () {
    const token = await AsyncStorage.getItem('AccessToken')
    if (token) {
      Alert.alert(`You're authenticated`)
    }
  }

  async _handleOauthCallback (ev) {
    Linking.removeEventListener('url', this._handleOauthCallback)
    const parsed = url.parse(ev.url)
    const callbackParams = querystring.parse(parsed.query)
    const { code } = callbackParams

    if (!code) {
      return
    }
    const body = querystring.stringify({
      'code': code,
      'client_id': clientID,
      'client_secret': clientSecret,
      'redirect_uri': callback
    })

    const response = await fetch(endpoint.token, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })

    const json = await response.json()

    await AsyncStorage.setItem('AccessToken', json['access_token'])

    Alert.alert(`You're authenticated`)
  }

  _doAuthentication = () => {
    const requestUri = `${endpoint.authorize}?client_id=${clientID}&redirect_uri=${callback}&scope=${scopes}`
    Linking.openURL(requestUri)
    Linking.addEventListener('url', this._handleOauthCallback)
  }

  render () {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
      >
        <TFHeading2>
          Read your typeform responses on the go.
        </TFHeading2>
        <TFForm>
          <TFButton
            large
            onPress={this._doAuthentication}
            title='Login to Typeform'
          />
        </TFForm>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1ece4'
  }
})
