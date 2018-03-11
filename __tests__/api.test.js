import { openDatabase } from '../db'
import { Api } from '../api'

const secrets = {
  clientId: 'XXX',
  clientSecret: 'YYY',
  deeplinkBase: 'AAA://',
  deeplinkCallbackUrl: 'BBB'
}
const API = new Api({
  open: openDatabase,
  scopes: ['forms:read', 'forms:write', 'responses:read'],
  base: 'https://foo.bar',
  fetchMock: jest.fn(() => Promise.resolve()),
  secrets
})

describe('api', () => {
  it('should initialise', () => {
    const api = new Api({ scopes: [], base: '', fetchMock: jest.fn(() => Promise.resolve()), })
    expect(api).toBeTruthy()
  })

  it('should generate an authorisation url', () => {
    const expected = 'https://foo.bar/oauth/authorize?client_id=XXX&' +
      'redirect_uri=AAA%3A%2F%2FBBB&scope=forms%3Aread%20forms%3Awrite%20responses%3Aread'
    const url = API.helpers.generateAuthorisationURL()
    expect(url).toEqual(expected)
  })

  it('should get the code from a url', () => {
    const url = 'typeform-todo://authorize?code=XXX'
    const code = API.helpers.getTemporaryAuthorisationCode(url)
    expect(code).toEqual('XXX')
  })
})
