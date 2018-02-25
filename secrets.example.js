const base = 'https://api.typeform.com'

module.exports = {
  clientID: '',
  clientSecret: '',
  callback: 'typeformresponses://oauth-callback',
  endpoint: {
    base,
    authorize: 'https://api.typeform.com/oauth/authorize',
    token: 'https://api.typeform.com/oauth/token',
    listForms: `${base}/forms`
  },
  scopes: [
    'forms:read',
    'responses:read'
  ].join('+')
}
