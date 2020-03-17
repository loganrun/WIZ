import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,ImageBackground,Image,
  AsyncStorage
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as firebase from "firebase";
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
      <ImageBackground source={loginPage} style={{width: '100%', height: '100%'}}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(value, actions) => {
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
          <KeyboardAvoidingView style={styles.container} behavior='padding'>
            {/* <View style={styles.container}> */}
            {/* <Text style={styles.text}>Login</Text> */}
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("email")}
              placeholder={"Email"}
              onBlur={formikProps.handleBlur("email")}
              autoFocus
            />
            <Text style={{ color: "white", marginLeft: 20 }}>
              {formikProps.touched.email && formikProps.errors.email}
            </Text>

            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("password")}
              placeholder='Password'
              secureTextEntry
              onBlur={formikProps.handleBlur("password")}
            />
            <Text style={{ color: "white", marginLeft: 20 }}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                //style={styles.button}
                //onPress={formikProps.handleSubmit}
              >
                <Image source={loginbtn} style={{width: 300, height: 44, alignContent:"center", marginTop: 40, alignSelf: "center"}}></Image>
              </TouchableOpacity>
            )}
            <TouchableOpacity
                style={styles.button2}
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
          </KeyboardAvoidingView>
        )}
      </Formik>
      </ImageBackground>
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
  textInput: {
    alignSelf: "stretch",
    height: 50,
    marginTop: 30,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 3,
    marginRight: 20,
    marginLeft: 20
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
    fontStyle:"italic",
    alignItems:"center"
  }
});
