import React from 'react'
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Button } from 'react-native'
import MapView from 'react-native-maps'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export class DetailsScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date()
    }
    this.region = {
      ...this.props.navigation.state.params.item.foodplace,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item.foodplace.name
  })

  _vote (open, name) {
    let requestBody = JSON.stringify({
      name: `${name}`,
      open: open,
    })

    fetch('http://localhost:9000/postVote', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })
  }

  render () {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const item = this.props.navigation.state.params.item

    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 8, flex: 1 }}>
          {item.hours.map(day => (
            <Text
              style={days[this.state.date.getDay()] === day.day ? styles.selectedDay : styles.plainDay}>{day.day} {day.start}-{day.end}</Text>
          ))}
          <View style={styles.buttonsContainer}>
            <Button title={'Opened'} onPress={() => this._vote(true, item.foodplace.name)}/>

            <Button title={'Closed'} onPress={() => this._vote(false, item.foodplace.name)}/>
          </View>
        </View>

        <View style={{ flex: 2 }}>
          {!this.state.isLoading
            ? <MapView style={styles.map}
                       initialRegion={this.region}
                       showsUserLocation={true}>
              <MapView.Marker coordinate={item.foodplace}/>
            </MapView> : <View><ActivityIndicator size={'small'} color={'rgba(0, 55, 167, 0.6)'}/></View>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,

  },
  selectedDay: {
    color: 'blue',
    padding: 8
  },
  plainDay: {
    color: 'black',
    padding: 8
  },
  map: {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  }
})
