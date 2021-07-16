import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
//import { SafeAreaView } from 'react-navigation';
if (Platform.OS === 'android') {
  SafeAreaView.setStatusBarHeight(0);
}



class Favorites extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Ionicons
          style={{ padding: 10 }}
          onPress={() => navigation.openDrawer()}
          name='md-menu'
          size={30}
          color={"#fff"}
        />
      ),
      title: "FAVORITES",
      headerStyle: {
        backgroundColor: "#3480CB",//"#52AEA0",
        elevation: 0
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  }
  // static navigationOptions = {
  //     title: "LOGIN",
  //     headerStyle: {
  //       backgroundColor: "#3a455c",
  //       elevation: 0
  //     },
  //     headerTintColor: "#fff",
  //     headerTitleStyle: {
  //       fontWeight: "bold"
  //     }
  //   };
  render() {
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>FEATURE COMING SOON</Text>
      </View>
      </SafeAreaView>
    );
  }
}
export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
