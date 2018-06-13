// @flow

import React from 'react'
import BaseComponent from '../base'
import {SectionList, StyleSheet} from 'react-native'
import SettingsFactory from '../../settingsController'
import {clearDatabase} from '../../db'
import {ListItem, SectionTitle, ButtonListItem} from './visual'

class AppSettings extends BaseComponent {
  static navigatorButtons = {
    rightButtons: [{
      id: 'close',
      systemItem: 'done'
    }]
  }

  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  state = {
    loading: true,
    settings: []
  }

  appControls = [
    {
      id: 'logout',
      title: 'Logout',
      onPress: this.logout
    },
    {
      id: 'contact',
      title: 'Contact support',
      onPress: () => {
      }
    }, {
      id: 'open-admin',
      title: 'Open admin.typeform.com',
      onPress: () => {
      }
    }
  ]

  debugButtons = [
    {
      id: 'reset-settings',
      title: 'Reset settings to default',
      onPress: async () => {
        await this.settings.resetToDefaults()
        await this.getSettingsOptions()
      }
    }, {
      id: 'clear-db',
      title: 'Clear database',
      onPress: async () => {
        await clearDatabase()
        this.goToLoginScreen()
      }
    }, {
      id: 'report-problem',
      title: 'Report a problem',
      onPress: () => {

      }
    }
  ]

  async componentDidMount () {
    this.settings = SettingsFactory()
    this.getSettingsOptions()
  }

  async getSettingsOptions () {
    const options = await this.settings.getAllOptionsP()

    this.setState({
      loading: false,
      settings: options
    })
  }

  onNavigatorEvent (ev) {
    if (ev.id === 'close' && ev.type === 'NavBarButtonPress') {
      this.props.navigator.dismissModal({animationType: 'slide-down'})
    }
  }

  onToggle = async (id: string) => {
    await this.settings.toggle(id)
    this.setState({settings: await this.settings.getAllOptionsP()})
  }

  render () {
    const keyExtractor = (item) => `setting--${item.id}`

    if (this.state.loading) {
      this.renderLoading()
    }

    return (
      <SectionList
        style={styles.listGroup}
        renderSectionHeader={SectionTitle}
        renderItem={({item}) =>
          <ListItem item={item} onToggle={() => this.onToggle(item.id)} />}
        sections={[
          {
            title: 'General',
            data: this.state.settings,
            renderItem: ({item}) => <ListItem item={item} onToggle={() => this.onToggle(item.id)} />
          },
          {title: 'Account', data: this.appControls, renderItem: ({item}) => <ButtonListItem {...item} />},
          {title: 'Troubleshooting', data: this.debugButtons, renderItem: ({item}) => <ButtonListItem {...item} />}
        ]}
        extraData={this.state}
        keyExtractor={keyExtractor}
      />
    )
  }
}

export default AppSettings

const styles = StyleSheet.create({
  listGroup: {
    flex: 1
  }
})
