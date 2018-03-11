import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'

class Card extends React.PureComponent {
  render () {
    const {title} = this.props.item
    return (
      <View style={[$.container, $.shadow]}>
        <TouchableOpacity
          style={[$.fill, $.centreChildren]}
          onTouch={() => Alert.alert('onTap')}
        >
          <Text style={$.title}>
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

    borderRadius: 3,
  },
  fill: {
    flex: 1,
    height: '100%'
  },
  centreChildren: {
    alignItems: 'center',
    justifyContent: 'center',
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
    shadowOffset: { height: 2, width: 0 },
  }
})
