import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import Main from './Auth/Main'
import {AppLoading } from "expo";
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

const firebaseConfig = {
  apiKey: "AIzaSyCfx94bwaO-VnQosXn4aUIi_DKUCdAcdEA",
  authDomain: "wizusers.firebaseapp.com",
  databaseURL: "https://wizusers.firebaseio.com",
  projectId: "wizusers",
  storageBucket: "wizusers.appspot.com",
  messagingSenderId: "5680477837",
  appId: "1:5680477837:web:8bff0f0c656ab065"
};

firebase.initializeApp(firebaseConfig);

const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends React.Component {
    //SplashScreen.preventAutoHide();
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
    }catch(e){
      console.warn(e)
    }
    this._getLocationAsync
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
   
    this.saveLocation(location);
    

   
  };

  saveLocation = location => {
    try {
      AsyncStorage.setItem("location", JSON.stringify(location));
      //console.log(location);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    this.setState({appIsReady: true}, async ()=>{
      await SplashScreen.hideAsync()
    })
  };

  
  render() {
    if (!this.state.appIsReady) {
      return null
      // (
      //   <AppLoading
      //     startAsync={this._getLocationAsync}
      //     onFinish={() => this.setState({ isLoading: "false" })}
      //   />
      // );
    } else {
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
