import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native'

class Card extends React.PureComponent {
  render () {
    const theme = this.props.theme
    let backgroundImageHref = ''
    const viewStyle = {backgroundColor: 'white'}
    const textStyle = {color: '#000'}
    const imageStyle = {}

    if (theme) {
      const {background, colors} = theme
      if (background && background.href) {
        backgroundImageHref = background.href
        // imageStyle.opacity = background.brightness // @todo turn brightness into opacity
        imageStyle.resizeMode = 'cover' // @todo polyfill the resizeMode
      }
      if (colors.background) viewStyle.backgroundColor = colors.background
      if (colors.question) textStyle.color = colors.question
    }

    const {title} = this.props.item
    return (
      <View style={[$.container, $.shadow, viewStyle]}>
        {backgroundImageHref ? (
          <Image
            source={{uri: backgroundImageHref}}
            style={[$.backgroundImage, imageStyle]}
          />
        ) : null}
        <TouchableOpacity
          style={[$.fill, $.centreChildren]}
          onTouch={() => Alert.alert('onTap')}
        >
          <Text style={[$.title, textStyle]}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Card

const $ = StyleSheet.create({
  container: {
    width: 220,
    height: 180,
    backgroundColor: '#fff',
    marginRight: 16,

    borderRadius: 3
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
  title: {
    color: '#262627',
    fontFamily: 'Apercu Pro',
    fontSize: 18,
    fontWeight: '600'
  },
  shadow: {
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOffset: {height: 2, width: 0}
  },
  backgroundImage: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    resizeMode: 'cover'
  }
})
