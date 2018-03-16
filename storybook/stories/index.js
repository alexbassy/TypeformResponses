import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'

import form from './fixtures/form.json'
import responses from './fixtures/responses.json'
import { getResponsesForQuestion } from '../../src/utils'

import { storiesOf } from '@storybook/react-native'

import Card from '../../src/pages/ListForms/Card'

storiesOf('Card', module)
  .add('Default', () => {
    const field = form.fields[1]
    const fieldResponses = getResponsesForQuestion(field, responses)
    const totalResponsesCount = responses.items.length

    return (
      <View style={$.container}>
        <View style={[$.paddedVertical, $.paddedHorizontal]}>
          <Text style={$.labels}>In isolation:</Text>
          <Card
            item={{
              title: 'My cool form'
            }}
          />
        </View>
        <View style={$.paddedVertical}>
          <View style={$.paddedHorizontal}>
            <Text style={$.labels}>In horizontal list</Text>
          </View>
          <FlatList
            data={[{title: 'Card 1'}, {title: 'Card 2'}, {title: 'Card 3'}]}
            renderItem={({item}) => <Card item={item}/>}
          >
          </FlatList>
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
