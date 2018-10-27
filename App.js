import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList,SafeAreaView} from 'react-native';

export default class App extends Component {

    generateMockData(){
        const list = [];

        for(let i=0;i<30;i++){
            list.push({name: `Jakaś nazwa ${i}`});
        }

        return list;
    }

    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.generateMockData()}
                    renderItem={({item}) => <View style={ styles.listItem }>
                        <Text style={ styles.listItemNameText }>{item.name}</Text>
                    </View>}
                />
            </SafeAreaView>
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
