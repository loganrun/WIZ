import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as firebase from "firebase";
import axios from "axios";

class AuthReg extends Component {
  static navigationOptions = {
    title: "SIGN UP",
    headerStyle: {
      backgroundColor: "#52AEA0",
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
        .max(20),
      firstName: yup
        .string()
        .label("First name")
        .required(),
      lastName: yup
        .string()
        .label("Last name")
        .required(),
      userName: yup
        .string()
        .label("User name")
        .required()
    });
    return (
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
            <Text style={{ color: "red", marginLeft: 20 }}>
              {formikProps.touched.firstName && formikProps.errors.firstName}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("lastName")}
              onBlur={formikProps.handleBlur("lastName")}
              placeholder={"Last Name"}
            />
            <Text style={{ color: "red", marginLeft: 20 }}>
              {formikProps.touched.lastName && formikProps.errors.lastName}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("userName")}
              placeholder={"Please enter a user name"}
              onBlur={formikProps.handleBlur("userName")}
            />
            <Text style={{ color: "red", marginLeft: 20 }}>
              {formikProps.touched.userName && formikProps.errors.userName}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("email")}
              placeholder={"Please enter email"}
              onBlur={formikProps.handleBlur("email")}
            />
            <Text style={{ color: "red", marginLeft: 20 }}>
              {formikProps.touched.email && formikProps.errors.email}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("password")}
              placeholder={"Password"}
              secureTextEntry
              onBlur={formikProps.handleBlur("password")}
            />
            <Text style={{ color: "red", marginLeft: 20 }}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("service")}
              onBlur={formikProps.handleBlur("service")}
              placeholder='Which service do you drive for?'
            />
            
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={formikProps.handleSubmit}
              >
                <Text
                  style={{
                    fontSize: 22,
                    color: "#ffff",
                    fontWeight: "bold"
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
        )}
      </Formik>
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
    borderBottomColor: "black",
    borderBottomWidth: 3,
    marginRight: 40,
    marginLeft: 20
  },
  textInput1: {
    alignSelf: "stretch",
    height: 40,
    marginTop: 60,
    color: "black",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginRight: 20,
    marginLeft: 20
  },
  textInput: {
    alignSelf: "stretch",
    height: 40,
    marginTop: 20,
    color: "black",
    borderBottomColor: "black",
    borderBottomWidth: 2,
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
  switch: {
    marginTop: 20
  }
});
