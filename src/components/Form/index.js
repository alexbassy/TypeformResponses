import React from 'react'
import Card from './Card'
import Api from '../../api'
import { getThemeIDFromHref } from '../../utils'

class Form extends React.Component {
  state = {}

  componentDidMount () {
    if (!this.props.disableTheme) {
      this.getTheme()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.disableTheme && nextProps.isRefreshing) {
      this.getTheme(true)
    }
  }

  async getTheme (force = false) {
    const url = this.props.item.theme.href
    if (!url) return null

    const themeID = getThemeIDFromHref(url)
    const theme = await Api.getTheme(themeID, force)

    this.setState({ theme })
  }

  render () {
    if (!this.state.theme) {
      return (
        <Card {...this.props} />
      )
    }

    return (
      <Card
        theme={this.state.theme}
        {...this.props}
      />
    )
  }
}

export default Form
