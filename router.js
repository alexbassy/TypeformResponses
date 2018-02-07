import React from 'react'
import { StackNavigator } from 'react-navigation'
import Start from './Start'
import Login from './Login'
import ListForms from './ListForms'
import ViewResponses from './ViewResponses'

const Router = StackNavigator({
  Start: { screen: Start },
  Login: { screen: Login },
  ListForms: { screen: ListForms },
  ViewResponses: { screen: ViewResponses }
})

export default Router
