import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Favorites extends Component {

  static navigationOptions = {
      title: "LOGIN",
      headerStyle: {
        backgroundColor: "#3a455c",
        elevation: 0
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  render() {
    return (
      <View style={styles.container}>
        <Text>FEATURE COMING SOON</Text>
      </View>
    );
  }
}
export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
