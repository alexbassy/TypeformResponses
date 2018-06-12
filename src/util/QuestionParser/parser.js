var FALSE = {type: 'bool', value: false}

function parse (input) {
  var PRECEDENCE = {
    '=': 1,
    '||': 2,
    '&&': 3,
    '<': 7, '>': 7, '<=': 7, '>=': 7, '==': 7, '!=': 7,
    '+': 10, '-': 10,
    '*': 20, '/': 20, '%': 20
  }
  return parseTopLevel()

  function isPunc (ch) {
    var tok = input.peek()
    return tok && tok.type == 'punc' && (!ch || tok.value == ch) && tok
  }

  function isKeyword (kw) {
    var tok = input.peek()
    return tok && tok.type == 'kw' && (!kw || tok.value == kw) && tok
  }

  function isOp (op) {
    var tok = input.peek()
    return tok && tok.type == 'op' && (!op || tok.value == op) && tok
  }

  function skipPunc (ch) {
    if (isPunc(ch)) input.next()
    else input.croak('Expecting punctuation: "' + ch + '"')
  }

  function skipKeyword (kw) {
    if (isKeyword(kw)) input.next()
    else input.croak('Expecting keyword: "' + kw + '"')
  }

  function skip_op (op) {
    if (isOp(op)) input.next()
    else input.croak('Expecting operator: "' + op + '"')
  }

  function unexpected () {
    input.croak('Unexpected token: ' + JSON.stringify(input.peek()))
  }

  function maybe_binary (left, my_prec) {
    var tok = isOp()
    if (tok) {
      var his_prec = PRECEDENCE[tok.value]
      if (his_prec > my_prec) {
        input.next()
        return maybe_binary({
          type: tok.value == '=' ? 'assign' : 'binary',
          operator: tok.value,
          left: left,
          right: maybe_binary(parseAtom(), his_prec)
        }, my_prec)
      }
    }
    return left
  }

  function delimited (start, stop, separator, parser) {
    var a = [], first = true
    skipPunc(start)
    while (!input.eof()) {
      if (isPunc(stop)) break
      if (first) first = false
      else skipPunc(separator)
      if (isPunc(stop)) break
      a.push(parser())
    }
    skipPunc(stop)
    return a
  }

  function parseTopLevel () {
    const prog = []
    while (!input.eof()) {
      prog.push(parseExpression())
      if (!input.eof()) skipPunc(';')
    }
    return {type: 'prog', prog: prog}
  }

  function parseCall (func) {
    return {
      type: 'call',
      func: func,
      args: delimited('(', ')', ',', parseExpression)
    }
  }

  function parseVarName () {
    var name = input.next()
    if (name.type !== 'var') {
      input.croak('Expecting variable name')
    }
    return name.value
  }

  function parseIf () {
    skipKeyword('if')
    var cond = parseExpression()
    if (!isPunc('{')) skipKeyword('then')
    var then = parseExpression()
    var ret = {
      type: 'if',
      cond: cond,
      then: then
    }
    if (isKeyword('else')) {
      input.next()
      ret.else = parseExpression()
    }
    return ret
  }

  function parseLamda () {
    return {
      type: 'lambda',
      vars: delimited('(', ')', ',', parseVarName),
      body: parseExpression()
    }
  }

  function parseBool () {
    return {
      type: 'bool',
      value: input.next().value === 'true'
    }
  }

  function maybeCall (expr) {
    expr = expr()
    return isPunc('(') ? parseCall(expr) : expr
  }

  function parseAtom () {
    return maybeCall(function () {
      if (isPunc('(')) {
        input.next()
        var exp = parseExpression()
        skipPunc(')')
        return exp
      }
      if (isPunc('{')) return parseProg()
      if (isKeyword('if')) return parseIf()
      if (isKeyword('true') || isKeyword('false')) return parseBool()
      if (isKeyword('lambda') || isKeyword('λ')) {
        input.next()
        return parseLamda()
      }
      var tok = input.next()
      if (tok.type === 'var' || tok.type === 'num' || tok.type === 'str')
        return tok
      unexpected()
    })
  }

  function parseProg () {
    var prog = delimited('{', '}', ';', parseExpression)
    if (prog.length === 0) return FALSE
    if (prog.length === 1) return prog[0]
    return {type: 'prog', prog: prog}
  }

  function parseExpression () {
    return maybeCall(function () {
      return maybe_binary(parseAtom(), 0)
    })
  }
}

export default parse
