export function InputStream (input) {
  let pos = 0
  let line = 1
  let col = 0

  return {
    next: next,
    peek: peek,
    eof: eof,
    croak: croak
  }

  function next () {
    const ch = input.charAt(pos++)
    if (ch === '\n') {
      line++
      col = 0
    } else {
      col++
    }
    return ch
  }

  function peek () {
    return input.charAt(pos)
  }

  function eof () {
    return peek() === ''
  }

  function croak (msg) {
    throw new Error(msg + ' (' + line + ':' + col + ')')
  }
}

export function TokenStream (input) {
  let current = null

  return {
    next,
    peek,
    eof,
    croak: input.croak
  }

  function isWhitespace (char) {
    return ' \t\n'.indexOf(char) >= 0
  }

  function isTemplateTag (char) {
    return /[{}a-z0-9:]/.test(char)
  }

  function isText (char) {
    return /[^{}*_]/.test(char)
  }

  // format types
  function readText () {
    const text = readWhile(isText)
    return {
      type: 'text',
      value: text
    }
  }

  function readBold () {
    return {
      type: 'bold',
      value: readEscaped('*')
    }
  }

  function readItalic () {
    return {
      type: 'italic',
      value: readEscaped('_')
    }
  }

  function readTemplateTag () {
    const tag = readWhile(isTemplateTag)
    return {
      type: 'piping',
      value: tag
    }
  }

  function readWhile (predicate) {
    let str = ''
    while (!input.eof() && predicate(input.peek())) {
      str += input.next()
    }
    return str
  }

  function readEscaped (end) {
    let escaped = false
    let str = ''
    input.next()
    while (!input.eof()) {
      const char = input.next()
      if (escaped) {
        str += char
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === end) {
        break
      } else {
        str += char
      }
    }
    return str
  }

  function readNext (str = input) {
    readWhile(isWhitespace)
    if (str.eof()) return null
    const char = str.peek()
    if (char === '*') return readBold()
    if (char === '_') return readItalic()
    if (char === '{') return readTemplateTag()
    if (isText()) return readText()
    str.croak('Can\'t handle character: ' + char)
  }

  function peek () {
    return current || (current = readNext())
  }

  function next () {
    const tok = current
    current = null
    return tok || readNext()
  }

  function eof () {
    return peek() == null
  }
}

export function Parser (input) {
  return parseTopLevel()

  function maybeCall (expression) {
    const exp = expression()
    return exp
  }

  function unexpected () {
    input.croak(`Unexpected token: ${JSON.stringify(input.peek())}`)
  }

  function readPiping ({ type, value }) {
    return {
      type: 'piping',
      value: value
    }
  }

  function parseAtom () {
    return maybeCall(() => {
      const token = input.next()
      const {type} = token
      if (type === 'piping') return readPiping(token)
      if (['text', 'bold', 'italic', 'piping'].includes(type)) {
        return token
      }
      console.log(token)
      unexpected()
    })
  }

  function parseTopLevel () {
    const str = []
    while (!input.eof()) {
      str.push(parseAtom())
    }
    return str
  }
}
