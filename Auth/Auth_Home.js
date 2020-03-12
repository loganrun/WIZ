import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native";
const loginPage = require("../assets/Loginbk.png");
const signupbtn = require("../assets/loginwhite.png");
const loginbtn = require("../assets/logintransparent.png");
class AuthHome extends Component {
  constructor() {
    super();
    this.state = {
      lon: null,
      lat: null
    };
  }

  componentWillMount() {
   
  }

  static navigationOptions = {
    title: "WHIZZ",
    headerStyle: {
      backgroundColor: "#3480CB"
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

<ImageBackground source={loginPage} style={{width: '100%', height: '100%'}}>

<Image source={signupbtn} style={{width: 215, height: 32}}></Image>

  <Image source={loginbtn} style={{width: 215, height: 32}}></Image>

<View style={{ flex: 0.25 }}>
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
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={styles.btn2}
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
        </View> 
  </ImageBackground>
        {/* <View style={{ flex: 0.25 }}>
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
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={styles.btn2}
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
        </View> */}

        {/* <Text
          style={{
            fontSize: 20,
            marginBottom: 15,
            marginTop: 30,
            textAlign: "center"
          }}
        >
          {" "}
          Add Your Business To Our Growing Community!
        </Text>
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
        </TouchableOpacity>*/}
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
    //backgroundColor: "#fff", //#3a455c
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
    marginBottom: 40,
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
