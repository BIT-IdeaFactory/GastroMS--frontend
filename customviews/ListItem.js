import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";

export class ListItem extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <TouchableHighlight onPress={()=>this.props.context.navigation.navigate('Details', {item: this.props.item})}>
                <View style={styles.listItem}>
                    <Text style={styles.listItemNameText}>{this.props.item.name}</Text>
                </View>
            </TouchableHighlight>
        )
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