import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableHighlight} from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { endpoint } from './secrets'

const Statistics = ({ form, responses }) => {
  const completed = responses.items.filter(response => response.answers)
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
          {responses.total_items / completed.length}%
        </Text>
        <Text style={styles.statisticTitle}>
          {`Completion rate`.toUpperCase()}
        </Text>
      </View>
    </View>
  )
}

export default class ViewResponses extends React.Component {
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
    const { id, token } = this.props.navigation.state.params
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
        <ScrollView style={{flex: 1}}>
          <Statistics responses={this.state.responses} />
          <List>
            {this.state.form.fields.map((field) => {
              return (
                <ListItem
                  key={field.id}
                  title={field.title}
                />
              )
            })}
          </List>
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
    marginBottom: 4
  },
  statisticTitle: {
    fontWeight: '300',
    color: '#8e8e93',
    fontSize: 12
  }
})
