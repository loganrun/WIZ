import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

class SignUp extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: "",
    email: "",
    password: "",
    service: ""
  };
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

  handleEmailChange = () => {
    console.log(this.state.email);
  };

  handleNameChange = () => {
    console.log(this.state.name);
  };

  handlePasswordChange = () => {
    console.log(this.state.password);
  };

  handleServiceChange = () => {
    console.log(this.state.service);
  };

  handleLoginPress = () => {
    alert("Thank You for Signing Up");
    const { navigate } = this.props.navigation;
    navigate("Explore");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SIGN UP</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your Name"
          value={this.state.name}
          onChangeText={this.handleNameChange}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email Address"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Which service do you drive for?"
          value={this.state.service}
          onChangeText={this.handleServiceChange}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLoginPress}>
          <Text style={{ fontSize: 22, color: "#ffff", fontWeight: "bold" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  text: {
    fontSize: 24,
    color: "orange",
    marginBottom: 40,
    borderBottomColor: "black",
    borderBottomWidth: 3,
    marginRight: 40,
    marginLeft: 20
  },
  textInput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
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
