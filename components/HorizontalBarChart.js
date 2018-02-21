import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { formatPercentage } from '../utils'

export const sortByCount = (obj) => {
  const keys = Object.keys(obj)
  return keys.sort((a, b) => {
    if (obj[a].count > obj[b].count) {
      return -1
    } else if (obj[a].count < obj[b].count) {
      return 1
    }
    return 0
  })
}

const HorizontalBarChart = ({ responses, onLayout }) => {
  const sortedKeys = sortByCount(responses)
  return (
    <View onLayout={onLayout}>
      <View style={style.chartContainer}>
        {sortedKeys.map(item => {
          const { percentage, count, label, imageURL } = responses[item]
          const isPhotoChoice = Boolean(imageURL)
          const pc = formatPercentage(percentage.toFixed(2))

          const Photo = (
            <Image
              source={{ uri: imageURL }}
              style={style.photo}
            />
          )

          const Percentage = isPictureChoice => (
            <Text style={[
              isPictureChoice ? style.barLabelColour : null,
              style.percentageComplete
            ]}>
              {pc}%
            </Text>
          )

          const BarLabel = (
            <Text style={[style.barLabelColour, style.barLabel]}>
              {label}
            </Text>
          )

          return (
            <View key={label} style={[style.row, style.barContainer]}>
              <View>
                {isPhotoChoice ? Photo : Percentage()}
              </View>
              <View style={[style.row, style.bar]}>
                <View style={[
                  style.barCompletion,
                  { width: `${pc}%` }
                ]} />
                {isPhotoChoice ? Percentage(true) : BarLabel}
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
    </View>
  )
}

export default HorizontalBarChart

const style = StyleSheet.create({
  chartContainer: {
    marginTop: 8,
    marginBottom: 4,
    height: 'auto'
  },
  row: {
    flexDirection: 'row'
  },
  barContainer: {
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
  barLabelColour: {
    color: '#455e76'
  },
  barLabel: {
    fontSize: 12
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
