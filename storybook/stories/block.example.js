import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'

import form from './fixtures/form.json'
import responses from './fixtures/responses.json'
import {getResponsesForQuestion} from '../../src/utils'

import {storiesOf} from '@storybook/react-native'

import Block from '../../src/components/Block'

storiesOf('Block', module)
  .add('Multiple Choice', () => {
    const field = form.fields[0]
    const fieldResponses = getResponsesForQuestion(field, responses)
    const totalResponsesCount = responses.items.length

    return (
      <View style={styles.container}>
        <ScrollView>
          <Block
            field={field}
            responses={fieldResponses}
            totalResponsesCount={totalResponsesCount}
          />
        </ScrollView>
      </View>
    )
  })
  .add('Picture Choice', () => {
    const statement = form.fields[2]
    const field = form.fields[3]
    const fieldResponses = getResponsesForQuestion(field, responses)
    const totalResponsesCount = responses.items.length

    return (
      <View style={styles.container}>
        <ScrollView>
          <Block
            field={statement}
            responses={fieldResponses}
            totalResponsesCount={totalResponsesCount}
          />
          <Block
            field={field}
            responses={fieldResponses}
            totalResponsesCount={totalResponsesCount}
          />
        </ScrollView>
      </View>
    )
  })
  .add('Short Text', () => {
    const field = form.fields[1]
    const fieldResponses = getResponsesForQuestion(field, responses)
    const totalResponsesCount = responses.items.length

    return (
      <View style={styles.container}>
        <ScrollView>
          <Block
            field={field}
            responses={fieldResponses}
            totalResponsesCount={totalResponsesCount}
          />
        </ScrollView>
      </View>
    )
  })
  .add('Piping', () => {
    const field = {
      'id': 'K9K88c5JkYy1',
      'title': 'Si tienes cualquier problema, un humano podrá apoyarte en menos de 24 horas. Cómo te parece, *{{field:796bfe37-4e19-4746-b790-162ce4086220}}*?',
      'ref': '467af588-ab34-4db5-984c-a9bf698f467d',
      'validations': {
        'required': false
      },
      'type': 'short_text'
    }
    const fieldResponses = getResponsesForQuestion(field, responses)
    const totalResponsesCount = responses.items.length

    return (
      <View style={styles.container}>
        <ScrollView>
          <Block
            field={field}
            responses={fieldResponses}
            totalResponsesCount={totalResponsesCount}
          />
        </ScrollView>
      </View>
    )
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#eee'
  }
})
