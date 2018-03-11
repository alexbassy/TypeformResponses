import React from 'react'
import BaseComponent from './base'
import Api from '../api'
import { StyleSheet, View, ScrollView, Linking } from 'react-native'
import { TFHeading2 } from '../components/typography'
import { TFForm, TFButton } from '../components/form-elements'

export default class Login extends BaseComponent {
  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true
  }

  handleAuthorisationCallback = async (ev) => {
    // event contains the URL to which the API will redirect the user
    // in our case, it'll be typeform-responses://authorization?code=XXX
    Linking.removeEventListener('url', this.handleAuthorisationCallback)
    const temporaryAuthorisationCode = Api.helpers.getTemporaryAuthorisationCode(ev.url)

    try {
      const token = await Api.getOauthToken(temporaryAuthorisationCode)
      await Api.setToken(token)
      this.goToListForms()
    } catch (e) {
      this.setState({ loginError: true })
    }
  }

  _doAuthentication = () => {
    const authorisationURL = Api.helpers.generateAuthorisationURL()
    Linking.openURL(authorisationURL)
    Linking.addEventListener('url', this.handleAuthorisationCallback)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headingWrap}>
          <TFHeading2 center>
            Read your responses on the move
          </TFHeading2>
        </View>
        <TFForm>
          <TFButton
            large
            onPress={this._doAuthentication}
            title='Login to Typeform'
          />
        </TFForm>
      </View>
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
    marginHorizontal: 40,
    marginBottom: 24
  }
})
