import InputStream from './input-stream'
import TokenStream from './token-stream'
import Parser from './parser'

import {
  TokenStream as Tokenizer,
  InputStream as Stream,
  Parser as Parse
} from './index'

describe('QuestionParser', () => {
  it('should parse a piece of text', () => {
    const code = `
      1 + 2
    `
    const inputStream = InputStream(code)
    const tokenStream = TokenStream(inputStream)
    const ast = Parser(tokenStream)
    console.log(ast)
  })
})


describe('Custom Parser', () => {
  it('should parse the text', () => {
    const code = `_*I'm*_ from *Australia*, where are you from, {{hidden:name}}?`

    console.time('Parse')
    const ast = Parse(Tokenizer(Stream(code)))
    console.timeEnd('Parse')
    console.log(ast)
  })
})
