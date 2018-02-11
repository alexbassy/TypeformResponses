import { findQuestion, getResponsesForQuestion, tallyMultipleChoiceAnswers } from '../utils'

import form from './fixtures/form'
import responses from './fixtures/responses'

describe('findQuestion', () => {
  it('should find a field within a list of fields', () => {
    const { fields } = form

    const statementField = findQuestion(fields, f => f.title === 'Keeping up so far?')
    const subQuestion = findQuestion(fields, f => f.title === 'Do you like orange?')
    const fakeField = findQuestion(fields, f => f.title === 'What timezone is Tokyo?')

    expect(statementField).not.toBe(null)
    expect(subQuestion).not.toBe(null)
    expect(fakeField).toBe(null)
  })
})

describe('getResponsesForQuestion', () => {
  it('should get the responses for a question', () => {
    const { fields } = form

    const normal = findQuestion(fields, f => f.title === 'Do you believe in the afterlife?')
    const r1 = getResponsesForQuestion(normal, responses)

    const fake = findQuestion(fields, f => f.title === 'Non-existent question')
    const r2 = getResponsesForQuestion(fake, responses)

    const questionGroup = findQuestion(fields, f => f.title === 'What is your favourite shade of orange?')
    const r3 = getResponsesForQuestion(questionGroup, responses)

    const statement = findQuestion(fields, f => f.title === 'Keeping up so far?')
    const r4 = getResponsesForQuestion(statement, responses)

    expect(r1.length).toBe(3)
    expect(r2.length).toBe(0)
    expect(r3.length).toBe(3)
    expect(r4.length).toBe(0)
  })
})

describe('tallyMultipleChoiceAnswers', () => {
  it('should tally responses for multiple choice questions', () => {
    const fruitQuestion = form.fields.find(f => f.id === 'qwHwfPR5CyVm')
    const questionResponses = getResponsesForQuestion(fruitQuestion, responses)
    const result = tallyMultipleChoiceAnswers({ field: fruitQuestion, responses: questionResponses })

    expect(result).not.toBe(null)
    expect(Object.keys(result).length).toBe(2)
    expect(Math.round(result.Pineapple.percentage)).toBe(Math.round(100 / 3))
    expect(result.Watermelon.count).toBe(2)
  })

  it('should tally responses for picture choice questions', () => {
    const puppyQuestion = form.fields.find(f => f.id === 'klWL166MWjAL')
    const questionResponses = getResponsesForQuestion(puppyQuestion, responses)
    const result = tallyMultipleChoiceAnswers({ field: puppyQuestion, responses: questionResponses })

    expect(result).not.toBe(null)
    expect(Object.keys(result).length).toBe(3)
    expect(result.Pug.imageURL).toBe('https://images.typeform.com/images/cQ4Gc4Abwvrp')
    expect(Math.round(result.Husky.percentage)).toBe(Math.round(100 / 3))
    expect(result.Dalmation.count).toBe(1)
  })
})
