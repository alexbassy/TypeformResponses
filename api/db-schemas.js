// @flow

import formSchemas from './form'

export type Setting = {
  id: string,
  label: string,
  description?: string,
  value: bool,
  order: number
}

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
  properties: {
    value: 'string'
  }
}

export default [
  // ...formSchemas,
  SettingSchema,
  TokenSchema
]