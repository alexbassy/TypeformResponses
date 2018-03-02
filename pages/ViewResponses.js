import React from 'react'
import BaseComponent from '../base'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import Block from '../components/Block'
import { getCompletionRate, getResponsesCount, getResponsesForQuestion } from '../utils'
import Api from '../api'

const Statistics = ({ responses }) => {
  // @todo: Work out completion rate same way as in the platform
  return (
    <View style={{ flexDirection: 'row' }}>
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
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params.title,
      headerTitleStyle: {
        fontFamily: 'Apercu Pro'
      }
    }
  }

  state = {
    loading: true
  }

  componentDidMount () {
    this.getFormAndResponses()
  }

  async getFormAndResponses () {
    const { id: formId } = this.props.navigation.state.params

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
    const { form, responses, loading } = this.state

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#000' />
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <Statistics responses={responses} />
        <ScrollView
          style={{flex: 1}}
          contentInset={{top: 12}}
          contentOffset={{y: -12}}
        >
          {form.fields.map(field => (
            <Block
              key={field.id}
              field={field}
              responses={getResponsesForQuestion(field, responses)}
              totalResponsesCount={responses.length}
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
  statistic: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#efeff4',
    borderBottomColor: '#d1d1d6',
    borderBottomWidth: 1
  },
  firstStatistic: {
    borderRightWidth: 1,
    borderRightColor: '#d1d1d6'
  },
  statisticValue: {
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 4,
    fontFamily: 'Apercu Pro'
  },
  statisticTitle: {
    fontWeight: '300',
    color: '#8e8e93',
    fontSize: 12,
    fontFamily: 'Apercu Pro'
  }
})
