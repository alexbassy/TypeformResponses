import React from 'react'
import runQuery from '../db'
import {View, Text, StyleSheet} from 'react-native'

const FIND_TAGS = /((\*(.+?)\*)|(_(.+?)_)|({{field:.+}}))/g

const types = {
  bold: {
    expression: /(\*(.+?)\*)/,
    render: (token) => (
      <Text {...props} style={[{fontWeight: '800'}]}>
        {token}
      </Text>
    ),
    stripFormatting: token => token.replace(/\*(.+?)\*/, '$1')
  },
  italic: {
    expression: /(_(.+?)_)/,
    render: (token) => (
      <Text {...props} style={[{fontStyle: 'italic'}]}>
        {token}
      </Text>
    ),
    stripFormatting: token => token.replace(/_(.+?)_/, '$1')
  },
  field: {
    expression: /({{field:.+}})/,
    render: (token, fields) => {
      console.log(fields[token])
      return (
        <Text style={[{color: 'red'}]}>
          {token}
        </Text>
      )
    },
    stripFormatting: token => token.replace(/{{field:(.+?)}}/, '$1')
  }
}

class Question extends React.Component {
  state = {
    isPlain: true,
    fields: {}
  }

  async componentDidMount () {
    const textContent = this.props.children
    this.tags = textContent.match(FIND_TAGS)
    if (!this.tags) {
      return
    }
    await this.getFormFields()
  }

  async getFormFields () {
    const withPiping = this.tags.filter(tag => types.field.expression.test(tag))
    const fieldIds = withPiping
      .map(tag => tag.match(types.field.expression)[0])
      .map(types.field.stripFormatting)

    console.log(fieldIds)

    const fields = await runQuery(realm => {
      const f = fieldIds.map(id => realm.objectForPrimaryKey('FormField', id))
      console.log(f)
      return f
    })

    const titles = fields.reduce((stateFields, field) => {
      return field.title
    }, {})

    this.setState({fields: titles, isPlain: false})
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
