import React from 'react'
import { Text } from 'react-native'

import form from '../../__tests__/fixtures/form'
import responses from '../../__tests__/fixtures/responses'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import CenterView from './CenterView'

import Block from '../../components/blocks/Block'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ))
