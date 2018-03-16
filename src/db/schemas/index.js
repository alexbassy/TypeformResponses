import form from './form'
import responses from './responses'
import answers from './answers'
import themes from './themes'

export const SettingSchema = {
  name: 'Setting',
  primaryKey: 'id',
  properties: {
    id: 'string',
    label: 'string',
    description: 'string?',
    value: {
      type: 'bool',
      default: true
    },
    order: 'int'
  }
}

export const TokenSchema = {
  name: 'Token',
  primaryKey: 'name',
  properties: {
    name: 'string',
    value: 'string'
  }
}

export default [
  ...form,
  ...responses,
  ...answers,
  ...themes,
  SettingSchema,
  TokenSchema
]
