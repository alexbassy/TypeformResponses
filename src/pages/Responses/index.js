import React from 'react'
import BaseComponent from '../base'
import {View, Text, StyleSheet, ActivityIndicator, ScrollView} from 'react-native'
import Block from '../../components/Block/index'
import {getCompletionRate, getResponsesCount, getResponsesForQuestion, toPlainObject} from '../../utils'
import Api from '../../api'

const Statistics = ({responses}) => {
  // @todo: Work out completion rate same way as in the platform
  return (
    <View style={styles.statisticContainer}>
      <View style={[styles.statistic, styles.firstStatistic]}>
        <Text style={styles.statisticValue}>
          {getResponsesCount(responses)}
        </Text>
        <Text style={styles.statisticTitle}>
          {`Responses`.toUpperCase()}
        </Text>
      </View>
      <View style={styles.statistic}>
        <Text style={styles.statisticValue}>
          {getCompletionRate(responses)}%
        </Text>
        <Text style={styles.statisticTitle}>
          {`Completion rate`.toUpperCase()}
        </Text>
      </View>
    </View>
  )
}

export default class ViewResponses extends BaseComponent {
  state = {
    loading: true
  }

  componentDidMount () {
    this.getFormAndResponses()
  }

  async getFormAndResponses () {
    const {id: formId} = this.props.form

    const [form, responses] = await Promise.all([
      Api.getFormDefinition(formId),
      Api.getFormResponses(formId)
    ])

    this.setState({
      form,
      responses,
      loading: false
    })
  }

  render () {
    const {form, responses, loading} = this.state

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#000' />
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
        >
          <Statistics responses={responses} />
          {form.fields.map(field => (
            <Block
              key={field.id}
              field={field}
              responses={getResponsesForQuestion(field, responses)}
              totalResponsesCount={responses.items.length}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statisticContainer: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 8,
    marginBottom: 8
  },
  statistic: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 4
  },
  statisticTitle: {
    fontWeight: '300',
    color: '#8e8e93',
    fontSize: 12
  },
  statisticValue: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: '800',
    marginBottom: 2
  },
  firstStatistic: {
    marginRight: 8
  }
})
