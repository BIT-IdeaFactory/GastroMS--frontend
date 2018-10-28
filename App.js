import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar, TouchableHighlight} from 'react-native';
import {createStackNavigator} from 'react-navigation'


class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'List of eateries',
    };
    constructor(props) {
        super(props);
        this.state = {isLoading: true};
        this.getEateries()
    }

    getEateries() {
        fetch("http://localhost:9000/allEateries").then((response) => response.json()).then((responseJson) => {
            this.setState({
                isLoading: false,
                dataSource: responseJson
            });
        })
    }

    render() {
        return (
            <View style={{marginTop: StatusBar.currentHeight}}>
                <SafeAreaView>
                    <FlatList
                        data={this.state.isLoading ? [] : this.state.dataSource}
                        renderItem={({item}) => <TouchableHighlight onPress={()=>this.props.navigation.navigate('Details', {item: item})}><View style={styles.listItem}>
                            <Text style={styles.listItemNameText}>{item.name}</Text>
                        </View></TouchableHighlight>}
                    />
                </SafeAreaView>
            </View>
        );
    }
}

class DetailsScreen extends React.Component{

    static navigationOptions = {
        title: 'Details',
    };



    render() {

        const passedData = this.props.navigation.getParam('item', {name: 'Data corrupted, sorry', x: 1, y:1});

        return (
            <View style={{marginTop: StatusBar.currentHeight}}>
                <SafeAreaView>
                    <Text>{passedData.name}</Text>
                    <Text>x = {passedData.x}</Text>
                    <Text>y = {passedData.y}</Text>
                </SafeAreaView>
            </View>
        )
    }
}


const RootStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen
}, {
    initialRouteName: 'Home',
});

export default RootStack;


const styles = StyleSheet.create({
    listItem: {
        flexWrap: "wrap",
        padding: 8,
    },

    listItemNameText: {
        fontSize: 18,
    }
});
