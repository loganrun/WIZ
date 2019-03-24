import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "native-base";
var backgroundImage = require("../assets/city_traffic2.jpg");

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            top: 0,
            left: 0,
            position: "absolute",
            height: "100%",
            width: "100%"
          }}
        >
          <Image
            source={backgroundImage}
            style={{ flex: 1, width: null, height: null }}
          />
          <View
            style={{
              top: 0,
              left: 0,
              position: "absolute",
              height: "100%",
              width: "100%",
              backgroundColor: "#708090",
              opacity: 0,
              zIndex: 5
            }}
          />
        </View>
        <View>
          <Button
            rounded
            style={{
              paddingLeft: 40,
              paddingRight: 75,
              marginBottom: 40,
              backgroundColor: "#1E90FF"
            }}
          >
            <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>
              Take A Break
            </Text>
          </Button>
          <Button
            rounded
            style={{
              paddingLeft: 40,
              paddingRight: 40,
              backgroundColor: "cyan"
            }}
          >
            <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>
              Find A Bathroom
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
