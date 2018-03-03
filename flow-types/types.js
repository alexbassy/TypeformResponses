export type FormSettings = {
  is_public: boolean,
  is_trial: boolean,
  language: string,
  progress_bar: string,
  show_progress_bar: boolean,
  show_typeform_branding: boolean,
  meta: {
    allow_indexing: boolean
  }
}

export type ThankYouScreen = {
  ref: string,
  title: string,
  properties: {
    show_button: boolean,
    share_icons: boolean
  }
}

export type FieldChoice = {
  id: string,
  ref: string,
  label: string,
  attachment?: {
    type: 'image',
    href: string
  }
}

export type FieldProperties = {
  hide_marks?: boolean,
  button_text?: string,
  randomize?: boolean,
  supersized?: boolean,
  show_labels?: boolean,
  allow_multiple_selection?: boolean,
  allow_other_choice?: boolean,
  vertical_alignment?: boolean,
  choices?: FieldChoice[]
}

export type Field = {
  id: string,
  title: string,
  ref: string,
  properties?: FieldProperties,
  validations: {
    required: boolean
  },
  type: string
}

export type Form = {
  id: string,
  title: string,
  theme: {
    href: string
  },
  fields: Field[],
  workspace: {
    href: string
  },
  settings: FormSettings,
  thankyou_screens: ThankYouScreen[],
  fields: Field[],
  _links: {
    display: boolean
  },
}
