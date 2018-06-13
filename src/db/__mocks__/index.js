const FormFields = [{
  id: 'ouIT4vODRPGw',
  title: 'Hola, cómo te llamas?',
  ref: '796bfe37-4e19-4746-b790-162ce4086220',
  validations: {
    required: false
  },
  type: 'short_text'
}, {
  id: '',
  title: 'test stub',
  ref: 'xxx'
}, {
  id: 'number-1',
  title: 'Two',
  ref: 'field-number-1'
}, {
  id: '',
  title: 'Phoebe',
  ref: 'field-name-1'
}, {
  id: '',
  title: 'Joey',
  ref: 'field-name-2'
}]

console.log(`USING MOCKED REALM`)

class ObjectsList extends Array {
  filtered = (_, ref) => {
    return new ObjectsList(...this.filter(field => field.ref === ref))
  }
}

class Realm {
  objects = (name) => {
    const objects = []
    switch (name) {
      case 'FormField':
        return new ObjectsList(...FormFields)
    }
    return objects
  }
}

export default function runQuery (callback) {
  return callback(new Realm())
}
