import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,ImageBackground,Image
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from "formik";
import * as yup from "yup";
import * as firebase from "firebase";
import { SafeAreaView } from 'react-navigation'
import * as Amplitude from "expo-analytics-amplitude"
const loginPage = require("../assets/Loginbk.png");
const loginbtn = require("../assets/login_white.png");

class AuthLogin extends Component {
  static navigationOptions = {
    title: "LOGIN",
    headerStyle: {
      backgroundColor: "#3480CB",
      elevation: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .trim()
        .email()
        .label("Email")
        .required(),
      password: yup
        .string()
        .label("Password")
        .required()
        .min(6)
        .max(20)
    });
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
      <ImageBackground source={loginPage} style={{width: '100%', height: '100%'}}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(value, actions) => {
          Amplitude.logEvent("COMPLETE_LOGIN")
          let email = value.email;
          let password = value.password;
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function(cred) {
              //console.log(cred);
              let user = firebase.auth().currentUser;
              //console.log(user);
              if (!user.emailVerified) {
                user.sendEmailVerification();
                AsyncStorage.setItem("userToken", JSON.stringify(user.uid));
              }
              AsyncStorage.setItem("userToken", JSON.stringify(user.uid));
            })
            .then(cred => this.props.navigation.navigate("Main"))
            .catch(function(error) {
              //console.log(error);
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == "auth/user-not-found") {
                actions.setErrors({
                  email: "User not found.  Please try again"
                });
              } else if (errorCode == "auth/wrong-password") {
                actions.setErrors({ password: "Password is incorrect" });
              }

              actions.setSubmitting(false);
            });
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <KeyboardAvoidingView style={styles.container} behavior='height'>
            {/* <View style={styles.container}> */}
            {/* <Text style={styles.text}>Login</Text> */}
            <TextInput
              style={styles.textInput1}
              onChangeText={formikProps.handleChange("email")}
              onBlur={formikProps.handleBlur("email")}
              autoFocus
            />
            <Text style={{ color: "white", marginLeft: 40 }}>
              Email
            </Text>
            <Text style={{ color: "white", marginLeft: 40 }}>
              {formikProps.touched.email && formikProps.errors.email}
            </Text>

            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("password")}
              secureTextEntry
              onBlur={formikProps.handleBlur("password")}
            />
            <Text style={{ color: "white", marginLeft: 40 }}>
              Password
            </Text>
            <Text style={{ color: "white", marginLeft: 40 }}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>
            
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                //style={styles.button}
                onPress={formikProps.handleSubmit}
              >
                <Image source={loginbtn} style={{width: 300, height: 44, alignContent:"center", marginTop: 40, alignSelf: "center"}}></Image>
              </TouchableOpacity>
            )}

      <View style={styles.button2}>
      <TouchableOpacity
                
                onPress={() => navigate("Reset")}
              >
                
                <Text
                  style={{
                    fontSize: 20,
                    color:"white"
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
      </View>
            </KeyboardAvoidingView>
            
        )}
      </Formik>
      
      
          
      </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default AuthLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  text: {
    fontSize: 24,
    color: "orange",
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 3,
    marginRight: 40,
    marginLeft: 20
  },
  textInput1: {
    alignSelf: "stretch",
    height: 50,
    marginTop: '30%',
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginRight: 40,
    marginLeft: 40
  },
  textInput: {
    alignSelf: "stretch",
    height: 50,
    marginTop: 30,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginRight: 40,
    marginLeft: 40
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#52AEA0",
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40
  },
  button2: {
    marginTop: 35,
    //fontStyle:"italic",
    alignItems:"center",
  }
});
