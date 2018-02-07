import React from 'react'
import BaseComponent from './base'
import url from 'url'
import querystring from 'querystring'
import { StyleSheet, View, ActivityIndicator, KeyboardAvoidingView, Linking, AsyncStorage } from 'react-native'
import { clientID, clientSecret, callback, endpoint, scopes } from './secrets'
import { TFHeading2 } from './components/typography'
import { TFForm, TFButton } from './components/form-elements'

export default class Login extends BaseComponent {
  state = {
    loading: true
  }

  async componentDidMount () {
    const token = await AsyncStorage.getItem('AccessToken')
    if (token) {
      this.goToListForms(token)
    } else {
      this.setState({ loading: false })
    }
  }

  _handleOauthCallback = async (ev) => {
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

    const token = json['access_token']
    await AsyncStorage.setItem('AccessToken', json['access_token'])

    this.goToListForms(token)
  }

  _doAuthentication = () => {
    const requestUri = `${endpoint.authorize}?client_id=${clientID}&redirect_uri=${callback}&scope=${scopes}`
    Linking.openURL(requestUri)
    Linking.addEventListener('url', this._handleOauthCallback)
  }

  goToListForms (token) {
    const { navigate } = this.props.navigation
    navigate('ListForms', { token })
  }

  render () {
    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#000'/>
        </View>
      )
    }

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
      >
        <View style={styles.headingWrap}>
          <TFHeading2>
            Read your typeform responses on the go.
          </TFHeading2>
        </View>
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1ece4'
  },
  headingWrap: {
    marginBottom: 24
  }
})
