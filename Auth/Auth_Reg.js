import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground, Image
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from "formik";
import * as yup from "yup";
import * as firebase from "firebase";
import axios from "axios";
import {connect} from 'react-redux'
import {newUser} from '../store/actions'
import { SafeAreaView } from 'react-navigation'
import * as Amplitude from 'expo-analytics-amplitude'
const loginPage = require("../assets/Loginbk.png");
const nextbtn = require("../assets/nzxt_button.png");
// const items = navigation.getParam()
//     console.log(items)
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
        .max(20),
      userName: yup
        .string()
        .label("User name")
        .required(),
      firstName: yup
        .string()
        .label("First name")
        .required(),
      lastName: yup
        .string()
        .label("Last name")
        .required(),
    });
    const {navigate} = this.props.navigation
    //let email = this.props.navigation.getParam("email");
    //let userName = this.props.navigation.getParam("userName");
    //let password = this.props.navigation.getParam("password")
    //console.log(email, userName, password)
    return (
      <SafeAreaView style={styles.container}>
      <ImageBackground source={loginPage} style={{width: '100%', height: '100%'}}> 
      <Formik
        initialValues={{
          email: "", 
          password: "", 
          userName: "",
          firstName: "",
          lastName: "",
          service: "",
          phoneNum: ""
        }}
        onSubmit={(value, actions) => {
          // Amplitude.logvent("FINISH_EMAIL_SIGNUP")
          let firstName = value.firstName;
          let lastName = value.lastName;
          let service = value.service;
          let phoneNum = value.phoneNum;
          let email = value.email;
          let password =  value.password;
          let userName = value.userName
          this.props.newUser(true)
          
            firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            
            .then(function(cred) {
              user = firebase.auth().currentUser;
              user.sendEmailVerification();
              AsyncStorage.setItem("userToken", user.uid);
              //createUser(value, user);
              
            })
            .then(function(cred) {
              let user = firebase.auth().currentUser;
              axios({
                method: "post",
                baseURL: "http://prototypeapp-env.pafwfr7hjt.us-west-2.elasticbeanstalk.com/api/users",
                timeout: 40000,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                data: {
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                  userName: userName,
                  service: service,
                  userId: user.uid,
                  phoneNum: phoneNum
                }
              });
            })
            .then(next => this.props.navigation.navigate("Main"))
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == "auth/email-already-in-use") {
                actions.setErrors({
                  firstName:
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
          <KeyboardAvoidingView behavior='height'>
            <TextInput
              style={styles.textInput1}
              onChangeText={formikProps.handleChange("firstName")}
              onBlur={formikProps.handleBlur("firstName")}
              autoFocus
            />
            <Text style={{ color: "white", marginLeft: 40 }}>
              First Name
            </Text>
            <Text style={{ color: "white", marginLeft: 40 }}>
              {formikProps.touched.firstName && formikProps.errors.firstName}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("lastName")}
              onBlur={formikProps.handleBlur("lastName")}
            />
            <Text style={{ color: "white", marginLeft: 40 }}>
              Last Name
            </Text>
            <Text style={{ color: "white", marginLeft: 40 }}>
              {formikProps.touched.lastName && formikProps.errors.lastName}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("userName")}
              onBlur={formikProps.handleBlur("userName")}
            />
            <Text style={{ color: "white", marginLeft: 40 }}>
              User Name
            </Text>
            <Text style={{ color: "white", marginLeft: 40 }}>
              {formikProps.touched.userName && formikProps.errors.userName}
            </Text>
            
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("email")}
              onBlur={formikProps.handleBlur("email")}
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
            {/* <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("phone number")}
              secureTextEntry
              onBlur={formikProps.handleBlur("phone")}
            />
            <Text style={{ color: "white", marginLeft: 40 }}>
              Phone Number
            </Text>
            <Text style={{ color: "white", marginLeft: 40 }}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("service")}
              onBlur={formikProps.handleBlur("service")}
              placeholder='Do you drive for a service?'
            /> */}
            
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
              style={styles.fabBtn}
              onPress={formikProps.handleSubmit}  
              >
                
                  <Text style={styles.txt3}>Sign up</Text>
  
                </TouchableOpacity> 
            )}
          </KeyboardAvoidingView>
        )}
      </Formik>
      </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {

  return {
    newUser: (user)=> {
      dispatch(newUser(user))
    }
  }

}

export default connect(null, mapDispatchToProps)(AuthReg);

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
    borderBottomWidth: 1,
    marginRight: 40,
    marginLeft: 20
  },
  textInput1: {
    alignSelf: "stretch",
    height: 25,
    marginTop: '10%',
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginRight: 40,
    marginLeft: 40
  },
  textInput: {
    alignSelf: "stretch",
    height: 20,
    marginTop: 10,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginRight: 40,
    marginLeft: 40
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
  },
  fabBtn: {
    //flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //position: "relative",
    width: 300,
    height: 44.5,
    backgroundColor: "#fff",
    marginRight: 40,
    marginLeft:60,
    borderRadius: 90,
    marginTop: 30
    //borderColor: "black",
    //borderWidth: 2,
    //marginBottom: 20
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
});
