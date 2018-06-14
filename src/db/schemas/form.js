const FormMeta = {
  name: 'FormMeta',
  properties: {
    allow_indexing: 'bool'
  }
}

const FormWorkspace = {
  name: 'FormWorkspace',
  properties: {
    href: 'string'
  }
}

const FormSelfNotifications = {
  name: 'FormSelfNotifications',
  properties: {
    enable: 'bool?',
    recipients: 'string[]',
    reply_to: 'string[]',
    subject: 'string',
    message: 'string'
  }
}

const FormRespondentNotifications = {
  name: 'FormRespondentNotifications',
  properties: {
    enable: 'bool?',
    recipient: 'string',
    reply_to: 'string[]',
    subject: 'string',
    message: 'string'
  }
}

const FormNotifications = {
  name: 'FormNotifications',
  properties: {
    self: 'FormSelfNotifications?',
    respondent: 'FormRespondentNotifications?'
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
    notifications: 'FormNotifications?',
    meta: 'FormMeta'
  }
}

const ThankYouScreenProperties = {
  name: 'ThankYouScreenProperties',
  properties: {
    show_button: 'bool',
    share_icons: 'bool'
  }
}

const ThankYouScreen = {
  name: 'ThankYouScreen',
  properties: {
    ref: 'string',
    title: 'string',
    properties: 'ThankYouScreenProperties'
  }
}

const FormAttachment = {
  name: 'FormAttachment',
  properties: {
    type: 'string',
    href: 'string'
  }
}

const FieldChoice = {
  name: 'FieldChoice',
  properties: {
    id: 'string?',
    ref: 'string?',
    label: 'string',
    attachment: 'FormAttachment?'
  }
}

const FieldLabels = {
  name: 'FieldLabels',
  properties: {
    left: 'string?',
    right: 'string?',
    center: 'string?'
  }
}

const FieldProperties = {
  name: 'FieldProperties',
  properties: {
    fields: 'FormField[]', // multiple choice
    labels: 'FieldLabels?',
    hide_marks: 'bool?',
    button_text: 'string?',
    randomize: 'bool?',
    supersized: 'bool?',
    show_labels: 'bool?',
    start_at_one: 'bool?',
    alphabetical_order: 'bool?',
    allow_multiple_selection: 'bool?',
    allow_other_choice: 'bool?',
    vertical_alignment: 'bool?',
    choices: 'FieldChoice[]',
    steps: 'int?',
    shape: 'string?'
  }
}

const FormValidations = {
  name: 'FormValidations',
  properties: {
    required: 'bool',
    max_length: 'int?',
    min_value: 'int?',
    max_value: 'int?'
  }
}

const FormField = {
  name: 'FormField',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    ref: 'string',
    properties: 'FieldProperties?',
    validations: 'FormValidations',
    type: 'string'
  }
}

const FormTheme = {
  name: 'FormTheme',
  properties: {
    href: 'string'
  }
}

const _Links = {
  name: '_Links',
  properties: {
    display: 'string'
  }
}

const Form = {
  name: 'Form',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    theme: 'FormTheme?',
    workspace: 'FormWorkspace',
    settings: 'FormSettings',
    thankyou_screens: 'ThankYouScreen[]',
    fields: 'FormField[]',
    _links: '_Links'
  }
}

export default [
  FormMeta,
  FormWorkspace,
  FieldLabels,
  FormNotifications,
  FormSelfNotifications,
  FormRespondentNotifications,
  FormSettings,
  ThankYouScreen,
  ThankYouScreenProperties,
  FormAttachment,
  FieldChoice,
  FieldProperties,
  FormValidations,
  FormField,
  FormTheme,
  _Links,
  Form
]
