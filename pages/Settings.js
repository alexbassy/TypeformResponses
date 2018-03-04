// @flow

import React from 'react'
import BaseComponent from '../base'
import {
  View, StyleSheet, ActivityIndicator, TouchableHighlight,
  FlatList, SectionList, Switch, Text, ScrollView
} from 'react-native'
import { ListItem } from 'react-native-elements'
import Settings from '../settingsController'
import type { Setting } from '../settingsController'

type Props = {
  navigation: any
}

type State = {
  loading: boolean,
  settings: Setting[]
}

const SectionTitle = ({section}) => {
  return (
    <View style={styles.subheading}>
      <Text style={styles.subheadingText}>
        {section.title.toUpperCase()}
      </Text>
    </View>
  )
}

class AppSettings extends BaseComponent<Props, State> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Settings',
      largeTitle: true
    }
  }

  state = {
    loading: true,
    settings: []
  }

  appControls = [
    {
      id: 'logout',
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
        const settings = await Settings.getAllOptions()
        console.log(settings)
      }
    }, {
      id: 'log-settings',
      title: 'Log State',
      onPress: async () => {
        console.log(this.state)
      }
    }, {
      id: 'reset-settings',
      title: 'Reset settings to default',
      onPress: async () => {
        await Settings.resetToDefault()
      }
    }
  ]

  async componentDidMount () {
    const settings = await Settings.getAllOptions()

    Settings.watch(async (settings, changes) => {
      console.log('Changed', settings)
      this.setState({settings: settings})
    })

    this.setState({
      loading: false,
      settings: Array.from(settings)
    })
  }

  onToggle (id: string) {
    Settings.toggle(id)
  }

  renderListItem = ({item}: { item: Setting }) => {
    return [
      <ListItem
        key={`option_${item.id}`}
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
          <Text subtitleStyle={styles.subtitle}>{item.description}</Text>
        </View>
      )
    ]
  }

  renderDebugButton = ({item}) => {
    return (
      <ListItem
        key={item.id}
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
    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <ScrollView>
        <FlatList
          style={styles.listGroup}
          data={this.state.settings}
          renderItem={this.renderListItem}
          extraData={this.state}
        />
        <SectionList
          style={styles.listGroup}
          renderSectionHeader={SectionTitle}
          sections={[
            {title: 'Profile', data: this.appControls}
          ]}
          renderItem={this.renderDebugButton}
        />
        <SectionList
          style={styles.listGroup}
          renderSectionHeader={SectionTitle}
          sections={[
            {title: 'Debugging', data: this.debugButtons}
          ]}
          renderItem={this.renderDebugButton}
        />
      </ScrollView>
    )
  }
}

export default AppSettings

const styles = StyleSheet.create({
  listGroup: {
    marginTop: 32
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    borderBottomColor: '#cdccd1',
    backgroundColor: '#fff'
  },
  formTitle: {
    lineHeight: 16 * 1.6,
    color: '#000'
  },
  subheading: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  subheadingText: {
    color: '#8E8E93',
    fontSize: 13,
    lineHeight: 18
  },
  subtitle: {
    fontWeight: '400',
    lineHeight: 14 * 1.6
  },
  font: {
    fontSize: 17,
    letterSpacing: -0.41
  }
})
