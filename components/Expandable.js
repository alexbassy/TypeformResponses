import React from 'react'
import { View, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

class Expandable extends React.Component {
  state = {
    isExpanded: false,
    animation: new Animated.Value(100),
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
    const { isExpanded, minHeight, maxHeight, animation } = this.state

    this.setState({
      isExpanded: !isExpanded
    })

    animation.setValue(isExpanded ? maxHeight : minHeight)

    Animated.spring(animation, {
      toValue: isExpanded ? minHeight : maxHeight
    }).start()
  }

  render () {
    const { children } = this.props
    const { animation, isExpanded, buttonHeight } = this.state

    return (
      <View>
        <Animated.View
          style={[style.expandingContainer, {
            height: animation
          }]}
        >
          {React.cloneElement(children, {
            onLayout: this.setMaxHeight
          })}
        </Animated.View>
        <LinearGradient
          colors={['rgba(255, 255, 255, .1)', 'rgba(255, 255, 255, 1)']}
          style={[style.curtain, { bottom: buttonHeight }]}
        />
        <TouchableOpacity
          style={style.toggleButton}
          onPress={this.toggle}
          onLayout={this.setButtonLayout}
        >
          <Text>Show {isExpanded ? 'less' : 'more'}</Text>
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
  toggleButton: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4
  }
})
