import React from "react";
import {Image, StyleSheet, View} from "react-native"

class LogoTitle extends React.Component {
    render() {
      return (
        <View style={styles.header}>
        <Image
          source={require('../assets/rectangle_logo.png')}
          style={{height: 60, width: 100}}
        />
        </View>
      );
    }
  }

  export default LogoTitle

  const styles = StyleSheet.create({
    header:{
      width:  '100%',
      height: "100%",
      flexDirection:  "row",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#3480CB"
    }
  })