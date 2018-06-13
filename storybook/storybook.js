/* eslint-disable global-require */
import React, {Component} from 'react'
import {Navigation} from 'react-native-navigation'
import {getStorybookUI, configure} from '@storybook/react-native'

// import stories
configure(() => {
  require('./stories')
}, module)

const StorybookUIRoot = getStorybookUI({port: 7007, onDeviceUI: false})

class StorybookUIHMRRoot extends Component {
  render () {
    return <StorybookUIRoot navigator />
  }
}

Navigation.registerComponent('TypeformResponses', () => StorybookUIHMRRoot)

export default StorybookUIHMRRoot

Navigation.startSingleScreenApp({
  screen: {
    screen: 'TypeformResponses',
    title: 'Storybook'
  }
})
