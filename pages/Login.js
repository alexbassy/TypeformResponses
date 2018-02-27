import React from 'react'
import BaseComponent from '../base'
import Api from '../api'
import { CLIENT_ID, OAUTH_CALLBACK, APPLICATION_SCOPES } from '../secrets'
import url from 'url'
import querystring from 'querystring'
import { StyleSheet, View, KeyboardAvoidingView, Linking, AsyncStorage } from 'react-native'
import { TFHeading2 } from '../components/typography'
import { TFForm, TFButton } from '../components/form-elements'

export default class Login extends BaseComponent {
  _handleOauthCallback = async (ev) => {
    Linking.removeEventListener('url', this._handleOauthCallback)
    const parsed = url.parse(ev.url)
    const callbackParams = querystring.parse(parsed.query)
    const { code } = callbackParams

    if (!code) {
      return
    }

    const authentication = await Api.getToken({ code })

    const token = authentication['access_token']
    await AsyncStorage.setItem('AccessToken', token)

    this.goToListForms()
  }

  _doAuthentication = () => {
    const scopes = APPLICATION_SCOPES.join('+')
    const requestUri = `${Api.baseEndpoint}/authorize?client_id=${CLIENT_ID}&redirect_uri=${OAUTH_CALLBACK}&scope=${scopes}`
    Linking.openURL(requestUri)
    Linking.addEventListener('url', this._handleOauthCallback)
  }

  goToListForms () {
    this.navigate('ListForms')
  }

  render () {
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
