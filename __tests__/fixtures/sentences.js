module.exports = {
  plain: 'She advised him to come back at once.',
  bold: {
    single: 'It was getting *dark*, and we weren’t there yet.',
    singleFormatted: 'It was getting dark, and we weren’t there yet.',
    multiple: 'A *purple pig* and a *green donkey* flew a kite in the middle of the night and ended up *sunburnt*.',
    multipleFormatted: 'A purple pig and a green donkey flew a kite in the middle of the night and ended up sunburnt.'
  },
  italic: {
    single: 'She did _her best_ to help him.',
    singleFormatted: 'She did her best to help him.',
    multiple: 'She only paints with _bold_ colors; she does _not_ like pastels.',
    multipleFormatted: 'She only paints with bold colors; she does not like pastels.'
  },
  boldItalic: {
    single: 'He ran out of money, so he had to stop *_playing poker_*.',
    singleFormatted: 'He ran out of money, so he had to stop playing poker.'
  },
  hidden: {
    single: 'Check back tomorrow, {{hidden:name}}; I will see if the book has arrived.',
    multiple: 'I really want to go to {{hidden:destination}}, but I am too {{hidden:condition}} to drive.'
  },
  fields: {
    single: '{{field:field-number-1}} seats were vacant.',
    multiple: '{{field:field-name-2}} made the sugar cookies; {{field:field-name-1}} decorated them.'
  }
}
