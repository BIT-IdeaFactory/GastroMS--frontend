import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export class DetailsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item.name
  })

  render () {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const item = this.props.navigation.state.params.item

    return (
      <View style={{ padding: 8 }}>
        {item.hours.map(day => (
          <Text
            style={days[this.state.date.getDay()] === day.day ? styles.selectedDay : styles.plainDay}>{day.day} {day.start}-{day.end}</Text>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selectedDay: {
    color: 'blue',
    padding: 8
  },
  plainDay: {
    color: 'black',
    padding: 8
  }
})
