import schemas from '../api/db-schemas'
import { Settings } from '../settingsController'
const getConnection = (realm) => realm.open({ schema: schemas, inMemory: true })

const testOptions = [
  {
    id: 'sun',
    label: 'Enable the sun',
    description: 'Enable light for 12 hours a day',
    value: true,
    order: 0
  },
  {
    id: 'moon',
    label: `Enable the moon`,
    value: false,
    order: 1
  },
  {
    id: 'ocean',
    label: ``,
    value: false,
    order: 2
  }
]

let settings = new Settings({ getConnection, options: testOptions })

describe('settingsController', () => {
  afterEach(async () => {
    await settings.resetToDefaults()
  })

  it('should read a setting', async () => {
    const sun = await settings.get('sun')
    expect(sun.description).toEqual('Enable light for 12 hours a day')
  })

  it('should instantiate settings from defaults', async () => {
    const all = await settings.getAllOptions()
    expect(all[0].id).toEqual('sun')
  })

  it('should toggle a setting', async () => {
    const all = await settings.getAllOptions()
    let sun = all[0]
    expect(sun.id).toEqual('sun')
    expect(sun.value).toEqual(true)
    await settings.toggle('sun')
    expect(sun.value).toEqual(false)
  })

  it('should be durable', async () => {
    const moon = await settings.get('moon')
    expect(moon.value).toEqual(false)
    for (let i = 0; i < 99; ++i) {
      await settings.toggle('moon')
    }
    expect(moon.value).toEqual(true)
  })

  it('should return as a plain object', async () => {
    const all = await settings.getAllOptionsP()
    expect(all[1]).toEqual({
      id: 'moon',
      label: `Enable the moon`,
      description: null,
      value: false,
      order: 1
    })
  })

  it('should reset the database upon request', async () => {
    const sun = await settings.get('sun')
    await settings.toggle('sun')
    expect(sun.value).toEqual(false)
    await settings.resetToDefaults()
    const newSun = await settings.get('sun')
    expect(newSun.value).toEqual(true)
  })
})
