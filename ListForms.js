import React from 'react'
import BaseComponent from './base'
import { endpoint } from './secrets'
import { View, StyleSheet, ActivityIndicator, ScrollView, TouchableHighlight, Button, RefreshControl } from 'react-native'
import { List, ListItem } from 'react-native-elements'

export default class ListForms extends BaseComponent {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: 'Your typeforms',
      headerLeft: null,
      headerTitleStyle: {
        fontFamily: 'Apercu Pro'
      },
      headerRight: (
        <Button
          onPress={params ? params.logout : (() => {})}
          style={{ fontFamily: 'Apercu Pro' }}
          title='Logout'
        />
      )
    }
  }

  state = {
    forms: [],
    refreshing: false
  }

  componentDidMount () {
    // hack to suppress error for updating unmounted component
    setTimeout(() => this.props.navigation.setParams({ logout: this.logout }), 1)
    this.getTypeforms()
  }

  async getTypeforms (isRefreshing = false) {
    const token = await this.getToken()

    const response = await fetch(endpoint.listForms, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `bearer ${token}`
      }
    })

    const json = await response.json()

    this.setState({
      forms: json.items,
      refreshing: isRefreshing ? false : this.state.refreshing
    })
  }

  viewResponses (form) {
    const { id, title } = form
    this.props.navigation.navigate('ViewResponses', {
      id,
      title,
      token: this.getToken()
    })
  }

  refreshForms = () => {
    this.setState({ refreshing: true })
    this.getTypeforms(true)
  }

  render () {
    const { forms, refreshing } = this.state

    if (!forms.length) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#000' />
        </View>
      )
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.refreshForms}
          />
        }
      >
        <List containerStyle={{ borderColor: '#cdccd1' }}>
          {this.state.forms.map((form) => (
            <ListItem
              key={form.id}
              component={TouchableHighlight}
              underlayColor={'#efeff4'}
              containerStyle={{
                borderBottomColor: '#cdccd1'
              }}
              titleStyle={{
                fontFamily: 'Apercu Pro'
              }}
              title={form.title}
              onPress={() => this.viewResponses(form)}
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
