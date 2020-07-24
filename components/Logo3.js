import React from "react";
import {Image, StyleSheet, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";

class LogoTitle extends React.Component {
    render() {
      const navigation = this.props.navigation
      const openMenu = () => navigation.openDrawer()
      return (
        <View style={styles.header}>
          <Ionicons
            style={{ position: 'absolute', left: 16 }}
            onPress={openMenu}
            name='md-menu'
            size={30}
            color={"#fff"}
          />
        <Image
          source={require('../assets/white_logo.png')}
          style={{height: 50, width: 50}}
        />
        </View>
      );
    }
  }

  export default LogoTitle

  const styles = StyleSheet.create({
    header:{
      width:  '100%',
      height: 75,
      flexDirection:  "row",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#3480CB",
      paddingTop: 10,
      //paddingBottom:5
    }
  })