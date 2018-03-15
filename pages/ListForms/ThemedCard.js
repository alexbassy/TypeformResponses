import React from 'react'
import Card from './Card'
import Api from '../../api'

class ThemedCard extends React.Component {
  state = {}

  componentDidMount () {
    this.getTheme()
  }

  async getTheme () {
    const {href} = this.props.item.theme
    if (!href) { return null }
    const themeID = Api.helpers.getThemeIDFromHref(href)
    const theme = await Api.getTheme(themeID)
    this.setState({
      theme: theme
    })
  }

  render () {
    if (!this.state.theme) {
      <Card
        item={this.props.item}
      />
    }

    return (
      <Card
        theme={this.state.theme}
        item={this.props.item}
      />
    )
  }
}

export default ThemedCard
