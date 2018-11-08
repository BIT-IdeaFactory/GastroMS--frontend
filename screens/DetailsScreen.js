import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'

export class DetailsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      date: new Date(),
      eateryPosition: {
        latitude: undefined,
        longitude: undefined,
        isDefined: false
      },
      devicePosition: {
        latitude: undefined,
        longitude: undefined,
        isDefined: false
      },
      region: {
        latitude: undefined,
        longitude: undefined,
        latitudeDelta: undefined,
        longitudeDelta: undefined
      },
    }
    this.getEateryPosition(this.props.navigation.state.params.item.name)
  }

  calculateDelta (coord1, coord2) {
    return Math.abs(coord1 - coord2) * 2.5
  }

  getEateryPosition (name) {
    fetch(`http://localhost:9000/Foodplace/${name}`).then((response) => response.json()).then((responseJson) => {
      this.setState({
        region: {
          latitude: responseJson.coordX,
          longitude: responseJson.coordY,
          latitudeDelta: this.state.devicePosition.isDefined ? this.calculateDelta(responseJson.coordX, this.state.devicePosition.latitude) : 0.0922,
          longitudeDelta: this.state.devicePosition.isDefined ? this.calculateDelta(responseJson.coordY, this.state.devicePosition.longitude) : 0.0421
        }
      })
      this.setState({
        eateryPosition: {
          latitude: responseJson.coordX,
          longitude: responseJson.coordY,
          isDefined: true
        }
      })
    })
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let long = position.coords.longitude

        this.setState({
          devicePosition: {
            latitude: lat,
            longitude: long,
            isDefined: true
          }
        })
        this.setState({
          region: {
            latitude: this.state.eateryPosition.latitude,
            longitude: this.state.eateryPosition.longitude,
            latitudeDelta: this.state.eateryPosition.isDefined ? this.calculateDelta(this.state.eateryPosition.latitude, this.state.devicePosition.latitude) : 0.0922,
            longitudeDelta: this.state.eateryPosition.isDefined ? this.calculateDelta(this.state.eateryPosition.longitude, this.state.devicePosition.longitude) : 0.0421
          }
        })
      }, (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 })
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item.name
  })

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
        </View>

        <View style={{ flex: 2 }}>
          {this.state.eateryPosition.isDefined ?
            <MapView style={styles.map}
                     region={this.state.region}
                     showsUserLocation={true}>
              <MapView.Marker coordinate={this.state.eateryPosition}/>
            </MapView> :
            /* TODO change to some kind of ProgressBar */
            <Text>Waiting for data...</Text>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  marker: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#007AFF'

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
