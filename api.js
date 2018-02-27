import querystring from 'querystring'
import { CLIENT_ID, CLIENT_SECRET, OAUTH_CALLBACK } from './secrets'
import { AsyncStorage } from 'react-native'

const tokenKey = 'AccessToken'

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
}

class Api {
  baseEndpoint = 'https://api.typeform.com'

  async getToken () {
    if (this.token) {
      return this.token
    } else {
      this.token = await AsyncStorage.getItem(tokenKey)
      return this.token
    }
  }

  async clearCache () {
    await AsyncStorage.removeItem(tokenKey)
  }

  async getOauthToken ({ code }) {
    return this.makeRequest('/oauth/token', {
      body: querystring.stringify({
        'code': code,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'redirect_uri': OAUTH_CALLBACK
      })
    })
  }

  async listForms () {
    return this.makeRequest(`/forms`)
  }

  async getFormDefinition (id) {
    return this.makeRequest(`/forms/${id}`, {})
  }

  async getFormResponses (id) {
    return this.makeRequest(`/forms/${id}/responses`, {})
  }

  async makeRequest (uri, options = {}, config = {
    isAuth: true,
    isJson: true,
    isQs: false
  }) {
    const { isAuth, isQs, isJson } = config
    const requestOptions = {
      ...options,
      body: isQs ? querystring.stringify(options.body) : options.body,
      headers: isAuth ? {
        ...defaultHeaders,
        'Authorization': `bearer ${await this.getToken()}`
      } : defaultHeaders
    }

    console.log(`Requesting URL: ${this.baseEndpoint + uri}\nWith options:\n`, requestOptions)

    const response = await fetch(this.baseEndpoint + uri, {
      method: 'POST',
      headers: defaultHeaders,
      ...requestOptions
    })

    if (isJson) {
      return response.json()
    }

    return response
  }
}

export default new Api()
