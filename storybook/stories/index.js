import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

import form from './fixtures/form.json'
import responses from './fixtures/responses.json'
import { getResponsesForQuestion } from '../../utils'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Block from '../../components/Block'

storiesOf('Block', module)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#eee'
  }
})
