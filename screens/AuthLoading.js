import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import firebase from 'firebase'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user != null) {
    //       this.props.navigation.navigate("Main")
    //     } else {
    //       this.props.navigation.navigate("Auth")
    //     }
    //   });

    //const userToken = await AsyncStorage.getItem('userToken');
    firebase.auth().currentUser

    this.props.navigation.navigate(false ? 'Main' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 50,
    paddingTop: '50%',
    alignItems: 'center',
  },
});
