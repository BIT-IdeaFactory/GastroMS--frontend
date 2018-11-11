import React from 'react'
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import MapView from 'react-native-maps'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const EDGE_PADDING = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
}

export class DetailsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.map = null
    this.state = {
      date: new Date(),
      isLoading: true,
      isDevicePositionDefined: false
    }
  }

  animateToRegion = () => {
    this.map.fitToCoordinates([this.state.devicePosition, this.state.eateryPosition], {
      edgePadding: EDGE_PADDING,
      animated: true
    })
  }

  getEateryPosition (name) {
    fetch(`http://localhost:9000/Foodplace/${name}`).then((response) => response.json()).then((responseJson) => {
      this.setState({
        eateryPosition: {
          latitude: responseJson.coordX,
          longitude: responseJson.coordY
        },
        region: {
          latitude: responseJson.coordX,
          longitude: responseJson.coordY,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        isLoading: false
      })
    })
  }

  componentDidMount () {
    this.getEateryPosition(this.props.navigation.state.params.item.name)
    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          devicePosition: position,
          isDevicePositionDefined: true,
        })
      }, (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
  }

  componentDidUpdate () {
    if (this.state.isLoading === false && this.state.isDevicePositionDefined === true) {
      this.animateToRegion()
    }
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
          {!this.state.isLoading ? <MapView style={styles.map}
                   initialRegion={this.state.region}
                   showsUserLocation={true}
                   ref={(map) => this.map = map}>
            <MapView.Marker coordinate={this.state.eateryPosition}/>
          </MapView> : <View><ActivityIndicator size={'small'} color={'rgba(0, 55, 167, 0.6)'}/></View>}
        </View>
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
  },
  map: {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  }
})
