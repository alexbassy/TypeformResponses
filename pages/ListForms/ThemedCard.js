import React from 'react'
import Card from './Card'
import Api from '../../api'

class ThemedCard extends React.Component {
  state = {}

  componentDidMount () {
    this.getTheme()
  }

  async getTheme () {
    const { href } = this.props.item.theme
    if (!href) return null

    const themeID = Api.helpers.getThemeIDFromHref(href)
    const theme = await Api.getTheme(themeID)
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

export default ThemedCard
