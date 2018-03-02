import React from 'react'
import { View, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

class Expandable extends React.Component {
  static defaultProps = {
    maxHeight: 300
  }

  state = {
    isExpanded: false,
    heightAnimation: new Animated.Value(100),
    curtainAnimation: new Animated.Value(1),
    minHeight: 100,
    buttonHeight: 0
  }

  setButtonLayout = ev => {
    this.setState({ buttonHeight: ev.nativeEvent.layout.height })
  }

  setMaxHeight = ev => {
    this.setState({
      maxHeight: ev.nativeEvent.layout.height,
      isExpanded: false
    })
  }

  toggle = () => {
    const { isExpanded, minHeight, maxHeight, heightAnimation, curtainAnimation } = this.state

    this.setState({
      isExpanded: !isExpanded
    })

    curtainAnimation.setValue(isExpanded ? 1 : 0)
    heightAnimation.setValue(isExpanded ? maxHeight : minHeight)

    Animated.spring(heightAnimation, {
      toValue: isExpanded ? minHeight : maxHeight
    }).start()

    Animated.spring(curtainAnimation, {
      toValue: isExpanded ? 1 : 0
    }).start()
  }

  render () {
    const { children } = this.props
    const { heightAnimation, isExpanded, buttonHeight, curtainAnimation } = this.state

    return (
      <View>
        <Animated.View
          style={[style.expandingContainer, {
            height: heightAnimation
          }]}
        >
          {React.cloneElement(children, {
            onLayout: this.setMaxHeight
          })}
        </Animated.View>
        <Animated.View style={[style.curtain, {
          bottom: buttonHeight,
          opacity: curtainAnimation
        }]}>
          <LinearGradient
            colors={['rgba(255, 255, 255, .1)', 'rgba(255, 255, 255, 1)']}
            style={[style.gradient]}
          />
        </Animated.View>
        <TouchableOpacity
          style={style.toggleButton}
          onPress={this.toggle}
          onLayout={this.setButtonLayout}
        >
          <Text style={style.label}>Show {isExpanded ? 'less' : 'more'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Expandable

const style = StyleSheet.create({
  expandingContainer: {
    overflow: 'hidden'
  },
  curtain: {
    position: 'absolute',
    width: '100%',
    height: 30,
    flex: 1,
    bottom: 25
  },
  gradient: {
    width: '100%',
    flex: 1
  },
  toggleButton: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4
  },
  label: {
    fontFamily: 'Apercu Pro'
  }
})
