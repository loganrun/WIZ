import React, {Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform, Linking
} from "react-native";
import { SafeAreaView } from 'react-navigation';
import * as MailComposer from "expo-mail-composer"
//import * as Linking from "expo-linking"

class Problem extends Component {
  static navigationOptions = {
    title: "Report A Problem",
    headerStyle: {
      backgroundColor: "#52AEA0",
      elevation: 0,
      marginBottom: 5
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    

      const onProblem = async ()=>{
        MailComposer.composeAsync({
            recipients: ["Tech@TheWhizzApp.com"],
            subject: "Feedback About Your App",
            body: " ",
            isHtml: false,
          });
      }

      const iosProblem = async ()=>{
        Linking.openURL('mailto:Tech@thewhizzapp.com')
      }
    if (Platform.OS === "ios"){
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.btn1}>
      <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 20, marginRight: 20}}>If there is a problem (restaurant not honoring a coupon) please let us know and we will make it right!  Thank You!</Text>

      </View>
    
      <View style={styles.btn2}>
            <TouchableOpacity
            style={styles.fabBtn}
            onPress={() => iosProblem()}    
            >
                <Text style={styles.txt3}>REPORT A PROBLEM </Text>   
                
              </TouchableOpacity> 
        </View>
        
        
      
      </SafeAreaView>
      
      
    );
    } else {
      return (
        <SafeAreaView style={styles.container}>
        <View style={styles.btn1}>
        <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 20, marginRight: 20}}>If there is a problem(restaurant not honoring a coupon) please let us know and we will make it right!  Thank You!</Text>
  
        </View>
      
        <View style={styles.btn2}>
              <TouchableOpacity
              style={styles.fabBtn}
              onPress={() => onProblem()}    
              >
                  <Text style={styles.txt3}>REPORT A PROBLEM </Text>   
                  
                </TouchableOpacity> 
          </View>
          
          
        
        </SafeAreaView>
        
        
      );
    }
  }
}
export default Problem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignSelf: "center",
    //justifyContent: "center"
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
    marginLeft: 50,
    marginRight: 40
  },
  switch: {
    marginTop: 20
  },
  txt3: {
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
  
    fontSize: 24,
    color: "#FFF",
    //fontWeight: "bold",
    //marginRight: 10,
  
  },
  fabBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 300,
    height: 44.5,
    backgroundColor: "#3480CB",
    marginRight: 40,
    marginLeft: 40,
    borderRadius: 90,
    marginTop: 20
    //borderColor: "black",
    //borderWidth: 2,
    //marginBottom: 20
  },
  btn2: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: '10%'
  },
  btn1: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginRight: 10,
    marginLeft: 40,
    marginTop:"30%",
    //marginBottom: 20
  },
});