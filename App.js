import React from 'react'
import { StyleSheet, Text, View, NetInfo } from 'react-native'

export default class App extends React.Component {
  state = {}

  componentDidMount () {
    NetInfo.addEventListener(
      'connectionChange',
      this.handleConnectionChange
    )
  }

  handleConnectionChange = ({ type }) => {
    this.setState({
      connectionType: type
    })
  }

  render () {
    const { connectionType } = this.state

    return (
      <View style={styles.container}>
        {connectionType
          ? (
            <Text style={styles.welcomeText}>
              You're using the app on {connectionType}
            </Text>
          )
          : (
            <Text style={styles.welcomeText}>
              You're not connected
            </Text>
          )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: 24
  }
})
