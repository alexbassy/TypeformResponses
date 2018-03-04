import { Settings } from '../settingsController'

let settings

describe('settings', () => {
  beforeAll(() => {
    settings = new Settings({
      connection: async () => {
        return {
          objects: jest.fn().mockReturnValue({
            filtered: jest.fn()
          })
        }
      },
      options: [
        {
          id: 'foo',
          label: 'foo',
          defaultValue: true
        },
        {
          id: 'bar',
          label: 'bar',
          defaultValue: false
        }
      ]
    })
  })

  it('should return return default value if unchanged', async () => {
    const cacheProvider = jest.fn().mockResolvedValue()

    const foo = await settings.getValue('foo')
    expect(cacheProvider.mock.calls.length).toBe(1)
    expect(foo).toBe(true)

    const bar = await settings.getValue('bar', cacheProvider)
    expect(cacheProvider.mock.calls.length).toBe(2)
    expect(bar).toBe(false)
  })

  it('should notify listeners of changes', async () => {

  })
})
