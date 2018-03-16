import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

function getTextColor (theme, alpha = 1) {
  if (!theme) {
    return `#000`
  }
  return theme.colors.question
}

function getBackgroundImageOverlayColor (background) {
  const b = background.brightness
  const isLight = b > 0
  const baseColor = isLight ? '255' : '0'
  const opacity = isLight ? (b / 100) : (b / -100)
  return `rgba(${baseColor}, ${baseColor}, ${baseColor}, ${opacity})`
}

class Card extends React.PureComponent {
  renderBackgroundImage () {
    const {background} = this.props.theme
    const backgroundColor = getBackgroundImageOverlayColor(background)

    return (
      <View style={[$.imageFill]}>
        <Image
          source={{uri: background.href}}
          style={$.imageFill}
          resizeMode='cover'
        />
        <View style={[$.imageFill, {backgroundColor}]} />
      </View>
    )
  }

  renderBackgroundColor () {
    const backgroundColor = this.props.theme.colors.background
    return (
      <View style={[$.imageFill, {backgroundColor}]} />
    )
  }

  renderBackground () {
    if (!this.props.theme) {
      return null
    }

    if (!this.props.theme.background) {
      return this.renderBackgroundColor()
    }

    return this.renderBackgroundImage()
  }

  render () {
    const {theme, item, onPress} = this.props
    const color = getTextColor(theme)

    return (
      <View style={[$.container]}>
        <TouchableOpacity
          style={[$.touchable]}
          onPress={onPress}
          activeOpacity={0.65}
        >
          {this.renderBackground()}
          <View style={$.titleContainer}>
            <Text style={[$.title, {color}]}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Card

const $ = StyleSheet.create({
  container: {
    width: '100%',
    height: 110,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 6,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOffset: {height: 2, width: 0}
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formTitle: {
    lineHeight: 16 * 1.6
  },
  subtitle: {
    fontWeight: '400',
    lineHeight: 14 * 1.6
  },
  titleContainer: {
    paddingHorizontal: 8
  },
  title: {
    color: '#262627',
    fontFamily: 'Apercu Pro',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center'
  },
  imageFill: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 6
  }
})
