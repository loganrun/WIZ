import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Location, Permissions } from "expo";
//import { LinearGradient } from "expo";
//import { Button } from "native-base";
//import { MaterialCommunityIcons } from "@expo/vector-icons";
//var backgroundImage = require("../assets/city_traffic3.jpg");
var bathroom = require("../assets/restroom-main.png");
var food = require("../assets/restaurant-main.png");
var add = require("../assets/add-btn.png");
class Home extends Component {
  constructor() {
    super();
    this.state = {
      lon: null,
      lat: null
    };
  }

  componentWillMount() {
    //this._getLocationAsync();
  }

  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== "granted") {
  //     this.setState({
  //       errorMessage: "Permission to access location was denied"
  //     });
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   let lat = location.coords.latitude;
  //   let lon = location.coords.longitude;
  //   //console.log(lat);
  //   //console.log(lon);
  //   this.setState({ lat });
  //   this.setState({ lon });
  //   //await this.loadBusiness();
  //   console.log(this.state.lat);
  //   console.log(this.state.lon);
  // };

  static navigationOptions = {
    title: "WIZ",
    headerStyle: {
      backgroundColor: "#3a455c"
      //justifyContent: "center"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.fabBtn}>
          <TouchableOpacity
            onPress={() =>
              navigate("Bathroom", {
                currentLat: this.state.lat,
                currentLon: this.state.lon
              })
            }
          >
            <Image source={bathroom} style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10
              //marginBottom: 10
            }}
          >
            Find a Bathroom
          </Text>
        </View>
        <View style={styles.fabBtn}>
          <TouchableOpacity onPress={() => navigate("Explore")}>
            <Image source={food} style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10
              //marginBottom: 10
            }}
          >
            Find a Restaurant
          </Text>
        </View>
        <View style={{}}>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => navigate("Login")}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#fff" //00BFFF
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
                color: "#fff" //#00BFFF
              }}
            >
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btn2}>
          <TouchableOpacity onPress={() => navigate("ResSign")}>
            <Image source={add} style={{ width: 80, height: 80 }} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10
              //marginBottom: 10
            }}
          >
            Add a Location
          </Text>
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
    justifyContent: "center",
    backgroundColor: "#fff" //#3a455c
  },
  fabBtn: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 150,
    height: 90,
    backgroundColor: "#fff"
    //borderRadius: 50,
    //borderColor: "black",
    //borderWidth: 2,
    //marginBottom: 20
  },
  btn1: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 200,
    height: 50,
    backgroundColor: "orange",
    marginBottom: 20,
    marginRight: 10
  },
  btn2: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 150,
    height: 90
    //backgroundColor: "orange"
  }
});
