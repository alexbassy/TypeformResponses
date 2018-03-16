import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

class Card extends React.PureComponent {
  getBackground () {
    // @todo move this sort of logic to ThemedCard
    if (!this.props.theme) {
      return null
    }
    const { background, colors } = this.props.theme

    if (!background) {
      const backgroundColor = colors.background
      return (
        <View style={[$.imageFill, { backgroundColor }]} />
      )
    }

    const {brightness} = background
    const alpha = brightness / 100
    const isLighter = alpha > 0
    const base = isLighter ? '255' : '0'
    const opacity = isLighter ? alpha : alpha * -1
    const brightnessFilter = {
      backgroundColor: `rgba(${base}, ${base}, ${base}, ${opacity})`
    }

    console.log(this.props.item.title, '\t', brightnessFilter.backgroundColor)

    return (
      <View style={[$.imageFill]}>
        <Image
          source={{ uri: background.href }}
          style={$.imageFill}
          resizeMode='cover'
        />
        <View style={[$.imageFill, brightnessFilter]} />
      </View>
    )
  }

  render () {
    const { theme, item, onPress } = this.props

    const textStyle = { color: '#000' }

    if (theme) {
      if (theme.colors.question) {
        textStyle.color = theme.colors.question
      }
    }

    return (
      <View style={[$.container, $.shadow]}>
        <TouchableOpacity
          style={[$.fill, $.centreChildren]}
          onPress={onPress}
          activeOpacity={0.65}
        >
          {this.getBackground()}
          <View style={$.titleContainer}>
            <Text style={[$.title, textStyle]}>
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

  },
  fill: {
    flex: 1,
    height: '100%'
  },
  centreChildren: {
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
  shadow: {
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 }
  },
  imageFill: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 6
  }
})
