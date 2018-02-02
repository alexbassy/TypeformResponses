import React from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'

const people = { // A
  0: {
    name: 'Leela',
    image: 'http://vignette1.wikia.nocookie.net/en.futurama/images/d/d4/Turanga_Leela.png/revision/latest?cb=20150218013044'
  },
  1: {
    name: 'Bender',
    image: 'https://vignette2.wikia.nocookie.net/en.futurama/images/4/43/Bender.png/revision/latest?cb=20150206072725'
  },
  2: {
    name: 'Amy',
    image: 'https://i.ytimg.com/vi/4sCtTq7K3yI/hqdefault.jpg'
  },
  3: {
    name: 'Fry',
    image: 'http://www.supergrove.com/wp-content/uploads/2017/03/fry-futurama-22-which-robot-from-quotfuturamaquot-are-you.jpg'
  }
}

class People extends React.Component {
  static navigationOptions = {
    title: 'People'
  }

  render () {
    const { id } = this.props.navigation.state.params // B
    if (!people[id]) {
      return <Text>Sorry, no data exists for this user</Text>
    }
    return (
      <View>
        <Text style={styles.text}>{people[id].name}</Text>
        <Image
          resizeMode='contain'
          style={styles.image}
          source={{ uri: people[id].image }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    margin: 19,
    fontSize: 22
  },
  image: {
    width: 400,
    height: 400
  }
})

export default People
