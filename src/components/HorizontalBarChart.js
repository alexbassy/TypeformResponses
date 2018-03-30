import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import styled, {css} from 'styled-components'
import {formatPercentage} from '../utils'

const Container = styled.View`
  margin-top: 8px;
  margin-bottom: 4px;
  height: auto;
`

const Bar = styled.View`
  flex-direction: row;
  flex: 1;
  background-color: #f1f8f9;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  height: 36px;
`

const Completion = styled.View`
  position: absolute;
  background-color: #cae6ea;
  height: 36px;
  width: ${props => props.amount || 0}%;
`

const Photo = styled.Image`
  width: 36px;
  height: 36px;
`

const Percentage = styled.Text`
  ${props => props.isPhotoChoice && css`color: #455e76`};
  margin-right: 12px;
`

const Label = styled.Text`
  font-size: 16px;
  color: #455e76;
`

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

const HorizontalBarChart = ({responses, onLayout}) => {
  const sortedKeys = sortByCount(responses)
  return (
    <View onLayout={onLayout}>
      <Container>
        {sortedKeys.map(item => {
          const {percentage, count, label, imageURL} = responses[item]
          const isPhotoChoice = Boolean(imageURL)
          const pc = formatPercentage(percentage.toFixed(2))

          return (
            <View key={label} style={[style.row, style.barContainer]}>
              <View>
                {isPhotoChoice && <Photo source={{uri: imageURL}} />}
              </View>
              <Bar>
                <Completion amount={pc} />
                {isPhotoChoice
                  ? <Percentage isPhotoChoice>{pc}%</Percentage>
                  : <Label><Percentage isPhotoChoice>{pc}%</Percentage> {label}</Label>}
                <Text style={[style.responseCount, style.responseCountNumber]}>
                  {count}
                </Text>
                <Text style={style.responseCount}>
                  {`response${(count > 1 ? 's' : '')}`}
                </Text>
              </Bar>
            </View>
          )
        })}
      </Container>
    </View>
  )
}

export default HorizontalBarChart

const style = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  barContainer: {
    alignItems: 'center',
    marginBottom: 2
  },
  responseCountNumber: {
    marginLeft: 'auto',
    marginRight: 2
  },
  responseCount: {
    fontSize: 12,
    color: '#455e76'
  }
})
