import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,ImageBackground,Image,
  AsyncStorage, Alert
} from "react-native";
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'
import { Formik } from "formik";
import * as yup from "yup";
import * as firebase from "firebase";
import { SafeAreaView } from 'react-navigation'
import axios from "axios";
import * as Amplitude from 'expo-analytics-amplitude'
const loginPage = require("../assets/Loginbk.png");
//const loginbtn = require("../assets/login_white.png");
const firebaseConfig = {
    apiKey: "AIzaSyCfx94bwaO-VnQosXn4aUIi_DKUCdAcdEA",
    authDomain: "wizusers.firebaseapp.com",
    databaseURL: "https://wizusers.firebaseio.com",
    projectId: "wizusers",
    storageBucket: "wizusers.appspot.com",
    messagingSenderId: "5680477837",
    appId: "1:5680477837:web:8bff0f0c656ab065"
  };

  

export default Auth_Phone = () => {
    
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [message, showMessage] = useState('')


  
    const sendVerification = async () => {
      Amplitude.logEvent("SUBMIT_PHONE#")
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            
          } catch (err) {
            console.log(err)
        }
    }

  
    const confirmCode = () => {
      Amplitude.logEvent("COMPLETE_PHONE_SIGNUP")
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          let logger = result
          let user = logger.user.uid
        
          axios({
            method: "post",
            baseURL: "http://prototypeapp-env.pafwfr7hjt.us-west-2.elasticbeanstalk.com/api/users",
            timeout: 40000,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            data: {
              userId: logger.user.uid,
              phoneNum: logger.user.phoneNumber
            }
          });
          Amplitude.setUserId(user)
        });
    };
  
    return (
        <SafeAreaView style= {styles.container}>
        <ImageBackground source={loginPage} style={{width: '100%', height: '100%'}}>
            <KeyboardAvoidingView>
        <View>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          <TextInput
            onChangeText={setPhoneNumber}
            placeholder="+1 999 999 9999"
            placeholderTextColor="white"
            keyboardType="phone-pad"
            autoCompleteType="tel"
            style={styles.textInput}
          />
          <Text style={{ color: "white", marginLeft: 40 }}>
              PHONE NUMBER - be sure to include the +1
            </Text>
          <TouchableOpacity
            style={styles.fabBtn}
            onPress={sendVerification}
          >
            <Text style={styles.buttonText}>Request Code</Text>
          </TouchableOpacity>
          <TextInput
          placeholder= "confirmation code"
          placeholderTextColor="white"
            onChangeText={setCode}
            keyboardType="number-pad"
            style={styles.textInput}
          />
          <Text style={{ color: "white", marginLeft: 40 }}>
              ENTER CODE
            </Text>
          <TouchableOpacity style={styles.fabBtn} onPress={confirmCode}>
            <Text style={styles.buttonText}>Confirm Code</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </ImageBackground>
        </SafeAreaView>
    
    );
  };

  Auth_Phone['navigationOptions'] = screenProps => ({
    title: 'SIGN IN WITH PHONE NUMBER',
    headerStyle: {
        backgroundColor: "#3480CB",
        elevation: 0
      },
      headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
})

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
      paddingTop: 40,
      paddingBottom: 20,
      paddingHorizontal: 20,
      fontSize: 24,
      borderBottomColor: "white", //'#7f8c8d33',
      borderBottomWidth: 1,
      marginBottom: 10,
      textAlign: 'center',
      color: "#FFF",
      marginRight: 40,
      marginLeft: 40
    },
    sendVerification: {
      padding: 20,
      backgroundColor: '#3498db',
      borderRadius: 10,
    },
    sendCode: {
      padding: 20,
      backgroundColor: '#9b59b6',
      borderRadius: 10,
    },
    buttonText: {
      justifyContent: "center",
      textAlign: "center",
      position: "relative",
    
      fontSize: 24,
      color: "#3480CB",
    },
    fabBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position:"relative",
        width: 300,
        height: 44.5,
        backgroundColor: "#fff",
        marginLeft: 40,
        borderRadius: 90,
        marginTop: 15
        //borderColor: "black",
        //borderWidth: 2,
        //marginBottom: 20
      },
  });

  