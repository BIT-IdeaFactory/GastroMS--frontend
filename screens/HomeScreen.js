import React from "react";
import {FlatList, SafeAreaView, StatusBar, View} from "react-native";
import {ListItem} from "../customviews/ListItem";

export class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'List of eateries',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
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
                        renderItem={({item}) => <ListItem context={this.props} item={item}/>}
                    />
                </SafeAreaView>
            </View>
        );
    }
}