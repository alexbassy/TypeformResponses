import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import Form from '../../src/components/Form'

const defaultForm = {
  title: 'My cool form'
}

const exampleListForm = [
  {title: 'Card 1'},
  {title: 'Card 2'},
  {title: 'Card 3'}
]

const FormExample = ({item}) => (
  <Form item={item || defaultForm} disableTheme />
)

const keyExtractor = (item) => item.title

storiesOf('Form', module)
  .add('default', () => {
    return (
      <View style={$.container}>
        <View style={[$.paddedVertical, $.paddedHorizontal]}>
          <Text style={$.labels}>In isolation:</Text>
          <FormExample />
        </View>
      </View>
    )
  })
  .add('list', () => {
    return (
      <View style={$.container}>
        <View style={$.paddedVertical}>
          <View style={$.paddedHorizontal}>
            <Text style={$.labels}>In horizontal list</Text>
          </View>
          <FlatList
            data={exampleListForm}
            renderItem={FormExample}
            keyExtractor={keyExtractor}
          />
        </View>
      </View>
    )
  })

const $ = StyleSheet.create({
  paddedVertical: {
    paddingVertical: 16
  },
  paddedHorizontal: {
    paddingHorizontal: 16
  },
  labels: {
    fontSize: 15,
    color: 'rgba(0,0,0,.4)',
    marginBottom: 8
  },
  container: {
    flex: 1,
    backgroundColor: '#eee'
  }
})
