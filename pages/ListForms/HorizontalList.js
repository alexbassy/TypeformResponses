import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

export default (props) => {
  return (
    <FlatList
      horizontal
      style={styles.horizontal}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  horizontal: {
    paddingLeft: 16,
    paddingRight: 32,
    paddingBottom: 16
  }
})