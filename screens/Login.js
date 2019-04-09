import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Login extends Component {
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
        <Text>login</Text>
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
