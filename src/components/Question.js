import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
const findTags = /((\*(.+?)\*)|(_(.+?)_)|({{field:.+}}))/g

const types = {
  bold: {
    test: /(\*(.+?)\*)/,
    format: token => (
      <Text style={{ fontWeight: '800' }}>{token}</Text>
    ),
    remove: token => token.replace(/\*(.+?)\*/, '$1')
  },
  italic: {
    test: /(_(.+?)_)/,
    format: token => (
      <Text style={{ fontStyle: 'italic' }}>{token}</Text>
    ),
    remove: token => token.replace(/_(.+?)_/, '$1')
  },
  field: {
    test: /({{field:.+}})/,
    format: token => (
      <Text style={{ color: 'red' }}>[[Field name]]</Text>
    ),
    remove: token => token.replace(/{{field:(.+?)}}/, '$1')
  }
}

export const stringToRichTextComponents = (title, fields) => {
  const tags = title.match(findTags)
  const indices = tags.map(t => title.indexOf(t))

  return tags.reduce((result, tag, i) => {
    const index = indices[i]

    Object.keys(types).forEach(t => {
      const { test, format, remove } = types[t]
      if (result.length === 0 && index > 0) {
        result.push(<Text>{title.substr(0, index)}</Text>)
      }
      if (test.test(tag)) {
        result.push(<Text>{format(remove(tag))}</Text>)
      }
    })

    result.push(<Text>{title.substring(index + tag.length, indices[i + 1])}</Text>)

    return result
  }, [])
}

const Question = ({ children, fields }) => {
  if (!children.match(findTags)) {
    return (
      <View>
        <Text>{children}</Text>
      </View>
    )
  }

  return (
    <View>
      {stringToRichTextComponents(children)}
    </View>
  )
}

export default Question

const styles = StyleSheet.create({
  bold: {
    fontWeight: '800'
  }
})
