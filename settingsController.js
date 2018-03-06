import Realm from 'realm'
import schema from './api/db-schemas'

const defaultOptions = [
  {
    id: 'rich-text',
    label: 'Rich text in questions',
    description: 'Bold and italic text will be displayed',
    value: true,
    order: 0
  }
]

export class Settings {
  constructor (config) {
    const {options, getConnection} = config
    this.options = []
    this.defaultOptions = Object.freeze(options)
    this.getConnection = getConnection
  }

  open (...args) {
    return this.getConnection(...args)
  }

  async initialise () {
    const realm = await this.open()
    this.options = realm.objects('Setting')
    await this.writeDefaults()
  }

  getOption (id) {
    const matching = this.getAllOptions().filtered(`id = $0`, id)
    if (matching.length === 1) {
      return matching[0]
    }
    return null
  }

  // Write default values to database
  async writeDefaults () {
    const realm = await this.open()
    realm.write(() => {
      for (let option of this.defaultOptions) {
        const setting = this.getOption(option.id)
        if (!setting) {
          realm.create(SettingSchema.name, option)
        }
      }
    })
  }

  // Reset to default values saved in DB
  async resetToDefault () {
    const realm = await this.open()
    realm.write(() => {
      for (let s of this.getAllOptions()) {
        realm.delete(s)
      }
      for (let option of this.defaultOptions) {
        realm.create(SettingSchema.name, option)
      }
    })
  }

  get (id) {
    return this.getOption(id)
  }

  getValue (...args) {
    const setting = this.getOption(...args)
    return setting.value
  }

  getAllOptions () {
    return this.options
  }

  async toggle (id) {
    const option = this.getOption(id)
    if (option) {
      const realm = await this.open()
      realm.write(() => {
        option.value = !option.value
      })
    }
  }

  watch (handler: Function) {
    this.getAllOptions().addListener(handler)
  }

  unwatch (handler: Function) {
    this.getAllOptions().removeListener(handler)
  }
}

export default () => new Settings({
  options: defaultOptions,
  getConnection: (options) => {
    return Realm.open({schema, ...options})
  }
})
