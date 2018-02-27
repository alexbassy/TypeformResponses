import React from 'react'
import BaseComponent from '../base'
import { endpoint } from '../secrets'
import Api from '../api'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  Button,
  FlatList
} from 'react-native'
import { ListItem } from 'react-native-elements'

export default class ListForms extends BaseComponent {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: 'Your typeforms',
      headerLeft: null,
      headerTitleStyle: styles.font,
      headerRight: (
        <Button
          onPress={params ? params.logout : () => {}}
          style={styles.font}
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
    setTimeout(() => {
      this.props.navigation.setParams({ logout: this.logout })
    }, 1)
    this.getTypeforms()
  }

  async getTypeforms (isRefreshing = false) {
    const items = await Api.listForms()

    console.log(items)

    console.log(`Got forms:`, items)

    const processed = items.map(form => {
      form.key = form.id
      return form
    })

    this.setState({
      forms: processed,
      refreshing: isRefreshing ? false : this.state.refreshing
    })
  }

  async getResponseCount ({ id }) {
    const responsesForForm = this.state.responses[id]
    if (!responsesForForm) {
      const responses = await Api.getFormResponses(id, { page_size: 0 })
      this.setState({
        responses: {
          ...this.state.responses,
          responses
        }
      })
    } else {
      return responsesForForm
    }
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
    console.log('Refreshing!')
    this.setState({ refreshing: true })
    return this.getTypeforms(true)
  }

  _renderListItem = ({ item }) => {
    const onPress = () => this.viewResponses(item)
    return (
      <ListItem
        component={TouchableHighlight}
        containerStyle={styles.listItem}
        titleStyle={styles.formTitle}
        subtitleStyle={styles.subtitle}
        fontFamily='Apercu Pro'
        underlayColor='#efeff4'
        title={item.title}
        subtitle={'...'}
        onPress={onPress}
      />
    )
  }

  render () {
    const { forms, refreshing } = this.state

    if (!forms.length) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#000'/>
        </View>
      )
    }

    return (
      <FlatList
        data={this.state.forms}
        renderItem={this._renderListItem}
        refreshing={refreshing}
        onRefresh={this.refreshForms}
      />
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    borderBottomColor: '#cdccd1'
  },
  formTitle: {
    lineHeight: 16 * 1.6
  },
  subtitle: {
    fontWeight: '400',
    lineHeight: 14 * 1.6
  },
  font: {
    fontFamily: 'Apercu Pro'
  }
})
