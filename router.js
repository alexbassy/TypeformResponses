import React from 'react'
import { AppRegistry, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Login from './Login'
import ListForms from './ListForms'

const Router = StackNavigator({
  Login: { screen: Login },
  ListForms: { screen: ListForms }
})

export default Router
