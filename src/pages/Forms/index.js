import React from 'react'
import BaseComponent from '../base'
import Api from '../../api'
import {FlatList, View, StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native'
import ThemedCard from './ThemedCard'

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

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  componentDidMount() {
    this.retrieveForms()
  }

  onNavigatorEvent = ev => {
    if (ev.type === 'NavBarButtonPress') {
      if (ev.id === 'open-settings') {
        this.openSettings()
      }
    }
  }

  async retrieveForms(isRefreshing = false) {
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

  getResponseCount({id}) {
    const hasRequested = this.requestedResponseCount.includes(id)
    const responsesCountForForm = this.state.responsesCounts[id]

    if (hasRequested && typeof responsesCountForForm === 'undefined') {
      return 'Still loading...'
    }

    if (typeof responsesCountForForm === 'undefined') {
      this.requestedResponseCount.push(id)
      Api.getFormResponses(id, {page_size: 0}).then(responses => {
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

  viewResponses(form) {
    this.goToFormResponses(form)
  }

  refreshForms = () => {
    this.setState({refreshing: true})
    return this.retrieveForms(true)
  }

  render() {
    const {forms, refreshing} = this.state

    if (!forms.length) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#000'/>
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.page}>
        <FlatList
          data={this.state.forms}
          renderItem={({item}) =>
            <ThemedCard
              item={item}
              onPress={() => this.goToFormResponses(item)}
              isRefreshing={refreshing}
            />
          }
          refreshing={refreshing}
          onRefresh={this.refreshForms}
          extraData={this.state}
          style={styles.list}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1
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
  },
  list: {
    flex: 1,
    padding: 8
  }
})
