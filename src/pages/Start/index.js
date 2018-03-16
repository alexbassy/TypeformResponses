import React from 'react'
import Api from '../../api'
import BaseComponent from '../base'

export default class Start extends BaseComponent {
  async componentDidMount () {
    const token = await Api.getToken()
    if (token) {
      return this.skipLoginScreen()
    } else {
      return this.goToLoginScreen()
    }
  }

  render () {
    return null
  }
}
