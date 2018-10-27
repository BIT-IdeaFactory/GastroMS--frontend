import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar} from 'react-native';

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {isLoading: true};
        this.getEateries()
    }

    getEateries(){
        fetch("http://localhost:9000/allEateries").then((response)=>response.json()).then((responseJson)=>{
            this.setState({
               isLoading: false,
               dataSource: responseJson
            });
        })
    }

    render() {
        return (
            <View style={{ marginTop: StatusBar.currentHeight }}>
            <SafeAreaView>
                <FlatList
                    data= {this.state.isLoading ? []:this.state.dataSource}
                    renderItem={({item}) => <View style={ styles.listItem }>
                        <Text style={ styles.listItemNameText }>{item.name}</Text>
                    </View>}
                />
            </SafeAreaView>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    listItem: {
        flexWrap: "wrap",
        padding: 8,
    },

    listItemNameText: {
        fontSize: 18,
    }
});
