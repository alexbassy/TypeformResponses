import React from 'react'
import BaseComponent from './base'
import Api from '../api'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView,
  FlatList
} from 'react-native'
import { ListItem } from 'react-native-elements'

export default class ListForms extends BaseComponent {
  static navigatorButtons = {
    rightButtons: [{
      id: 'open-settings',
      title: 'Settings'
    }]
  }

  state = {
    forms: [],
    refreshing: false,
    responsesCounts: {}
  }

  requestedResponseCount = []

  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentDidMount () {
    this.getTypeforms()
  }

  onNavigatorEvent (event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'open-settings') {
        this.openSettings()
      }
    }
  }

  async getTypeforms (isRefreshing = false) {
    try {
      const {items} = await Api.listForms()

      const processed = items.map(form => {
        form.key = form.id
        return form
      })

      this.setState({
        forms: processed,
        refreshing: isRefreshing ? false : this.state.refreshing
      })
    } catch (e) {
      // API error ?
      console.log(e)
    }
  }

  getResponseCount ({id}) {
    const hasRequested = this.requestedResponseCount.includes(id)
    const responsesCountForForm = this.state.responsesCounts[id]

    if (hasRequested && typeof responsesCountForForm === 'undefined') {
      console.log(`Already made request for form#${id}`)
      return 'Still loading...'
    }

    if (typeof responsesCountForForm === 'undefined') {
      console.log(`Requesting response count for form#${id}`)
      this.requestedResponseCount.push(id)
      Api.getFormResponses(id, {page_size: 0}).then(responses => {
        console.log(id, responses.total_items)
        this.setState({
          responsesCounts: {
            ...this.state.responsesCounts,
            [id]: responses.total_items
          }
        })
      })
      return 'Loading...'
    }

    return `${responsesCountForForm} responses`
  }

  viewResponses (form) {
    this.goToFormResponses(form)
  }

  refreshForms = () => {
    this.setState({refreshing: true})
    return this.getTypeforms(true)
  }

  _renderListItem = ({item}) => {
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
        subtitle={/* this.getResponseCount({ id: item.id }) */ `many responses!`}
        onPress={onPress}
      />
    )
  }

  render () {
    const {forms, refreshing} = this.state

    if (!forms.length) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#000'/>
        </View>
      )
    }

    return (
      <ScrollView style={styles.page}>
        <FlatList
          data={this.state.forms}
          renderItem={this._renderListItem}
          refreshing={refreshing}
          onRefresh={this.refreshForms}
          extraData={this.state}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#efeff4',
    paddingTop: 18
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee'
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
