// @flow
import { openDatabase } from './db/index'
import type { Setting } from './types/api'

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
  open: Function
}

export class Settings {
  options: Setting[]
  defaultOptions: Setting[]
  open: Function

  constructor (config: SettingsConfiguration) {
    const {options, open} = config
    this.defaultOptions = Object.freeze(options)
    this.open = open
    this.getAllOptions()
  }

  async resetToDefaults () {
    const realm = await this.open()
    const settings: Setting[] = realm.objects('Setting')
    realm.write(() => {
      for (let s of settings) {
        realm.delete(s)
      }
      this.defaultOptions.forEach(opt =>
        realm.create('Setting', opt))
    })
  }

  get = async (id: Setting.id) => {
    const realm = await this.open()
    const settings = realm.objects('Setting')

    if (!settings.length) {
      await this.getAllOptions()
    }

    const matching = settings.filtered(`id = $0`, id)
    if (matching.length === 1) {
      return matching[0]
    }
  }

  getAllOptions = async (): Promise<Setting[]> => {
    const realm = await this.open()
    const options = realm.objects('Setting')
    if (!options.length) {
      realm.write(() => {
        this.defaultOptions.forEach(option =>
          realm.create('Setting', option))
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
      return realm.write(() => {
        option.value = !option.value
      })
    }
    return console.warn(`No value matching "${id}"`)
  }
}

export default () => new Settings({
  open: openDatabase,
  options: defaultOptions
})
