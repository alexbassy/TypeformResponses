import React from 'react'
import { View } from 'react-native'

import form from './fixtures/form.json'
import responses from './fixtures/responses.json'
import { getResponsesForQuestion } from '../../utils'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import CenterView from './CenterView'

import Block from '../../components/Block'

storiesOf('Block', module)
  .add('normal', () => {
    const field = form.fields[0]
    const fieldResponses = getResponsesForQuestion(field, responses)
    const totalResponsesCount = 24
    console.log(form, fieldResponses)

    return (
      <View style={{ flex: 1 }}>
        <Block
          field={field}
          responses={fieldResponses}
          totalResponsesCount={totalResponsesCount}
        />
      </View>
    )
  })
