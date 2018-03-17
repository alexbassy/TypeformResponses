import React from 'react'
import {View, StyleSheet, TouchableHighlight, SectionList, Text, Switch} from 'react-native'

export const SectionTitle = ({section}) => {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionHeadingText}>
        {section.title}
      </Text>
    </View>
  )
}

export const ItemDescription = ({description}) => {
  return (
    <View>
      <Text style={styles.itemDescription}>{description}</Text>
    </View>
  )
}

export const ListItem = ({item, onToggle}) => {
  const {label, value, description} = item
  const desc = description
    ? <ItemDescription
      key={`description_${item.id}`}
      description={description}
    />
    : null
  return (
    <React.Fragment>
      <View style={styles.listItem}>
        <View style={styles.listItemTextContainer}>
          <Text style={styles.listItemText}>{label}</Text>
          {desc}
        </View>
        {onToggle
          ? <Switch value={value} onValueChange={onToggle} onTintColor={'#262627'} />
          : null}
      </View>
    </React.Fragment>
  )
}

export const ButtonListItem = ({id, title, onPress}) => {
  return (
    <TouchableHighlight style={styles.listItem} onPress={onPress} underlayColor='#f1f1f1'>
      <Text style={styles.listItemText}>{title}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  sectionHeadingContainer: {
    backgroundColor: `#ffffffb3`
  },
  sectionHeading: {
    marginTop: 24,
    marginLeft: 16,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  sectionHeadingText: {
    color: '#262627',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700'
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 16
  },
  listItemTextContainer: {
    flex: 1
  },
  listItemText: {
    marginLeft: 16,
    fontSize: 15,
    lineHeight: 24,
    color: '#262627'
  },
  itemDescription: {
    color: '#8e8e93',
    fontWeight: '400',
    lineHeight: 22,
    marginLeft: 16
  }
})
