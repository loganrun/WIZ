import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Location, Permissions } from "expo";
//import { LinearGradient } from "expo";
//import { Button } from "native-base";
//import { MaterialCommunityIcons } from "@expo/vector-icons";
//var backgroundImage = require("../assets/city_traffic3.jpg");
var bathroom = require("../assets/icons8-pee-100.png");
var food = require("../assets/dish.png");
class Home extends Component {
  constructor() {
    super();
    this.state = {
      lon: null,
      lat: null
    };
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    //console.log(lat);
    //console.log(lon);
    this.setState({ lat });
    this.setState({ lon });
    //await this.loadBusiness();
    console.log(this.state.lat);
    console.log(this.state.lon);
  };

  static navigationOptions = {
    header: null
    // title: "BRAKEZ",
    // headerStyle: {
    //   backgroundColor: "#3a455c"
    // },
    // headerTintColor: "#fff",
    // headerTitleStyle: {
    //   fontWeight: "bold"
    // }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/* <LinearGradient
          colors={["rgba(255,255,255,1)", "rgba(218,245,251,1)"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%"
          }}
        /> */}
        {/* <View
          style={{
            flex: 1,
            backgroundColor: "#fff"
            "rgba(223,225,229,1)",
            "rgba(156,175,217,1)"
          }}
        /> */}
        <TouchableOpacity
          style={styles.fabBtn}
          onPress={() =>
            navigate("Bathroom", {
              currentLat: this.state.lat,
              currentLon: this.state.lon
            })
          }
        >
          <Image source={bathroom} style={{ width: 80, height: 80 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fabBtn}
          onPress={() =>
            navigate("Explore", {
              currentLat: this.state.lat,
              currentLon: this.state.lon
            })
          }
        >
          <Image source={food} style={{ width: 80, height: 80 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => navigate("Login")}
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
    justifyContent: "center",
    backgroundColor: "#3a455c"
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
