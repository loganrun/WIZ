import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Switch
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as firebase from "firebase";

class AuthReset extends Component {
  static navigationOptions = {
    title: "ACCOUNT RESET",
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
        .required()
    });
    return (
      <Formik
        initialValues={{
          email: "",

        }}
        onSubmit={(value, actions) => {
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
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.text}>Please enter the email address associated with this account. An email will be sent with instructions to reset the account</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("email")}
              placeholder={"Please enter email"}
              onBlur={formikProps.handleBlur("email")}
            />
            <Text style={{ color: "red", marginLeft: 20 }}>
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
    marginLeft: 20, 
    marginTop: 100, 
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
  }
});