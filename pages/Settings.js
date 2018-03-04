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
      title: 'Settings'
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
      this.setState({settings})
    })

    this.setState({
      loading: false,
      settings: settings
    })
  }

  renderListItem = ({item}: { item: Setting }) => {
    return (
      <ListItem
        component={TouchableHighlight}
        containerStyle={styles.listItem}
        titleStyle={styles.formTitle}
        underlayColor='#fff'
        title={item.label}
        subtitle={item.description}
        subtitleStyle={styles.subtitle}
        rightIcon={
          <Switch
            onValueChange={() => {
              Settings.toggle(item.id)
            }}
            value={item.value}
          />
        }
      />
    )
  }

  renderDebugButton = ({item}) => {
    return (
      <ListItem
        component={TouchableHighlight}
        containerStyle={styles.listItem}
        titleStyle={styles.formTitle}
        underlayColor='#fff'
        rightIcon={<View/>}
        {...item}
      />
    )
  }

  keyExtractor = item => item.id

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
          keyExtractor={this.keyExtractor}
        />
        <SectionList
          style={styles.listGroup}
          renderSectionHeader={SectionTitle}
          sections={[
            {title: 'Profile', data: this.appControls}
          ]}
          renderItem={this.renderDebugButton}
          keyExtractor={this.keyExtractor}
        />
        <SectionList
          style={styles.listGroup}
          renderSectionHeader={SectionTitle}
          sections={[
            {title: 'Debugging', data: this.debugButtons}
          ]}
          renderItem={this.renderDebugButton}
          keyExtractor={this.keyExtractor}
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
