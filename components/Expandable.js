import React from 'react'
import { View, Animated, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

class Expandable extends React.Component {
  static defaultProps = {
    maxHeight: 300
  }

  state = {
    isExpanded: false,
    minHeight: 100,
    buttonHeight: 0,
    heightAnimation: new Animated.Value(100),
    curtainAnimation: new Animated.Value(1)
  }

  setButtonLayout = ev => {
    this.setState({ buttonHeight: ev.nativeEvent.layout.height })
  }

  setMaxHeight = ev => {
    this.setState({
      maxHeight: ev.nativeEvent.layout.height + 32,
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
      <View style={style.container}>
        <Animated.View
          style={[style.expandingContainer, {
            height: heightAnimation
          }]}
        >
          {React.cloneElement(children, { onLayout: this.setMaxHeight })}
        </Animated.View>
        <Animated.View style={[style.curtain, {
          bottom: buttonHeight,
          opacity: curtainAnimation
        }]}>
          <LinearGradient
            colors={['rgba(255, 0, 0, .4)', 'rgba(0, 255, 0, .4)', 'rgba(255, 255, 0, 1)']}
            style={[style.gradient]}
          />
        </Animated.View>
        <View style={style.buttonBackground}>
          <Button
            style={style.toggleButton}
            onPress={this.toggle}
            onLayout={this.setButtonLayout}
            title={`Show ${isExpanded ? 'less' : 'more'}`}
          />
        </View>
      </View>
    )
  }
}

export default Expandable

const style = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2
  },
  expandingContainer: {
    overflow: 'hidden',
    marginLeft: 30
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
    flex: 1,
    zIndex: 2
  },
  buttonBackground: {
    backgroundColor: '#fff',
    paddingTop: 12
  },
  toggleButton: {
    alignItems: 'center'
  },
  label: {
    fontFamily: 'Apercu Pro'
  }
})
