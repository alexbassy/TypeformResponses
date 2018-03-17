// @flow

import React from 'react'
import BaseComponent from '../base'
import {
  View, StyleSheet, ActivityIndicator, TouchableHighlight,
  FlatList, SectionList, Text, ScrollView, Switch
} from 'react-native'
import SettingsFactory from '../../settingsController'
import type {Setting} from '../../types/settings'

type Props = {
  navigation: any
}

type State = {
  loading: boolean,
  settings: Setting[]
}

const SectionTitle = ({section}) => {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionHeadingText}>
        {section.title}
      </Text>
    </View>
  )
}

const ListItem = ({item, onToggle}) => {
  const {label, value, description} = item
  const desc = !!description
    ? <ItemDescription
      key={`description_${item.id}`}
      description={description}
    />
    : null
  return (
    <React.Fragment>
      <View style={styles.listItem}>
        <View style={styles.listItemTextContainer}>
          <Text style={styles.listItemText}>{label}</Text>
          {desc}
        </View>
        {onToggle
          ? <Switch value={value} onValueChange={onToggle} onTintColor={'#262627'}/>
          : null}
      </View>
    </React.Fragment>
  )
}

const ButtonListItem = ({id, title, onPress}) => {
  return (
    <TouchableHighlight style={styles.listItem} onPress={onPress} underlayColor='#f1f1f1'>
      <Text style={styles.listItemText}>{title}</Text>
    </TouchableHighlight>
  )
}

const ItemDescription = ({description}) => {
  return (
    <View>
      <Text style={styles.itemDescription}>{description}</Text>
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
      id: 'reset-settings',
      title: 'Reset settings to default',
      onPress: async () => {
        await this.settings.resetToDefaults()
        await this.getSettingsOptions()
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
    this.setState({settings: await this.settings.getAllOptionsP()})
  }

  renderDebugButton = ({item}) => {
    return (
      <ButtonListItem {...item}/>
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
      <ScrollView>
        <SectionList
          style={styles.listGroup}
          renderSectionHeader={SectionTitle}
          renderItem={({item}) =>
            <ListItem item={item} onToggle={() => this.onToggle(item.id)}/>}
          sections={[
            {title: 'General', data: this.state.settings}
          ]}
          extraData={this.state}
          keyExtractor={keyExtractor}
        />
        <SectionList
          style={styles.listGroup}
          renderSectionHeader={SectionTitle}
          sections={[
            {title: 'Profile', data: this.appControls}
          ]}
          renderItem={this.renderDebugButton}
          keyExtractor={keyExtractor}
        />
        <SectionList
          style={styles.listGroup}
          renderSectionHeader={SectionTitle}
          sections={[
            {title: 'Debugging', data: this.debugButtons}
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
  listGroup: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 16
  },
  listItemTextContainer: {
    flex: 1
  },
  listItemText: {
    marginLeft: 16,
    fontSize: 15,
    lineHeight: 24,
    color: '#262627'
  },
  sectionHeading: {
    marginLeft: 16,
    paddingBottom: 6
  },
  sectionHeadingText: {
    color: '#262627',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700'
  },
  itemDescription: {
    color: '#8e8e93',
    fontWeight: '400',
    lineHeight: 22,
    marginLeft: 16
  },
  font: {
    fontSize: 17,
    letterSpacing: -0.41
  }
})
