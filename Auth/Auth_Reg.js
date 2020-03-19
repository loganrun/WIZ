import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage, ImageBackground, Image
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as firebase from "firebase";
import axios from "axios";
const loginPage = require("../assets/Loginbk.png");
const signupbtn = require("../assets/sign-up.png");

class AuthReg extends Component {
  static navigationOptions = {
    title: "SIGN UP",
    headerStyle: {
      backgroundColor:  "#3480CB",
      elevation: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    
    const validationSchema = yup.object().shape({
      
      firstName: yup
        .string()
        .label("First name")
        .required(),
      lastName: yup
        .string()
        .label("Last name")
        .required(),
    });
    return (
      <ImageBackground source={loginPage} style={{width: '100%', height: '100%'}}> 
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          userName: "",
          password: "",
          service: "",
          promotions: false
        }}
        onSubmit={(value, actions) => {
          let email = value.email;
          let password = value.password;

          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function(cred) {
              let user = firebase.auth().currentUser;
              user.sendEmailVerification();
              AsyncStorage.setItem("userToken", JSON.stringify(user.uid));
              //createUser(value, user);
            })
            .then(function(cred) {
              let user = firebase.auth().currentUser;
              axios({
                method: "post",
                baseURL: "https://whizzit.herokuapp.com/api/users",
                timeout: 40000,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                data: {
                  email: value.email,
                  firstName: value.firstName,
                  lastName: value.lastName,
                  userName: value.userName,
                  service: value.service,
                  userId: user.uid
                }
              });
            })
            .then(cred => this.props.navigation.navigate("Main"))
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == "auth/email-already-in-use") {
                actions.setErrors({
                  email:
                    "Email already in use.  Please login or use another email address."
                });
              } //else if(errorCode == "auth/wrong-password") {
              //   actions.setErrors({password: "Password is incorrect"})
              // }

              actions.setSubmitting(false);
            });
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <KeyboardAvoidingView style={styles.container} behavior='padding'>
            {/* <Text style={styles.text}>SIGN UP</Text> */}
            <TextInput
              style={styles.textInput1}
              onChangeText={formikProps.handleChange("firstName")}
              onBlur={formikProps.handleBlur("firstName")}
              placeholder={"First Name"}
              autoFocus
            />
            <Text style={{ color: "white", marginLeft: 20 }}>
              {formikProps.touched.firstName && formikProps.errors.firstName}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("lastName")}
              onBlur={formikProps.handleBlur("lastName")}
              placeholder={"Last Name"}
            />
            <Text style={{ color: "white", marginLeft: 20 }}>
              {formikProps.touched.lastName && formikProps.errors.lastName}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("phone number")}
              placeholder={"Phone Number"}
              secureTextEntry
              onBlur={formikProps.handleBlur("phone")}
            />
            <Text style={{ color: "white", marginLeft: 20 }}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("service")}
              onBlur={formikProps.handleBlur("service")}
              placeholder='Do you drive for a service?'
            />
            
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={formikProps.handleSubmit}
              >
                <Image source={signupbtn} style={{width: 300, height: 44}}></Image>
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
        )}
      </Formik>
      </ImageBackground>
    );
  }
}
export default AuthReg;

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
    borderBottomColor: "white",
    borderBottomWidth: 3,
    marginRight: 40,
    marginLeft: 20
  },
  textInput1: {
    alignSelf: "stretch",
    height: 50,
    marginTop: 60,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 3,
    marginRight: 20,
    marginLeft: 20
  },
  textInput: {
    alignSelf: "stretch",
    height: 50,
    marginTop: 20,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 3,
    marginRight: 20,
    marginLeft: 20
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    //padding: 20,
    //backgroundColor: "#52AEA0",
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40
  },
  switch: {
    marginTop: 20
  }
});
