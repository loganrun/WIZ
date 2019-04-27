import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class CardContent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CardContent</Text>
      </View>
    );
  }
}
export default CardContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
