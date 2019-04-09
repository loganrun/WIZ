import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
var backgroundImage = require("../assets/city_traffic3.jpg");
var bathroom = require("../assets/icons8-pee-100.png");
class Home extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
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
        </View>
        <TouchableOpacity style={styles.fabBtn}>
          {/* <MaterialCommunityIcons name="toilet" size={70} color="green" /> */}
          <Image source={bathroom} style={{ width: 80, height: 80 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fabBtn}
          onPress={() => navigate("Explore")}
        >
          <MaterialCommunityIcons name="food" size={70} color="blue" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => navigate("SignUp")}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#00BFFF"
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => navigate("SignUp")}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#00BFFF"
              }}
            >
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn2}>
          <Text
            style={{ fontSize: 20, color: "red" }}
            onPress={() => navigate("ResSign")}
          >
            Add Your Restaurant
          </Text>
        </TouchableOpacity>

        {/* <View>
          <Button
            bordered
            info
            style={{
              backgroundColor: "#FFF",
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center"
              //   paddingLeft: 40,
              //   paddingRight: 40,
              //   marginBottom: 40,
              //   backgroundColor: "cyan"
            }}
          >
            <Text style={{ fontSize: 18, color: "#00BFFF" }}>Login/SignUp</Text>
          </Button>
          <Button
            bordered
            info
            style={{
              //   paddingLeft: 40,
              //   paddingRight: 75,
              backgroundColor: "#FFF",
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => navigate("Explore")}
          >
            <Text>Add Your Restaurant Here</Text>
          </Button>
        </View> */}
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
  },
  fabBtn: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 90,
    height: 90,
    backgroundColor: "#fff",
    borderRadius: 50,
    //borderColor: "black",
    //borderWidth: 2,
    marginBottom: 20
  },
  btn1: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 200,
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 20,
    marginRight: 10
  },
  btn2: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 200,
    height: 50,
    backgroundColor: "#fff"
  }
});
