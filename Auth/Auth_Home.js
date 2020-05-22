import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image,TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  AsyncStorage } from "react-native";
const loginPage = require("../assets/Loginbk.png");
const signupbtn = require("../assets/sign-up.png");
const loginbtn = require("../assets/logintransparent.png");
import Logo from "../components/Logo"
import { Formik } from "formik";
import * as yup from "yup";
import { SafeAreaView } from 'react-navigation'
//import * as firebase from "firebase";
//import axios from "axios";
class AuthHome extends Component {
  constructor() {
    super();
    this.state = {
      lon: null,
      lat: null
    };
  }
  

  

  static navigationOptions = {
    //title: "WHIZZ",
    headerTitle: ()=><Logo/>,
    // headerStyle: {
       backgroundColor: "#3480CB",
    //   //justifyContent: "center"
    // },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    
  };
  render() {
    
    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .email()
        .label("Email")
        .required(),
      password: yup
        .string()
        .label("Password")
        .required()
        .min(6)
        .max(20),
      userName: yup
        .string()
        .label("User name")
        .required()
    });
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={loginPage} style={{width: '100%', height: '100%'}}>
          <Formik
        initialValues={{ email: "", password: "", userName: ""
          
        }}
        onSubmit={(value, actions) => {
          actions.setSubmitting(false);
          this.props.navigation.navigate("SignUp",{
           email: value.email,
            userName: value.userName,
          password: value.password})
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <KeyboardAvoidingView behavior='height'>
           
            <TextInput
              style={styles.textInput1}
              onChangeText={formikProps.handleChange("userName")}
              placeholder={"User name"}
              onBlur={formikProps.handleBlur("userName")}
            />
            <Text style={{ color: "white", marginLeft: 40 }}>
              {formikProps.touched.userName && formikProps.errors.userName}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("email")}
              placeholder={"Email"}
              onBlur={formikProps.handleBlur("email")}
            />
            <Text style={{ color: "white", marginLeft: 40 }}>
              {formikProps.touched.email && formikProps.errors.email}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("password")}
              placeholder={"Password"}
              secureTextEntry
              onBlur={formikProps.handleBlur("password")}
            />
            <Text style={{ color: "white", marginLeft: 40 }}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>
            {/* <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("service")}
              onBlur={formikProps.handleBlur("service")}
              placeholder='Which service do you drive for?'
            /> */}
            
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={styles.btn1}
                onPress={formikProps.handleSubmit}
              >
                  <Image source={signupbtn} style={{width: 300, height: 44}}></Image>
              </TouchableOpacity>
              // <Text style={styles.txt1}> or </Text>
              
              
            )
            
              }
        <View style={styles.btn2}>
            <TouchableOpacity
                onPress={() => navigate("Login")}
                
              >

                <Image source={loginbtn} style={{width: 300, height: 44.5}}></Image>
              </TouchableOpacity> 
        
        </View>
       {/* <TouchableOpacity  onPress={() => navigate("Reset")}>
              <Text style={styles.txt2}> Forgot Password? </Text>
      </TouchableOpacity>  
      </View>  */}
             
          </KeyboardAvoidingView>
          
        )}
      </Formik>
      
        {/* <Text style={styles.txt1}> or </Text> */}
              
             
             
       {/* <TouchableOpacity  onPress={() => navigate("Reset")}>
              <Text style={styles.txt2}> Forgot Password? </Text>
      </TouchableOpacity>  */}
       
           
            </ImageBackground>
            </SafeAreaView>
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
    marginTop:20,
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