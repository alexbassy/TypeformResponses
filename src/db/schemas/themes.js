const ThemeColors = {
  name: 'ThemeColors',
  properties: {
    question: 'string',
    answer: 'string',
    button: 'string',
    background: 'string'
  }
}

const ThemeBackground = {
  name: 'ThemeBackground',
  properties: {
    href: 'string', // Background image URL
    layout: 'string', // fullscreen, repeat, no-repeat
    brightness: 'int' // Brightness for the background. -1 is least bright (minimum) and 1 is most bright (maximum).
  }
}

const Theme = {
  name: 'Theme',
  primaryKey: 'id',
  properties: {
    id: 'string',
    font: 'string',
    name: 'string',
    background: 'ThemeBackground?',
    colors: 'ThemeColors?',
    has_transparent_button: 'bool',
    visibility: 'string'
  }
}

export default [
  Theme,
  ThemeColors,
  ThemeBackground
]
