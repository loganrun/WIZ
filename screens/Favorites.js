import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class Favorites extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Favorites</Text>
            </View>
        );
    }
}
export default Favorites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});