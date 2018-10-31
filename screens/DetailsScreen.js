import React from "react";
import {SafeAreaView, StatusBar, Text, View} from "react-native";

export class DetailsScreen extends React.Component {

    static navigationOptions = {
        title: 'Details',
    };

    render() {
        const passedData = this.props.navigation.getParam('item', {name: 'Data corrupted, sorry', x: 1, y: 1});

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