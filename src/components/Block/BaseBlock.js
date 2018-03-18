import React from 'react'
import camelCase from 'lodash.camelcase'
import styled from 'styled-components'
import {View, Text, StyleSheet} from 'react-native'
import QuestionText from '../Question'

const blockColors = {
  multipleChoice: '#72bec8',
  shortText: '#e4ba3f',
  pictureChoice: '#c384c5',
  yesNo: '#c75874',
  longText: '#cb722b',
  email: '#5aaa8f',
  opinionScale: '#729dc6',
  rating: '#d0a462',
  date: '#ef8a77',
  number: '#9291d0',
  dropdown: '#76aebd',
  legal: '#a78267',
  fileUpload: '#7f93a6',
  website: '#b0b47f',
  group: '#cb722b'
}

const Container = styled.View`
  background-color: #fff;
  margin-bottom: 12;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.08;
  shadow-radius: 8;
`

const QuestionWrap = styled.View`
  margin-vertical: 16;
  flex-direction: row;
`

const AnswerCount = styled.Text`
  font-size: 12;
  line-height: 18;
  margin-top: 8;
  color: #999;
`

const QuestionTypeIcon = styled.View`
  width: 5;
  height: 5;
  border-radius: 10;
  margin-horizontal: 16;
  margin-top: 8;
  background-color: ${props => props.color || '#eee'};
`

class BaseBlock extends React.PureComponent {
  render () {
    const {
      field, responses, totalResponsesCount,
      answerBackground = '#fff', children
    } = this.props
    const isStatement = field.type === 'statement'
    const showResponses = !isStatement && !!responses
    const count = responses.length

    return (
      <Container>
        <QuestionWrap>
          <QuestionTypeIcon color={blockColors[camelCase(field.type)]} />
          <View style={{flex: 1, marginRight: 16}}>
            <QuestionText style={style.question}>
              {field.title}
            </QuestionText>
            {(showResponses && totalResponsesCount)  ? (
              <AnswerCount>
                {count
                  ? `${count} out of ${totalResponsesCount} people answered this question`
                  : `No one answered this question`}
              </AnswerCount>
            ) : null}
          </View>
        </QuestionWrap>
        {(!isStatement && count)
          ? (
            <View style={[style.answerContainer,
              {backgroundColor: answerBackground}]}>
              {children}
            </View>
          ) : null}
      </Container>
    )
  }
}

export default BaseBlock

const style = StyleSheet.create({
  answerContainer: {
    flex: 1
  },
  responseRate: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    color: '#999'
  }
})
