import React, { Component } from 'react'
import runQuery from '../../db'
import {Text, StyleSheet} from 'react-native'
import {FIND_TAGS, types} from './formats'

class Question extends Component {
  state = {
    isPlain: true,
    fields: {}
  }

  async componentDidMount () {
    const textContent = this.props.children
    this.tags = textContent.match(FIND_TAGS)



    if (this.tags) {
      await this.getFormFields()
    }
  }

  async getFormFields () {
    const withPiping = this.tags.filter(tag => types.field.expression.test(tag))

    if (!withPiping) {
      return this.setState({isPlain: false})
    }

    const fieldIds = withPiping
      .map(tag => tag.match(types.field.expression)[0])
      .map(types.field.strip)

    let fields = {}
    await runQuery(realm => {
      const objects = realm.objects('FormField')
      fieldIds.forEach(id => {
        const refs = objects.filtered('ref = $0', id)
        if (!refs.length) return
        const formField = refs[0]
        fields[formField.ref] = formField.title
      })
    })

    this.setState({fields, isPlain: false})
  }

  getTextPart (token, {expression, render, strip}, fields) {
    const stripped = strip(token)
    if (stripped.match(FIND_TAGS)) {
      const type = Object.values(types).find(type => type.expression.test(stripped))
      console.log(token, stripped, type)
      return this.getTextPart(stripped, type, fields)
    }
    return render(stripped, fields)
  }

  renderRichTextWithPiping () {
    const text = this.props.children
    const indices = this.tags.map(tag => text.indexOf(tag))

    const textComponents = this.tags.reduce((result, tag, i) => {
      const index = indices[i]
      const tokenTypes = Object.values(types)

      tokenTypes.forEach((type) => {
        const prependBeginning = result.length === 0 && index > 0
        if (prependBeginning) {
          result.push(text.substr(0, index))
        }

        if (type.expression.test(tag)) {
          const textPart = this.getTextPart(tag, type, this.state.fields)
          if (textPart) result.push(textPart)
        }
      })

      // add the string contents between the end of
      // this token and the beginning of the next one
      const endOfStringContents = text.substring(index + tag.length, indices[i + 1])
      if (endOfStringContents.length) result.push(endOfStringContents)
      return result
    }, [])

    return (
      <Text style={styles.question}>
        {textComponents}
      </Text>
    )
  }

  render () {
    if (!this.state.isPlain) {
      return this.renderRichTextWithPiping()
    }

    return (
      <Text style={styles.question}>{this.props.children}</Text>
    )
  }
}

export default Question

const styles = StyleSheet.create({
  question: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'Apercu Pro',
    color: '#262627'
  }
})
