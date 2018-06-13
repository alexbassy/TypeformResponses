import React from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'

import Start from './pages/Start'
import Login from './pages/Login'
import ListForms from './pages/Forms'
import ViewResponses from './pages/Responses'
import Settings from './pages/Settings'

class Lightbox extends React.Component {
  render () {
    return (
      <View>
        Hola
      </View>
    )
  }
}

// register all screens of the app (including internal ones)
export function registerScreens () {
  Navigation.registerComponent('responses.Start', () => Start)
  Navigation.registerComponent('responses.Login', () => Login)
  Navigation.registerComponent('responses.ListForms', () => ListForms)
  Navigation.registerComponent('responses.ViewResponses', () => ViewResponses)
  Navigation.registerComponent('responses.Settings', () => Settings)

  Navigation.registerComponent('photoChoice.Lightbox', () => Lightbox)
}
