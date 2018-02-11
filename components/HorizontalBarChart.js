import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

const HorizontalBarChart = ({ responses }) => {
  return (
    <View style={style.chartContainer}>
      {Object.keys(responses).map(item => {
        const { percentage, count, label, imageURL } = responses[item]
        const isPhotoChoice = Boolean(imageURL)
        const pc = percentage.toFixed(2)
        const pcFormatted = /\.00$/.test(pc) ? pc.match(/([0-9]+)/)[0] : pc // omit ".00"

        const Photo = (
          <Image
            source={{ uri: imageURL }}
            style={style.photo}
          />
        )

        const Percentage = (
          <Text style={style.percentageComplete}>
            {pcFormatted}%
          </Text>
        )

        const BarLabel = (
          <Text style={style.barLabel}>
            {label}
          </Text>
        )

        return (
          <View key={label} style={[style.row, style.barContainer]}>
            <View>
              {isPhotoChoice ? Photo : Percentage}
            </View>
            <View style={[style.row, style.bar]}>
              <View style={[style.barCompletion, { width: `${pcFormatted}%` }]} />
              {isPhotoChoice ? Percentage : BarLabel}
              <Text style={[style.responseCount, style.responseCountNumber]}>
                {count}
              </Text>
              <Text style={style.responseCount}>
                {`response${(count > 1 ? 's' : '')}`.toUpperCase()}
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
    marginHorizontal: 4,
    marginTop: 3
  },
  responseRate: {
    fontSize: 12,
    lineHeight: 18,
    color: '#999',
    fontFamily
  },
  chartContainer: {
    marginTop: 8,
    marginBottom: 4
  },
  row: {
    flexDirection: 'row',
  },
  barContainer: {
    flex: 1,
    marginVertical: 4,
    alignItems: 'center'
  },
  percentageComplete: {
    fontSize: 12,
    marginRight: 12
  },
  bar: {
    flex: 1,
    backgroundColor: '#f1f8f9',
    alignItems: 'center',
    paddingLeft: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    height: 32
  },
  photo: {
    width: 32,
    height: 32,
    borderRadius: 3,
    marginRight: 8
  },
  barLabel: {
    fontSize: 12,
    color: '#455e76'
  },
  barCompletion: {
    position: 'absolute',
    backgroundColor: '#cae6ea',
    borderRadius: 4,
    height: 32
  },
  responseCountNumber: {
    marginLeft: 'auto',
    marginRight: 2,
    color: 'rgba(0, 0, 0, .5)'
  },
  responseCount: {
    fontSize: 9,
    letterSpacing: -0.25,
    color: 'rgba(0, 0, 0, .3)'
  }
})
