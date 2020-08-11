import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import firebase from "firebase";
import {connect} from "react-redux"
import {initialLocation} from '../store/actions'
import * as Amplitude from 'expo-analytics-amplitude'



class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    
    let location = await this.getLocation();
    this.props.initLocation(location)
    //this.props.navigation.navigate("Main");

    
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Main" : "Auth");
      Amplitude.logEvent("sign in")
    });
  };

  getLocation = async () => {
    let location = "";
    try {
      location = await AsyncStorage.getItem("location");
     //console.log(location)
      //console.log(location)
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
    return JSON.parse(location);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }

}

const mapDispatchToProps = dispatch => {

  return {
    initLocation: (location)=> {
      dispatch(initialLocation(location))
    }
  }

}

export default connect(null, mapDispatchToProps)(AuthLoadingScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 50,
    paddingTop: "50%",
    alignItems: "center"
  }
});
