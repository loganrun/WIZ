import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Switch
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as firebase from "firebase";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Amplitude from "expo-analytics-amplitude"
const loginPage = require("../assets/Loginbk.png");

class AuthReset extends Component {
  static navigationOptions = {
    title: "ACCOUNT RESET",
    headerStyle: {
      backgroundColor: "#3480CB",//"#52AEA0",
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
        .required()
    });
    return (
      <SafeAreaView style={styles.container}>
      <ImageBackground source={loginPage} style={{width: '100%', height: '100%'}}>
      <Formik
        initialValues={{
          email: "",

        }}
        onSubmit={(value, actions) => {
          Amplitude.logEventAsync("BEGIN_RESET")
          let email = value.email;
          firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(cred => alert("Email sent to address on file. You will be able to login after you reset your password"))
            .then(cred => this.props.navigation.navigate("Login"))
            .catch(function(error) {
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
          <KeyboardAvoidingView behavior="height">
            <Text style={styles.text}>Please enter the email address associated with this account. An email will be sent with instructions to reset the account</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("email")}
              //onBlur={formikProps.handleBlur("email")}
            />
            <Text style={{ color: "white", marginLeft: 40 }}>
              Please enter email
            </Text>
            <Text style={{ color: "white", marginLeft: 40 }}>
              {formikProps.touched.email && formikProps.errors.email}
            </Text>
            
            <TouchableOpacity
              style={styles.button}
              onPress={formikProps.handleSubmit}
            >
              <Text
                style={{ fontSize: 22, color: "#ffff", fontWeight: "bold" }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </Formik>

      </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default AuthReset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    //justifyContent: "center"
  },
  text: {
    fontSize: 18,
    marginBottom: 30,
    marginRight: 40,
    marginLeft: 40, 
    marginTop: '20%', 
    color:'white',
    alignSelf:'center'
  },
  textInput: {
    alignSelf: "stretch",
    height: 40,
    marginTop: 20,
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
    backgroundColor: "#3480CB",
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 50
  }
});