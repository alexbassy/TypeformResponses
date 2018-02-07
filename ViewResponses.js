import React from 'react'
import BaseComponent from './base'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import renderResponseBlock from './components/blocks'
import { endpoint } from './secrets'

const Statistics = ({ responses }) => {
  const completed = responses.items.filter(response => response.answers)
  const completionRate = completed.length ? responses.total_items / completed.length : 0
  // @todo: Work out completion rate same way as in the platform
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={[styles.statistic, styles.firstStatistic]}>
        <Text style={styles.statisticValue}>
          {completed.length}
        </Text>
        <Text style={styles.statisticTitle}>
          {`Responses`.toUpperCase()}
        </Text>
      </View>
      <View style={styles.statistic}>
        <Text style={styles.statisticValue}>
          {completionRate}%
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
      title: params.title
    }
  }

  state = {
    loading: true
  }

  componentDidMount () {
    const { id, title } = this.props.navigation.state.params
    this.getFormAndResponses()
  }

  async getFormAndResponses () {
    const token = await this.getToken()
    const { id } = this.props.navigation.state.params

    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }

    const formRequest = fetch(`${endpoint.base}/forms/${id}`, requestOptions)
    const responsesRequest = fetch(`${endpoint.base}/forms/${id}/responses`, requestOptions)

    const data = await Promise.all([formRequest, responsesRequest])
    const [form, responses] = await Promise.all([data[0].json(), data[1].json()])

    this.setState({
      form,
      responses,
      loading: false
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#000' />
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <Statistics responses={this.state.responses} />
        <ScrollView
          style={{flex: 1}}
          contentInset={{top: 16}}
          contentOffset={{y: -16}}
        >
          {this.state.form.fields.map(renderResponseBlock)}
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
