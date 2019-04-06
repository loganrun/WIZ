import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
var backgroundImage = require("../assets/city_traffic3.jpg");

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
          <MaterialCommunityIcons name="toilet" size={70} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fabBtn}
          onPress={() => navigate("Explore")}
        >
          <MaterialCommunityIcons name="food" size={70} color="black" />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Text style={styles.btn}>Login/SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btn}>Add Your Restaurant Here</Text>
        </TouchableOpacity> */}

        <View>
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
  },
  fabBtn: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 90,
    height: 90,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 20
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 30,
    backgroundColor: "#fff",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 16,
    color: "black"
  }
});
