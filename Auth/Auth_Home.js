import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image,TextInput,
  ActivityIndicator,
  KeyboardAvoidingView, Platform, Alert, Button} from "react-native";
  import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
const loginPage = require("../assets/Loginbk.png");
const signupbtn = require("../assets/sign-up.png");
const loginbtn = require("../assets/logintransparent.png");
import Logo from "../components/Logo"
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Amplitude from 'expo-analytics-amplitude'
import axios from "axios";
import * as Facebook from 'expo-facebook'
import * as GoogleSignIn from "expo-google-sign-in"

const gbutton = require("../assets/googlebtn1.png")
//import * as firebase from "firebase";
//import axios from "axios";
class AuthHome extends Component {
  constructor() {
    super();
    this.state = {
      lon: null,
      lat: null,
      user: null
    };
  }
  
  componentDidMount(){
   this.initAsync();
  }
  
  initAsync = async () => {
      await GoogleSignIn.initAsync({
        // You may ommit the clientId when the firebase `googleServicesFile` is configured
        clientId: '<YOUR_IOS_CLIENT_ID>',
      });
      this._syncUserWithStateAsync();
    };
  

  

  static navigationOptions = {
    //title: "WHIZZ",
    headerTitle: ()=><Logo/>,
    headerStyle: {
       backgroundColor: "#3480CB",
    //   //justifyContent: "center"
    // },
    //headerTintColor: "#fff",
    //margin:0,
    //padding:0,
    //headerTitleStyle: {
    //  fontWeight: "bold"
    height: 80
    },
    
  };
  render() {

    const {navigate} = this.props.navigation
    // const faceBookLogin = async () => {
    //   try {
    //     await Facebook.initializeAsync('746838002533627');
    //     const {
    //       type,
    //       token,
    //       expires,
    //       permissions,
    //       declinedPermissions,
    //     } = await Facebook.logInWithReadPermissionsAsync({
    //       permissions: ['public_profile', 'email'],
    //     });
    //     if (type === 'success') {
    //       // Get the user's name using Facebook's Graph API
    //       fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id, name, email, picture`)
    //       .then(response => response.json())
    //       .then(data => console.log(data))
    //       //console.log(response)
    //       //.then(Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`))
    //       .then(this.props.navigation.navigate("Main"))
    //     } else {
    //       // type === 'cancel'
    //     }
    //   } catch ({ message }) {
    //     alert(`Facebook Login Error: ${message}`);
    //   }
    // }

    
  
    const _syncUserWithStateAsync = async () => {
      const user = await GoogleSignIn.signInSilentlyAsync();
      AsyncStorage.setItem("userToken", user.uid);
      this.props.navigation.navigate("Main")
      //this.setState({ user });
    };
  
    const signOutAsync = async () => {
      await GoogleSignIn.signOutAsync();
      this.setState({ user: null });
    };
  
    const signInAsync = async () => {
      try {
        await GoogleSignIn.askForPlayServicesAsync();
        const { type, user } = await GoogleSignIn.signInAsync();
        if (type === 'success') {
          axios({
            method: "post",
            baseURL: "http://prototypeapp-env.pafwfr7hjt.us-west-2.elasticbeanstalk.com/api/users",
            timeout: 40000,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            data: {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              userName: user.displayName,
              avatar: user.photoURL,
              userId: user.uid
            }
          });
          _syncUserWithStateAsync();
        }
      } catch ({ message }) {
        alert('login: Error:' + message);
      }
    };


  
    //const googleSign = () => {
      //if (this.state.user) {
        //signOutAsync();
      //} else {
       // signInAsync();
     // }
    //};

    //const { navigate } = this.props.navigation;

    const onSubmit= () => {
      Amplitude.logEventAsync("BEGIN_SIGNUP")
      this.props.navigation.navigate("SignUp")
    }
    if(Platform.OS === 'ios'){
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={loginPage} style={{width: '100%', height: '100%'}}>
      
              <View style={styles.btn1}>
            <TouchableOpacity
            style={styles.fabBtn}
            onPress={() => onSubmit()}
                
            >
              
                <Text style={styles.txt3}>Sign up with Email</Text>

                
                <MaterialIcons name="email" size={24} color="#3480CB" style = {{marginLeft: 20}} />
              </TouchableOpacity> 
        
        </View>
              
        <View style={styles.btn2}>
            <TouchableOpacity
            style={styles.fabBtn}
            onPress={() => navigate("Phone")}    
            >
                <Text style={styles.txt3}>Sign up with Phone </Text>   
                <MaterialIcons name="local-phone" size={24} color="#3480CB" style = {{marginLeft: 10}}/>
              </TouchableOpacity> 
        </View>
        <View style={styles.btn2}>
            <TouchableOpacity onPress={() => navigate("Login") }>

                <Image source={loginbtn} style={{width: 300, height: 44.5}}></Image>
                
            </TouchableOpacity> 
        
        </View>
                
            </ImageBackground>
            </SafeAreaView>
    );
  }
else{
  return(
    <SafeAreaView style={styles.container}>
      <ImageBackground source={loginPage} style={{width: '100%', height: '100%'}}>
        
        <View style={styles.btn1}>
            <TouchableOpacity
            style={styles.fabBtn}
            onPress= {()=>signInAsync() }   
            >
              <Text style={styles.txt3}>Sign in with Google</Text>
              <Image source={gbutton} style={{height: 44, width: 44, marginLeft: 20}}/>
              
                
                
              </TouchableOpacity> 
  </View> 
        {/*<View style={styles.btn1}>
            <TouchableOpacity
            style={styles.fabBtn}
            onPress={() => faceBookLogin()}   
            > 
                <Text style={styles.txt3}>Sign in with Facebook</Text>

                <FontAwesome5 name="facebook" size={28} color="blue" style= {{marginLeft: 10}}/>
                
              </TouchableOpacity> 
        </View>*/}
        <View style={styles.btn2}>
            <TouchableOpacity
            style={styles.fabBtn}
            onPress={() => onSubmit()}  
            >
              
                <Text style={styles.txt3}>Sign up with Email</Text>

                <MaterialIcons name="email" size={24} color="#3480CB" style = {{marginLeft: 20}} />
              </TouchableOpacity> 
        
        </View>
        <View style={styles.btn2}>
            <TouchableOpacity
            style={styles.fabBtn}
            onPress={() => navigate("Phone")}
                
            >
              
                <Text style={styles.txt3}>Sign up with Phone </Text>

                
                <MaterialIcons name="local-phone" size={24} color="#3480CB" style = {{marginLeft: 20}}/>
              </TouchableOpacity> 
        
        </View>
        
        <View style={styles.btn2}>
            <TouchableOpacity
                onPress={() => navigate("Login") }
                
              >

                <Image source={loginbtn} style={{width: 300, height: 44.5}}></Image>
                
              </TouchableOpacity> 
        
        </View>

        

      </ImageBackground>

    </SafeAreaView>
  )
}
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 300,
    height: 44.5,
    backgroundColor: "#fff",
    marginRight: 10,
    borderRadius: 90,
    //borderColor: "black",
    //borderWidth: 2,
    //marginBottom: 20
  },
  txt1: {
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    fontSize: 18,
    color: "white",
    //fontWeight: "bold",
    //marginRight: 10,
    marginTop: 100,
    //marginBottom: 20
  },
  txt2: {
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    fontSize: 18,
    color: "white",
    //fontWeight: "bold",
    //marginRight: 10,
    marginTop: 20
  },
  btn1: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginRight: 10,
    marginTop:"30%",
    //marginBottom: 20
  },
  btn2: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: '10%'
  },
  textInput1: {
    alignSelf: "stretch",
    height: 50,
    marginTop: '20%',
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginRight: 40,
    marginLeft: 40
  },
  textInput: {
    alignSelf: "stretch",
    height: 50,
    marginTop: 10,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginRight: 40,
    marginLeft: 40
  },
  txt3: {
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
  
    fontSize: 24,
    color: "#3480CB",
    //fontWeight: "bold",
    //marginRight: 10,
  
  },
  textInput2: {
    alignSelf: "stretch",
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginRight: 20,
    marginLeft: 20
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
        //<Image source={loginbtn} style={{width: 300, height: 44.5}}></Image>