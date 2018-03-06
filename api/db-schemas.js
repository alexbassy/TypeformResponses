import formSchemas from './form'

const SettingSchema = {
  name: 'Setting',
  primaryKey: 'id',
  properties: {
    id: 'string',
    label: 'string',
    description: 'string',
    value: {
      type: 'bool',
      default: true
    },
    order: 'int'
  }
}

const Token = {
  name: 'Token',
  properties: {
    value: 'string'
  }
}

export default [
  // ...formSchemas,
  SettingSchema,
  Token
]