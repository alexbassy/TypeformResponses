import React from 'react'
import renderer from 'react-test-renderer'
import {plain, bold, italic, boldItalic, hidden, fields} from '../../../__tests__/fixtures/sentences'
import Question from '.'

const defer = cb => setTimeout(cb, 100)

describe('<Question/>', () => {
  it('should render plain text', () => {
    const question = renderer.create(<Question>{plain}</Question>)
    expect(question.toJSON().children).toEqual([plain])
  })

  it('should render bold text as plain text', (done) => {
    const questionComponent = renderer.create(<Question>{bold.single}</Question>)
    defer(() => {
      const question = questionComponent.toJSON()
      expect(question.children.join('')).toEqual(bold.singleFormatted)
      done()
    })
  })

  it('should render italic text as plain text', (done) => {
    const questionComponent = renderer.create(<Question>{italic.single}</Question>)
    defer(() => {
      const question = questionComponent.toJSON()
      expect(question.children.join('')).toEqual(italic.singleFormatted)
      done()
    })
  })

  it('should render bold, italic text as plain text', (done) => {
    const questionComponent = renderer.create(<Question>{boldItalic.single}</Question>)
    defer(() => {
      const question = questionComponent.toJSON()
      expect(question.children.join('')).toEqual(boldItalic.singleFormatted)
      done()
    })
  })

  it('should render a hidden field', (done) => {
    const questionComponent = renderer.create(<Question>{hidden.single}</Question>)
    defer(() => {
      const question = questionComponent.toJSON()
      expect(question.children.length).toEqual(3)
      expect(question.children[1]).toHaveStyleRule('color', 'red')
      expect(question.children[1].children).toEqual(['name'])
      done()
    })
  })

  it('should render multiple hidden fields', (done) => {
    const questionComponent = renderer.create(<Question>{hidden.multiple}</Question>)
    defer(() => {
      const question = questionComponent.toJSON()
      expect(question.children.length).toEqual(5)
      expect(question.children[1].children).toEqual(['destination'])
      expect(question.children[1]).toHaveStyleRule('color', 'red')
      expect(question.children[3].children).toEqual(['condition'])
      done()
    })
  })

  it('should render a piped field', (done) => {
    const questionComponent = renderer.create(<Question>{fields.single}</Question>)
    defer(() => {
      const question = questionComponent.toJSON()
      expect(question.children.length).toEqual(2)
      expect(question.children[0].children).toEqual(['Two'])
      done()
    })
  })

  it('should render multiple piped fields', (done) => {
    const questionComponent = renderer.create(<Question>{fields.multiple}</Question>)
    defer(() => {
      const question = questionComponent.toJSON()
      expect(question.children.length).toEqual(4)
      expect(question.children[0].children).toEqual(['Joey'])
      expect(question.children[2].children).toEqual(['Phoebe'])
      done()
    })
  })
})
