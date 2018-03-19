import React from 'react'
import TestRenderer from 'react-test-renderer'
import Question from '../src/components/Question'

const defer = cb => setTimeout(cb, 100)

describe('<Question/>', () => {
  it('should render plain text', () => {
    const question = TestRenderer.create(<Question>Hello there</Question>)
    expect(question.toJSON().children).toEqual(['Hello there'])
  })

  it('should render bold text', (done) => {
    const questionComponent = TestRenderer.create(<Question>Hello *there*</Question>)
    defer(() => {
      const question = questionComponent.toJSON()
      expect(question.children.length).toEqual(2)
      expect(question.children[1].props.style[0].fontWeight).toEqual('800')
      done()
    })
  })

  it('should render italic text', (done) => {
    const questionComponent = TestRenderer.create(<Question>Hello _there_</Question>)
    defer(() => {
      const question = questionComponent.toJSON()
      expect(question.children.length).toEqual(2)
      expect(question.children[1].props.style[0].fontStyle).toEqual('italic')
      done()
    })
  })

  it('should render a hidden field', (done) => {
    const questionComponent = TestRenderer.create(<Question>{`Hello {{field:xxx}}`}</Question>)
    defer(() => {
      const question = questionComponent.toJSON()
      expect(question.children.length).toEqual(2)
      expect(question.children[1].children).toEqual(['test stub'])
      done()
    })
  })

  it('should render a multiple formats', (done) => {
    const questionComponent = TestRenderer.create(<Question>{`Hello *{{field:xxx}}*`}</Question>)
    defer(() => {
      const question = questionComponent.toJSON()
      console.log(question.children)
      expect(question.children.length).toEqual(2)
      expect(question.children[1].props.style[0].fontWeight).toEqual('800')
      expect(question.children[1].children[0].children).toEqual(['test stub'])
      done()
    })
  })
})
