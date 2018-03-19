const Realm = jest.genMockFromModule('realm')

const FormFields = [{
  'id': 'ouIT4vODRPGw',
  'title': 'Hola, cómo te llamas?',
  'ref': '796bfe37-4e19-4746-b790-162ce4086220',
  'validations': {
    'required': false
  },
  'type': 'short_text'
}, {
  'id': '',
  'title': 'test stub',
  'ref': 'xxx'
}]

Realm.open = () => {
  return Promise.resolve({
    objects: (name) => {
      const objects = []
      switch (name) {
        case 'FormField':
          objects.push(...FormFields)
          objects.filtered = (_, ref) => {
            return objects.filter(field => field.ref === ref)
          }
      }
      return objects
    }
  })
}

export default Realm
