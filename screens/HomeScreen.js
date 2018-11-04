import React from 'react'
import { FlatList } from 'react-native'
import { ListItem } from '../customviews/ListItem'

export class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'List of eateries',
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
    }
    this.getEateries()
  }

  getEateries () {
    fetch('http://localhost:9000/AllFoodplacesWithOpenHours').then((response) => response.json()).then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson
      })
    })
  }

  render () {
    return (
      <FlatList
        data={this.state.isLoading ? [] : this.state.dataSource}
        renderItem={({ item }) => <ListItem context={this.props} item={item}/>}
      />
    )
  }
}
