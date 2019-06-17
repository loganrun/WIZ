import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
//import { Location, Permissions } from "expo";

//var bathroom = require("../assets/restroom-main.png");
//var food = require("../assets/restaurant-main.png");
//var add = require("../assets/add-btn.png");

class AuthHome extends Component {
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
        <View style={{ flex: 0.25 }}>
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={styles.btn1}
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
            style={styles.btn2}
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
      </View>
    );
  }
}
export default AuthHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff" //#3a455c
  },
  fabBtn: {
    flex: 0.25,
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
    width: 200,
    height: 50,
    backgroundColor: "orange",
    //marginBottom: 20,
    marginRight: 10
  },
  btn3: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 150,
    height: 90
    //backgroundColor: "orange"
  }
});
