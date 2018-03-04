// @flow
import Realm from 'realm'

export type Setting = {
  id: string,
  label: string,
  value: boolean,
  description: string,
  order: number
}

type SettingsConfig = {
  options: Setting[],
  connection: Function
}

const SettingSchema = {
  name: 'Setting',
  primaryKey: 'id',
  properties: {
    id: 'string',
    label: 'string',
    description: 'string',
    value: 'bool', // default value
    order: 'int'
  }
}

const defaultOptions: Setting[] = [
  {
    id: 'rich-text',
    label: 'Rich text in questions',
    description: 'Bold and italic text will be displayed',
    value: true,
    order: 0
  }
]

export class Settings {
  constructor (config: SettingsConfig) {
    const { options, connection } = config
    this.isReady = false
    this.watchers = {}
    this.options = []
    this.defaultOptions = Object.freeze(options)
    this.connection = connection
    this.initialise()
  }

  open (...args) {
    return this.connection(...args)
  }

  async initialise () {
    const realm = await this.open()
    this.options = realm.objects('Setting')

    try {
      await this.writeDefaults()
    } catch (e) {
      if (e.message.toLowerCase().indexOf('migration') !== -1) {
        const realm = await this.open({ incrementSchemaVersion: true })
        realm.deleteModel('Setting')
      }
    }
  }

  getOption (id: string) {
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

  get (id: string) {
    return this.getOption(id)
  }

  getValue (...args) {
    const setting = this.getOption(...args)
    return setting.value
  }

  getAllOptions () {
    return this.options
  }

  async toggle (id: string) {
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

export default new Settings({
  options: defaultOptions,
  connection: ({ incrementSchemaVersion } = {}) => {
    const current = Realm.schemaVersion(Realm.defaultPath)
    return Realm.open({
      schema: [SettingSchema],
      schemaVersion: incrementSchemaVersion ? current + 1 : current
    })
  }
})
