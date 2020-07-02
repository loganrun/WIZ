import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Alert} from "react-native";
import Main from './Auth/Main'
//import { SplashScreen, AppLoading } from "expo";
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
import * as Sentry from 'sentry-expo'

const firebaseConfig = {
  apiKey: "AIzaSyCfx94bwaO-VnQosXn4aUIi_DKUCdAcdEA",
  authDomain: "wizusers.firebaseapp.com",
  databaseURL: "https://wizusers.firebaseio.com",
  projectId: "wizusers",
  storageBucket: "wizusers.appspot.com",
  messagingSenderId: "5680477837",
  appId: "1:5680477837:web:8bff0f0c656ab065"
};

Sentry.init({
dsn: 'https://089403116866468aa120b8b535bbb89f@o412716.ingest.sentry.io/5291906',
enableInExpoDevelopment: true,
debug: true
});

firebase.initializeApp(firebaseConfig);

const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends React.Component {

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
    try{
      await SplashScreen.preventAutoHideAsync();
      this._getLocationAsync()
    }catch(e){
      console.log("something wrong")

    }
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
        'Location services is not responding.',
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
    this.setState({appIsReady: true}, async () =>{
      await SplashScreen.hideAsync()
      
    })
  };

  
  render() {
    if (!this.state.appIsReady) {
      return null
        //<AppLoading
         // startAsync={this._getLocationAsync}
         // onFinish={() => this.setState({ isLoading: "false" })}
        ///>
      ;
    }else {
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
