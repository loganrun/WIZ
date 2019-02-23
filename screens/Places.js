import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class Places extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Places</Text>
            </View>
        );
    }
}
export default Places

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});