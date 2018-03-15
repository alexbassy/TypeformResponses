import Config from 'react-native-config'
import url from 'url'
import qs from 'querystring'
import { openDatabase } from '../db'

const toPlainObject = rObj => JSON.parse(JSON.stringify(rObj))

export class Api {
  constructor ({open, scopes, base, secrets, fetchMock}) {
    this.open = open
    if (fetchMock) this.fetch = fetchMock
    this.config = {base, scopes, secrets}
    this.currentRequestURI = ''
  }

  helpers = {
    getOauthCallbackURL: () => {
      const {secrets} = this.config
      return [secrets.deeplinkBase, secrets.deeplinkCallbackUrl].join('')
    },
    getTemporaryAuthorisationCode: (callbackURL) => {
      const parsed = url.parse(callbackURL)
      const {code} = qs.parse(parsed.query)
      return code
    },
    generateAuthorisationURL: () => {
      const options = qs.stringify({
        client_id: this.config.secrets.clientId,
        redirect_uri: this.helpers.getOauthCallbackURL(),
        scope: this.config.scopes.join(' ')
      })
      return `${this.config.base}/oauth/authorize?${options}`
    },
    getThemeIDFromHref: (href) => {
      const leadingTrailingSlashes = /(^\/|\/$)/g
      const { pathname } = url.parse(href)
      const barePath = pathname.replace(leadingTrailingSlashes, '')
      const split = barePath.split('/')
      return split[split.length - 1]
    }
  }

  async getToken () {
    if (this.token) {
      return this.token
    }

    const realm = await this.open()
    const token = realm.objectForPrimaryKey('Token', 'token')
    if (token) {
      this.token = token.value
    }

    return this.token
  }

  async setToken (token) {
    const realm = await this.open()
    realm.write(() => realm.create('Token', {name: 'token', value: token}, true))
  }

  async getOauthToken (temporaryAuthorizationCode) {
    try {
      const response = await this.makeRequest('oauth/token', {
        method: 'POST',
        isAuthenticated: false,
        body: qs.stringify({
          code: temporaryAuthorizationCode,
          client_id: this.config.secrets.clientId,
          client_secret: this.config.secrets.clientSecret,
          redirect_uri: this.helpers.getOauthCallbackURL()
        })
      })
      return response.access_token
    } catch (e) {
      console.warn(`Error getting token:`, e)
      return false
    }
  }

  async getThemes () {
    return this.makeRequest(`/themes`, {
      method: 'GET'
    })
  }

  async getTheme (id) {
    const realm = await this.open()
    const localTheme = realm.objectForPrimaryKey('Theme', id)

    if (!localTheme) {
      const theme = await this.makeRequest(`/themes/${id}`, { method: 'GET' })
      realm.write(() => { realm.create('Theme', theme) })
      return theme
    }

    return localTheme
  }

  async listForms (options = {}) {
    const optionsQuery = '?' + qs.stringify(options)
    return this.makeRequest(`/forms${options ? optionsQuery : ''}`)
  }

  async getFormDefinition (id) {
    return this.makeRequest(`/forms/${id}`)
  }

  async getFormResponses (id) {
    return this.makeRequest(`/forms/${id}/responses`)
  }

  async clearCache (key) {
    const realm = await this.open()
    realm.write(() => {

    })
  }

  async makeRequest (url, {
    body,
    method = 'GET',
    isAuthenticated = true,
    isJson = true
  } = {}) {
    this.currentRequestURI = url

    const defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const headers = Object.assign({},
      defaultHeaders,
      isAuthenticated
        ? {'Authorization': `bearer ${await this.getToken()}`}
        : {}
    )

    const request = this.fetch || fetch
    const response = await request(`${this.config.base}/${url}`, {method, headers, body})

    this.currentRequestURI = ''

    if (isJson) {
      return response.json()
    }

    return response
  }
}

export const API_BASE = 'https://api.typeform.com'
export const SCOPES = [
  'forms:read',
  'forms:write',
  'responses:read',
  'images:read',
  'themes:read'
]

export default new Api({
  open: openDatabase,
  base: API_BASE,
  scopes: SCOPES,
  secrets: {
    deeplinkBase: 'typeformresponses://',
    deeplinkCallbackUrl: 'oauth-callback',
    clientId: Config.API_CLIENT_ID,
    clientSecret: Config.API_CLIENT_SECRET
  }
})
