import React from "react";
import {Image, StyleSheet, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";

class LogoTitle extends React.Component {
    render() {
      
      return (
        <View style={styles.header}>
          
        <Image
          source={require('../assets/white_logo.png')}
          style={{height: 60, width: 60}}
        />
        </View>
      );
    }
  }

  export default LogoTitle

  const styles = StyleSheet.create({
    header:{
      //width:  '100%',
      //height: '305%',
      flexDirection:  "row",
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: "#3480CB",
      paddingTop: 10,
      paddingBottom:5
    }
  })