import React from 'react'
import runQuery from '../../db/index'
import {Text, StyleSheet} from 'react-native'
import {FIND_TAGS, types} from './formats'

class Question extends React.Component {
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
    const fieldIds = withPiping
      .map(tag => tag.match(types.field.expression)[0])
      .map(types.field.stripFormatting)

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

  renderRichTextWithPiping () {
    const text = this.props.children
    const indices = this.tags.map(t => text.indexOf(t))
    const textComponents = this.tags.reduce((result, tag, i) => {
      const index = indices[i]
      const tokenTypes = Object.keys(types).map(t => types[t])

      tokenTypes.forEach(({expression, render, stripFormatting}) => {
        const prependBeginning = result.length === 0 && index > 0
        if (prependBeginning) {
          result.push(text.substr(0, index))
        }

        if (expression.test(tag)) {
          result.push(render(stripFormatting(tag), this.state.fields))
        }
      })

      // add the string contents between the end of
      // this token and the beginning of the next one
      result.push(text.substring(index + tag.length, indices[i + 1]))
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

const
  styles = StyleSheet.create({
    bold: {
      fontWeight: '800'
    },
    question: {
      fontSize: 15,
      lineHeight: 26
      // fontFamily: 'Apercu Pro'
    }
  })
