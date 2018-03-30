import React from 'react'
import BasePage from '../base'
import Api from '../../api'
import {FlatList, StyleSheet, SafeAreaView} from 'react-native'
import Form from '../../components/Form'

export default class ListForms extends BasePage {
  static navigatorButtons = {
    rightButtons: [{
      id: 'open-settings',
      title: 'Settings'
    }]
  }

  state = {
    forms: [],
    isRefreshing: false,
    responsesCounts: {}
  }

  requestedResponseCount = []

  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  componentDidMount () {
    this.retrieveForms()
  }

  onNavigatorEvent = ev => {
    if (ev.type === 'NavBarButtonPress') {
      if (ev.id === 'open-settings') {
        this.openSettings()
      }
    }
  }

  async retrieveForms (isRefreshing = false) {
    try {
      const {items} = await Api.listForms()

      const processed = items.map(form => {
        form.key = form.id
        return form
      })

      this.setState({
        forms: processed,
        isRefreshing: isRefreshing ? false : this.state.isRefreshing
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

  viewResponses (form) {
    this.goToFormResponses(form)
  }

  refreshForms = () => {
    this.setState({isRefreshing: true})
    return this.retrieveForms(true)
  }

  renderForm = ({item}) => {
    return (
      <Form
        item={item}
        onPress={() => this.goToFormResponses(item)}
        isRefreshing={this.state.isRefreshing}
      />
    )
  }

  render () {
    const {forms, isRefreshing} = this.state

    if (!forms.length) {
      return this.renderLoading({ light: true })
    }

    return (
      <SafeAreaView style={styles.page}>
        <FlatList
          data={this.state.forms}
          renderItem={this.renderForm}
          onRefresh={this.refreshForms}
          refreshing={isRefreshing}
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
    marginTop: 8,
    paddingHorizontal: 8
  }
})
