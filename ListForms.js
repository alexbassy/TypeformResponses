import React from 'react'
import { endpoint } from './secrets'
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import { List, ListItem } from 'react-native-elements'

export default class ListForms extends React.Component {
  static navigationOptions = {
    title: 'Your typeforms',
    headerLeft: null
  }

  state = {
    forms: []
  }

  componentDidMount () {
    const { token } = this.props.navigation.state.params
    this.getTypeforms(token)
  }

  async getTypeforms (token) {
    console.log(token)
    const response = await fetch(endpoint.listForms, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `bearer ${token}`
      }
    })

    const json = await response.json()

    console.log(json)

    this.setState({
      forms: json.items
    })
  }

  render () {
    const { forms } = this.state

    if (!forms.length) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#000'/>
        </View>
      )
    }

    return (
      <ScrollView>
        <List>
          {this.state.forms.map((form, i) => (
            <ListItem
              key={i}
              title={form.title}
            />
          ))}
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
