import React, { Component } from 'react'
import moment from 'moment'
import { View, Text, StyleSheet } from 'react-native'
import BaseBlock from './BaseBlock'
import Expandable from '../Expandable'

class Date extends Component {
  state = {
    format: 0
  }

  formats = [
    d => moment.utc(d).format('LL'),
    d => moment.utc(d).format('L'),
    d => moment(d).isBefore(new Date())
      ? moment.utc(d).fromNow()
      : moment.utc(d).toNow()
  ]

  cycleThrough () {
    const currentFormat = this.state.format
    return (this.formats.length === currentFormat + 1)
      ? 0
      : currentFormat + 1
  }

  onClick = () => {
    this.setState({ format: this.cycleThrough() })
  }

  render () {
    return (
      <Text onPress={this.onClick}>
        {this.formats[this.state.format](this.props.children[0])}
      </Text>
    )
  }
}

const TextBlock = (props) => {
  const { responses } = props
  console.log(props)

  return (
    <BaseBlock {...props}>
      <Expandable itemsCount={responses.length}>
        <View style={style.container}>
          {responses.map((response, i) => {
            const { id, submissionTime, type } = response
            const isFirst = i === 0

            let value = <Text>{response[type]}</Text>

            if (type === 'date') {
              value = <Date>{response[type]}</Date>
            }

            return (
              <View
                key={id}
                style={[
                  style.answerContainer,
                  isFirst ? style.firstAnswer : {}
                ]}
              >
                {value}
                <Text style={style.date}>
                  {moment.utc(submissionTime).fromNow()}
                </Text>
              </View>
            )
          })}
        </View>
      </Expandable>
    </BaseBlock>
  )
}

export default TextBlock

const style = StyleSheet.create({
  container: {
    marginTop: 8,
    marginHorizontal: 20
  },
  answerContainer: {
    marginVertical: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, .05)'
  },
  firstAnswer: {
    borderTopWidth: 0,
    paddingTop: 0
  },
  date: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 4,
    fontFamily: 'Apercu Pro'
  }
})
