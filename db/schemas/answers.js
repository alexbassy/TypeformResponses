const QuestionTypes = [
  'date',
  'dropdown',
  'email',
  'file_upload',
  'group',
  'legal',
  'long_text',
  'multiple_choice',
  'number',
  'opinion_scale',
  'payment',
  'picture_choice',
  'rating',
  'short_text',
  'statement',
  'website',
  'yes_no'
]

const Choice = {
  name: 'Choice',
  properties: {
    label: 'string'
  }
}

const Choices = {
  name: 'Choices',
  properties: {
    labels: 'string[]'
  }
}

const Field = {
  name: 'ResponseField',
  primaryKey: 'id',
  properties: {
    id: 'string', // corresponds to ID of child of Form.items[]
    type: 'string' // question type e.g. long_text, statement, yes_no
  }
}

export const Answer = {
  name: 'Answer',
  properties: {
    field: 'ResponseField',
    type: 'string?',
    text: 'string?',
    boolean: 'bool?',
    choice: 'Choice?',
    choices: 'Choices?',
    date: 'date?',
    file_url: 'string?'
  }
}

export default [
  Answer,
  Field,
  Choices,
  Choice
]
