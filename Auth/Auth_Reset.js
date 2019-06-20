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

class AuthReg extends Component {
  static navigationOptions = {
    title: "SIGN UP",
    headerStyle: {
      backgroundColor: "#3a455c",
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
          userName: "",
          email: "",
          password: "",
          service: "",
    
        }}
        onSubmit={(value, actions) => {
          alert(JSON.stringify(value));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.text}>SIGN UP</Text>
            <TextInput
              style={styles.textInput}
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
              onChangeText={formikProps.handleChange("email")}
              placeholder={"Please enter email"}
              onBlur={formikProps.handleBlur("email")}
            />
            <Text style={{ color: "red", marginLeft: 20 }}>
              {formikProps.touched.email && formikProps.errors.email}
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
              placeholder="Which service do you drive for?"
            />
            <View style={{ flexDirection: "row" }}>
              <Switch
                style={{ marginTop: 20, marginRight: 10, marginLeft: 20 }}
                // value={formikProps.promotions[promotions]}
                // onValueChange={value => {
                //   formikProps.setFieldValue(promotions, value);
                //}}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: 20,
                  marginRight: 20,
                  fontSize: 16
                }}
              >
                Would you like to receive Coupons and Promotions?
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={formikProps.handleSubmit}
            >
              <Text
                style={{ fontSize: 22, color: "#ffff", fontWeight: "bold" }}
              >
                Submit
              </Text>
            </TouchableOpacity>
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
    backgroundColor: "#3a455c",
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40
  },
  switch: {
    marginTop: 20
  }
});