import schemas from '../api/db-schemas'
import { Settings } from '../settingsController'
const getConnection = () => Realm.open({ schema: schemas, inMemory: true })

const testOptions = [
  {
    id: 'sun',
    label: 'Enable the sun',
    description: 'Flick this to have light for 12 hours a day',
    value: true,
    order: 0
  },
  {
    id: 'moon',
    label: `Enable the moon`,
    value: false,
    order: 1
  }
]

const settings = new Settings({ getConnection, options: testOptions })

describe('settingsController', () => {
  it('should instantiate settings from defaults', async () => {
    const allOptions = await settings.getAllOptionsP()
    console.log(allOptions)
    expect(allOptions[0].id).toEqual('sun')
  })

  it('should toggle a setting', async () => {
    const allOptions = await settings.getAllOptionsP()
    expect(allOptions[0].id).toEqual('sun')
  })

  it('should return as a plain object', async () => {
    const allOptions
  })
})

// describe('settings', () => {
//   beforeAll(() => {
//     settings = new Settings({
//       connection: async () => {
//         return {
//           objects: jest.fn().mockReturnValue({
//             filtered: jest.fn()
//           })
//         }
//       },
//       options: [
//         {
//           id: 'foo',
//           label: 'foo',
//           defaultValue: true
//         },
//         {
//           id: 'bar',
//           label: 'bar',
//           defaultValue: false
//         }
//       ]
//     })
//   })

//   it('should return return default value if unchanged', async () => {
//     const cacheProvider = jest.fn().mockResolvedValue()

//     const foo = await settings.getValue('foo')
//     expect(cacheProvider.mock.calls.length).toBe(1)
//     expect(foo).toBe(true)

//     const bar = await settings.getValue('bar', cacheProvider)
//     expect(cacheProvider.mock.calls.length).toBe(2)
//     expect(bar).toBe(false)
//   })

//   it('should notify listeners of changes', async () => {

//   })
// })
