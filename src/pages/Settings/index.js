// @flow

import React from 'react'
import BaseComponent from '../base'
import {
  View, StyleSheet, ActivityIndicator, TouchableHighlight,
  FlatList, SectionList, Text, ScrollView
} from 'react-native'
import { ListItem } from 'react-native-elements'
import SettingsFactory from '../../settingsController'
import type { Setting } from '../../types/settings'

type Props = {
  navigation: any
}

type State = {
  loading: boolean,
  settings: Setting[]
}

const SectionTitle = ({ section }) => {
  return (
    <View style={styles.subheading}>
      <Text style={styles.subheadingText}>
        {section.title.toUpperCase()}
      </Text>
    </View>
  )
}

class AppSettings extends BaseComponent<Props, State> {
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
      key: 'logout',
      title: 'Logout',
      onPress: () => {
        this.logout()
      }
    }
  ]

  debugButtons = [
    {
      id: 'log-settings',
      title: 'Log Settings',
      onPress: async () => {
        const settings = await this.settings.getAllOptionsP()
        console.log(settings)
      }
    }, {
      id: 'log-state',
      title: 'Log State',
      onPress: async () => {
        console.log(this.state)
      }
    }, {
      id: 'reset-settings',
      title: 'Reset settings to default',
      onPress: async () => {
        await this.settings.resetToDefault()
      }
    }
  ]

  async componentDidMount () {
    this.settings = SettingsFactory()
    const options = await this.settings.getAllOptionsP()

    this.setState({
      loading: false,
      settings: options
    })
  }

  onNavigatorEvent (ev) {
    if (ev.type === 'NavBarButtonPress') {
      if (ev.id === 'close') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down'
        })
      }
    }
  }

  onToggle = async (id: string) => {
    await this.settings.toggle(id)
    this.setState({ settings: await this.settings.getAllOptionsP() })
  }

  renderListItem = ({ item }: { item: Setting }) => {
    return [
      <ListItem
        component={TouchableHighlight}
        containerStyle={styles.listItem}
        titleStyle={styles.formTitle}
        underlayColor='#fff'
        title={item.label}
        hideChevron
        onSwitch={() => this.onToggle(item.id)}
        switchButton
        switched={item.value}
      />,
      item.description && (
        <View key={`description_${item.id}`}>
          <Text style={styles.subtitle}>{item.description}</Text>
        </View>
      )
    ]
  }

  renderDebugButton = ({ item }) => {
    return (
      <ListItem
        component={TouchableHighlight}
        containerStyle={styles.listItem}
        titleStyle={styles.formTitle}
        underlayColor='#fff'
        hideChevron
        {...item}
      />
    )
  }

  render () {
    const keyExtractor = (item) => `setting--${item.id}`

    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <ScrollView style={styles.page}>
        <FlatList
          style={styles.listGroup}
          data={this.state.settings}
          renderItem={this.renderListItem}
          extraData={this.state}
          keyExtractor={keyExtractor}
        />
        <SectionList
          style={styles.listGroup}
          renderSectionHeader={SectionTitle}
          sections={[
            { title: 'Profile', data: this.appControls }
          ]}
          renderItem={this.renderDebugButton}
          keyExtractor={keyExtractor}
        />
        <SectionList
          style={styles.listGroup}
          renderSectionHeader={SectionTitle}
          sections={[
            { title: 'Debugging', data: this.debugButtons }
          ]}
          renderItem={this.renderDebugButton}
          keyExtractor={keyExtractor}
        />
      </ScrollView>
    )
  }
}

export default AppSettings

const styles = StyleSheet.create({
  page: {},
  listGroup: {
    marginTop: 32
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    borderBottomWidth: 0
  },
  formTitle: {
    lineHeight: 16 * 1.6,
    color: '#000'
  },
  subheading: {
    paddingHorizontal: 16,
    paddingVertical: 6
  },
  subheadingText: {
    color: '#8E8E93',
    fontSize: 13,
    lineHeight: 18
  },
  subtitle: {
    color: '#8E8E93',
    fontWeight: '400',
    lineHeight: 14 * 1.6,
    marginTop: 4,
    marginLeft: 16
  },
  font: {
    fontSize: 17,
    letterSpacing: -0.41
  }
})
