import React from 'react'
import { StackNavigator } from 'react-navigation'
import Start from './pages/Start'
import Login from './pages/Login'
import ListForms from './pages/ListForms'
import ViewResponses from './pages/ViewResponses'

const Router = StackNavigator({
  Start: { screen: Start },
  Login: { screen: Login },
  ListForms: { screen: ListForms },
  ViewResponses: { screen: ViewResponses }
})

export default Router
