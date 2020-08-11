import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Alert} from "react-native";
import Main from './Auth/Main'
<<<<<<< HEAD
import {AppLoading } from "expo";
=======
//import { SplashScreen, AppLoading } from "expo";
>>>>>>> f05d4fea9033f213022f9839d379e7fd9fb4c1b2
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as firebase from 'firebase'
import api from "./services/Api";
import restApi from "./services/restroom";
import rootReducer from './store/reducers';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as SplashScreen from 'expo-splash-screen'
<<<<<<< HEAD
=======
import * as Sentry from 'sentry-expo'
import * as Amplitude from 'expo-analytics-amplitude'
>>>>>>> f05d4fea9033f213022f9839d379e7fd9fb4c1b2

const firebaseConfig = {
  apiKey: "AIzaSyCfx94bwaO-VnQosXn4aUIi_DKUCdAcdEA",
  authDomain: "wizusers.firebaseapp.com",
  databaseURL: "https://wizusers.firebaseio.com",
  projectId: "wizusers",
  storageBucket: "wizusers.appspot.com",
  messagingSenderId: "5680477837",
  appId: "1:5680477837:web:8bff0f0c656ab065",
  measurementId: "G-FQN5Y3BVZD" 
};

Sentry.init({
dsn: 'https://089403116866468aa120b8b535bbb89f@o412716.ingest.sentry.io/5291906',
enableInExpoDevelopment: true,
debug: true
});

firebase.initializeApp(firebaseConfig);

const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends React.Component {
<<<<<<< HEAD
    //SplashScreen.preventAutoHide();
=======

>>>>>>> f05d4fea9033f213022f9839d379e7fd9fb4c1b2
    state = {
      appIsReady: false,
      errorMessage: " ",
      lat: "",
      lon: " ",
      search: ""
    };

  async componentDidMount() {
    //this.setState({ isLoading: "true" });
    //this._getLocationAsync();
<<<<<<< HEAD
    try{
      await SplashScreen.preventAutoHideAsync();
      this._getLocationAsync()
    }catch(e){
      console.warn(e)
    }
    
=======
    Amplitude.initialize('f463257f8d5dd8a6670eeae43c08a54a')
    try{
      
      await SplashScreen.preventAutoHideAsync();
      this._getLocationAsync()
    }catch(e){
      console.log("something wrong")

    }
>>>>>>> f05d4fea9033f213022f9839d379e7fd9fb4c1b2
  }



  _getLocationAsync = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      //console.log(status)
      //this.setState({
       // errorMessage: "Permission to access location was denied. This app needs location to work. Please allow at Settings->Privacy->Location"
      //});
      //await SplashScreen.hideAsync()
      Alert.alert(
        'Permission to access LOCATION was denied.',
        'This app needs access to LOCATION services to work. Please go to SETTINGS-> PRIVACY-> LOCATION to enable.',
        [
          { text: 'Ok' }
        ],
        { cancelable: false }
      );
    }else{

    try{

      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      this.saveLocation(location)

    }catch(error){
      Alert.alert(
        'Location services are not responding.',
        'This app needs access to your location in order to work. Please go to SETTINGS-> PRIVACY-> LOCATION to enable.',
        [
          { text: 'Ok' }
        ],
        { cancelable: false }
      );

    }
  }

  };

  saveLocation = location => {
    try {
      AsyncStorage.setItem("location", JSON.stringify(location));
      //console.log(location);
    } catch (error) {
      // Error retrieving data
      console.log("something");
    }
<<<<<<< HEAD
    this.setState({appIsReady: true}, async ()=>{
      await SplashScreen.hideAsync()
=======
    this.setState({appIsReady: true}, async () =>{
      await SplashScreen.hideAsync()
      
>>>>>>> f05d4fea9033f213022f9839d379e7fd9fb4c1b2
    })
  };

  
  render() {
    if (!this.state.appIsReady) {
      return null
<<<<<<< HEAD
      // (
      //   <AppLoading
      //     startAsync={this._getLocationAsync}
      //     onFinish={() => this.setState({ isLoading: "false" })}
      //   />
      // );
    } else {
=======
        //<AppLoading
         // startAsync={this._getLocationAsync}
         // onFinish={() => this.setState({ isLoading: "false" })}
        ///>
      ;
    }else {
>>>>>>> f05d4fea9033f213022f9839d379e7fd9fb4c1b2
      return (
      <Provider store={store}>
      <Main />
      </Provider>
      )
    }
    //return <Routes />;
  }
}
export default App;
