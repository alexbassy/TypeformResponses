import React from 'react'
import { StackNavigator } from 'react-navigation'
import Start from './pages/Start'
import Login from './pages/Login'
import ListForms from './pages/ListForms'
import ViewResponses from './pages/ViewResponses'
import Settings from './pages/Settings'

const Router = StackNavigator({
  Start: { screen: Start },
  Login: { screen: Login },
  ListForms: { screen: ListForms },
  ViewResponses: { screen: ViewResponses },
  Settings: { screen: Settings }
})

export default Router
