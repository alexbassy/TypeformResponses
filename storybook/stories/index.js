import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import form from './fixtures/form.json'
import responses from './fixtures/responses.json'
import { getResponsesForQuestion } from '../../utils'

import { storiesOf } from '@storybook/react-native'

import Card from '../../pages/ListForms/Card'
import HorizontalList from '../../pages/ListForms/HorizontalList'

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
          <HorizontalList
            data={[{title: 'Card 1'}, {title: 'Card 2'}, {title: 'Card 3'}]}
            renderItem={({item}) => <Card item={item}/>}
          >
          </HorizontalList>
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
