import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const HorizontalBarChart = ({ responses }) => {
  return (
    <View>
      {Object.keys(responses).map(item => {
        const { percentage: pc, count, label } = responses[item]
        const responsesCountText = `${count} ${count > 1 ? 'Responses' : 'Response'}`

        return (
          <View key={label} style={[style.row, style.barContainer]}>
            <View>
              <Text style={style.percentageComplete}>{pc.toFixed(2)}%</Text>
            </View>
            <View style={[style.row, style.bar]}>
              <View style={[style.barCompletion, { width: `${pc}%` }]} />
              <Text style={style.barLabel}>
                {label}
              </Text>
              <Text style={style.responseCount}>
                {responsesCountText}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

export default HorizontalBarChart

const fontFamily = 'Apercu Pro'
const style = StyleSheet.create({
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
    color: '#999',
    fontFamily
  },
  barGraphContainer: {

  },
  row: {
    flexDirection: 'row'
  },
  barContainer: {
    flex: 1,
    marginVertical: 8,
    alignItems: 'center'
  },
  percentageComplete: {
    fontSize: 12
  },
  bar: {
    flex: 1,
    backgroundColor: '#f1f8f9',
    height: 40,
    marginLeft: 16,
    alignItems: 'center',
    paddingLeft: 12,
    paddingHorizontal: 12,
    borderRadius: 4
  },
  barLabel: {
    fontSize: 12,
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
    marginLeft: 'auto',
    color: 'rgba(0, 0, 0, .5)'
  }
})
