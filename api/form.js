const Meta = {
  name: 'Meta',
  properties: {
    allow_indexing: 'bool'
  }
}

const FormSettings = {
  name: 'FormSettings',
  properties: {
    is_public: 'bool',
    is_trial: 'bool',
    language: 'string',
    progress_bar: 'string',
    show_progress_bar: 'bool',
    show_typeform_branding: 'bool',
    meta: 'Meta'
  }
}

const ThankYouScreen = {
  name: 'ThankYouScreen',
  properties: {
    ref: 'string',
    title: 'string',
    properties: {
      show_button: 'bool',
      share_icons: 'bool'
    }
  }
}

const Attachment = {
  name: 'Attachment',
  properties: {
    type: 'string',
    href: 'string'
  }
}

const FieldChoice = {
  name: 'FieldChoice',
  properties: {
    id: 'string',
    ref: 'string',
    label: 'string',
    attachment: 'Attachment'
  }
}

const FieldProperties = {
  name: 'FieldProperties',
  properties: {
    hide_marks: 'bool',
    button_text: 'string',
    randomize: 'bool',
    supersized: 'bool',
    show_labels: 'bool',
    allow_multiple_selection: 'bool',
    allow_other_choice: 'bool',
    vertical_alignment: 'bool',
    choices: 'FieldChoice[]'
  }
}

const Validations = {
  name: 'Validations',
  properties: {
    required: 'bool'
  }
}

const Field = {
  name: 'Field',
  properties: {
    id: 'string',
    title: 'string',
    ref: 'string',
    properties: 'FieldProperties',
    validations: 'Validations',
    type: 'string'
  }
}

const Theme = {
  name: 'Theme',
  properties: {
    href: 'string'
  }
}

const _Links = {
  name: '_Links',
  properties: {
    display: 'bool'
  }
}

const Form = {
  name: 'Form',
  properties: {
    id: 'string',
    title: 'string',
    theme: 'Theme',
    workspace: {
      href: 'string'
    },
    settings: 'FormSettings',
    thankyou_screens: 'ThankYouScreen[]',
    fields: 'Field[]',
    _links: '_Links'
  }
}

const formSchemas = [Form, FormSettings, Field, FieldChoice, FieldProperties, ThankYouScreen]

export default formSchemas