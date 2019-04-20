import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

class Restaurant extends Component {
  // constructor(props) {
  //   super(props);
  // }
  // state = {
  //   name: "",
  //   email: "",
  //   password: "",
  //   contact: "",
  //   phone: ""
  // };
  static navigationOptions = {
    title: "ADD YOUR BUSINESS",
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
      business: yup
        .string()
        .label("Business name")
        .required(),
      contact: yup
        .string()
        .label("Contact name")
        .required(),
      phone: yup
        .string()
        .label("Phone")
        .required()
    });
    return (
      <Formik
        initialValues={{
          business: "",
          contact: "",
          email: "",
          phone: ""
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
            <Text style={styles.text}>ADD YOUR BUSINESS</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("business")}
              onBlur={formikProps.handleBlur("business")}
              placeholder={"Name of Your Business"}
              autoFocus
            />
            <Text style={{ color: "red", marginLeft: 20 }}>
              {formikProps.touched.business && formikProps.errors.business}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={formikProps.handleChange("contact")}
              onBlur={formikProps.handleBlur("contact")}
              placeholder={"Contact Person"}
            />
            <Text style={{ color: "red", marginLeft: 20 }}>
              {formikProps.touched.contact && formikProps.errors.contact}
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
              onChangeText={formikProps.handleChange("phone")}
              placeholder={"Phone Number"}
              secureTextEntry
              onBlur={formikProps.handleBlur("phone")}
            />
            <Text style={{ color: "red", marginLeft: 20 }}>
              {formikProps.touched.phone && formikProps.errors.phone}
            </Text>
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
export default Restaurant;

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
    marginTop: 30,
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
  }
});
