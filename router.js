import React from 'react'
import { AppRegistry, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Login from './Login'
import ListForms from './ListForms'
import ViewResponses from './ViewResponses'

const Router = StackNavigator({
  Login: { screen: Login },
  ListForms: { screen: ListForms },
  ViewResponses: { screen: ViewResponses }
})

export default Router
