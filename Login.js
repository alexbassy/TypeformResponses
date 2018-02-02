import React from 'react'
import { StyleSheet, View, Platform, Linking, TextInput, Button, KeyboardAvoidingView } from 'react-native'

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login to Typeform'
  }

  state = {}

  componentDidMount () {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url)
      })
    } else {
      Linking.addEventListener('url', this.handleOpenURL)
    }
  }

  componentWillUnmount () {
    Linking.removeEventListener('url', this.handleOpenURL)
  }

  handleOpenURL = (event) => {
    this.navigate(event.url)
  }

  navigate = (url) => {
    const { navigate } = this.props.navigation
    const route = url.replace(/.*?:\/\//g, '')
    const id = route.match(/\/([^\/]+)\/?$/)[1]
    const routeName = route.split('/')[0]

    if (routeName === 'people') {
      navigate('ListForms', { id, name: 'chris' })
    }
  }

  render () {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
      >
        <TextInput
          placeholder='Username'
        />
        <TextInput
          placeholder='Password'
        />
        <Button
          title='Login'
          onPress={ev => console.log(ev)}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: 24
  }
})
