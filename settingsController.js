// @flow
import Realm from 'realm'
import schema from './api/db-schemas'
import type { Setting } from './flow-types/types'

const defaultOptions = [
  {
    id: 'rich-text',
    label: 'Rich text in questions',
    description: 'Bold and italic text will be displayed',
    value: true,
    order: 0
  }
]

type SettingsConfiguration = {
  options: Setting[],
  getConnection: Function
}

export class Settings {
  options: Setting[]
  defaultOptions: Setting[]
  getConnection: Function

  constructor (config: SettingsConfiguration) {
    const { options, getConnection } = config
    this.defaultOptions = Object.freeze(options)
    this.getConnection = getConnection
  }

  open (...args: any) {
    return this.getConnection(Realm, ...args)
  }

  async reset () {
    const realm = await this.open()
    const settings: Setting[] = realm.objects('Setting')
    realm.write(() => {
      for (let s of settings) {
        realm.delete(s)
      }
    })
  }

  get = async (id: Setting.id) => {
    const realm = await this.open()
    const matching = realm.objects('Setting').filtered(`id = $0`, id)
    if (matching.length === 1) {
      return matching[0]
    }
  }

  getValue = async (...args: any) => {
    const { value } = await this.get(...args)
    return value
  }

  getAllOptions = async (): Promise<Setting[]> => {
    const realm = await this.open()
    const options = realm.objects('Setting')
    if (!options.length) {
      realm.write(() => {
        this.defaultOptions.forEach(option => realm.create('Setting', option))
      })
    }
    this.options = options
    return options
  }

  getAllOptionsP = async () => {
    const options = await this.getAllOptions()
    return options.map(JSON.stringify).map(JSON.parse)
  }

  async toggle (id: Setting.id) {
    const option = await this.get(id)
    if (option) {
      const realm = await this.open()
      realm.write(() => {
        option.value = !option.value
      })
    }
  }
}

export default () => new Settings({
  options: defaultOptions,
  getConnection: (realm, options) => {
    return realm.open({ schema, ...options })
  }
})
