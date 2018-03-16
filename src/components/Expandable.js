import React from 'react'
import { View, Animated, StyleSheet, Button } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

class Expandable extends React.Component {
  static defaultProps = {
    minHeight: 120
  }

  state = {
    isExpanded: false,
    buttonHeight: 0,
    heightAnimation: new Animated.Value(this.props.minHeight),
    curtainAnimation: new Animated.Value(1)
  }

  setButtonHeight = ev => {
    this.setState({ buttonHeight: ev.nativeEvent.layout.height })
  }

  setMaxHeight = ev => {
    this.setState({
      maxHeight: ev.nativeEvent.layout.height,
      isExpanded: false
    })
  }

  toggle = () => {
    const { minHeight } = this.props
    const { isExpanded, maxHeight, heightAnimation, curtainAnimation } = this.state

    this.setState({
      isExpanded: !isExpanded
    })

    curtainAnimation.setValue(isExpanded ? 0 : 1)
    heightAnimation.setValue(isExpanded ? maxHeight : minHeight)

    Animated.spring(heightAnimation, {
      toValue: isExpanded ? minHeight : maxHeight
    }).start()

    Animated.timing(curtainAnimation, {
      toValue: isExpanded ? 1 : 0,
      isInteraction: false
    }).start()
  }

  render () {
    const { children } = this.props
    const { heightAnimation, isExpanded,
      buttonHeight, curtainAnimation } = this.state

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
            colors={[
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 1)'
            ]}
            style={[style.gradient]}
          />
        </Animated.View>
        <View
          style={style.buttonBackground}
          onLayout={this.setButtonHeight}
        >
          <Button
            onPress={this.toggle}
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
    flex: 1
  },
  expandingContainer: {
    overflow: 'hidden'
  },
  curtain: {
    position: 'absolute',
    width: '100%',
    height: 30,
    flex: 1,
    bottom: 48
  },
  gradient: {
    width: '100%',
    flex: 1
  },
  buttonBackground: {
    backgroundColor: '#fff',
    paddingTop: 12
  },
  label: {
    fontFamily: 'Apercu Pro'
  }
})
