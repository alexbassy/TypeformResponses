import React from 'react'
import BaseComponent from '../base'
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
          onPress={params ? params.menuButtonAction : () => {}}
          style={styles.font}
          title='Settings'
        />
      )
    }
  }

  state = {
    forms: [],
    refreshing: false,
    responsesCounts: {}
  }

  requestedResponseCount = []

  componentDidMount () {
    // hack to suppress error for updating unmounted component
    setTimeout(() => this.props.navigation.setParams({ menuButtonAction: this.openSettings }), 1)
    this.getTypeforms()
  }

  async getTypeforms (isRefreshing = false) {
    try {
      const { items } = await Api.listForms()

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

  getResponseCount ({ id }) {
    const hasRequested = this.requestedResponseCount.includes(id)
    const responsesCountForForm = this.state.responsesCounts[id]

    if (hasRequested && typeof responsesCountForForm === 'undefined') {
      console.log(`Already made request for form#${id}`)
      return 'Still loading...'
    }

    if (typeof responsesCountForForm === 'undefined') {
      console.log(`Requesting response count for form#${id}`)
      this.requestedResponseCount.push(id)
      Api.getFormResponses(id, { page_size: 0 }).then(responses => {
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
    const { id, title } = form
    this.props.navigation.navigate('ViewResponses', {
      id,
      title,
      token: this.getToken()
    })
  }

  refreshForms = () => {
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
        subtitle={this.getResponseCount({ id: item.id })}
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
        extraData={this.state}
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
