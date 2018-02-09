import React  from 'react'
import { View, Text, StyleSheet } from 'react-native'
import camelCase from 'lodash.camelcase'
import { getResponsesForQuestion, tallyMultipleChoiceAnswers } from '../../utils'

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

const Block = ({ field, responses, allResponses, children }) => {
  console.log(responses)
  const responseRateText = `${responses.length} out of ${allResponses.items.length} people answered this question`
  return (
    <View style={style.blockContainer}>
      <View
        style={[style.questionTypeIcon, {
          backgroundColor: blockColors[camelCase(field.type)]
        }]}
      />
      <View>
        <View>
          <Text>
            {field.title}
          </Text>
          {responses && <Text style={style.responseRate}>{responseRateText}</Text>}
        </View>
        {children}
      </View>
    </View>
  )
}

export const MultipleChoiceBlock = (props) => {
  const choices = tallyMultipleChoiceAnswers(props.responses)

  return (
    <Block {...props}>
      <View style={style.barGraphContainer}>
        {Object.keys(choices).map(item => {
          const { percentage: pc, count, label } = choices[item]
          return (
            <View key={label} style={[style.row, style.barContainer]}>
              <View>
                <Text>{pc.toFixed(2)}%</Text>
              </View>
              <View style={[style.row, style.bar]}>
                <View
                  style={[style.barCompletion, { width: `${pc}%` }]}
                />
                <Text style={style.barLabel}>{label}</Text>
                <Text style={style.responseCount}>
                  {count} {count > 1 ? 'Responses' : 'Response'}
                </Text>
              </View>
            </View>
          )
        })}
      </View>
    </Block>
  )
}

export const ShortTextBlock = (props) => {
  return (
    <Block {...props}>
      {}
    </Block>
  )
}

export const DefaultBlock = (props) => {
  return (
    <Block {...props} />
  )
}

export default (field, responses) => {
  const questionResponses = getResponsesForQuestion(field, responses)

  const props = {
    key: field.id,
    field: field,
    responses: questionResponses,
    allResponses: responses
  }

  switch (field.type) {
    case 'multiple_choice':
      return <MultipleChoiceBlock {...props} />
    case 'short_text':
      return <ShortTextBlock {...props} />
    case 'statement':
      return null
    default:
      return <DefaultBlock {...props} />
  }
}

const style = StyleSheet.create({
  blockContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 3,
    marginHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8
  },
  questionTypeIcon: {
    width: 20,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 8,
    marginTop: 3,
  },
  responseRate: {
    fontSize: 12,
    lineHeight: 18,
    color: '#999'
  },
  barGraphContainer: {
    // flexDirection: 'row'
  },
  row: {
    flexDirection: 'row'
  },
  barContainer: {
    flex: 1,
    marginVertical: 8,
    alignItems: 'center'
  },
  bar: {
    width: '100%',
    backgroundColor: '#f1f8f9',
    height: 40,
    marginLeft: 16,
    alignItems: 'center',
    paddingLeft: 12,
    paddingHorizontal: 12,
    borderRadius: 4
  },
  barLabel: {
    fontSize: 14,
    color: '#455e76'
  },
  barCompletion: {
    position: 'absolute',
    backgroundColor: '#cae6ea',
    height: 40,
    borderRadius: 4
  },
  responseCount: {
    fontSize: 12,
    marginLeft: 'auto'
  }
})
