import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import Main from './Auth/Main'
import { SplashScreen, AppLoading } from "expo";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as firebase from 'firebase'
import api from "./services/Api";
import restApi from "./services/restroom";
import rootReducer from './store/reducers';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

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
  constructor() {
    super();
    SplashScreen.preventAutoHide();
    state = {
      isLoading: false,
      errorMessage: " ",
      lat: "",
      lon: " ",
      search: ""
    };
  }
  componentWillMount() {
    this.setState({ isLoading: "true" });
    //this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    //console.log(location);
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    this.setState({ lat });
    this.setState({ lon });

    // const saveLocation = async location => {
    //   try {
    //     await AsyncStorage.setItem("location", location);
    //     console.log(location);
    //   } catch (error) {
    //     // Error retrieving data
    //     console.log(error.message);
    //   }
    // };

    //await this.loadBusiness();
    
    await this.loadBathroom();
    await this.saveLocation(location);
    

    //console.log(this.state.lat);
    //console.log(this.state.isLoading);
    //console.log(lon);
    //this.setState({ isLoading: "false" });
    //console.log(this.state.isLoading);
  };

  saveLocation = async location => {
    try {
      await AsyncStorage.setItem("location", JSON.stringify(location));
      //console.log(location);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  // saveBusiness = async businesses => {
  //   try {
  //     await AsyncStorage.setItem("businesses", JSON.stringify(businesses));
  //     //console.log(location);
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error.message);
  //   }
  // };

  saveBathroom = async bathroom => {
    try {
      await AsyncStorage.setItem("bathroom", JSON.stringify(bathroom));
      //console.log(location);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  // loadBusiness = async () => {
  //   let lat = this.state.lat;
  //   let lon = this.state.lon;

  //   try {
  //     let params = {
  //       term: this.state.search,
  //       latitude: lat,
  //       longitude: lon,
  //       radius: 20000,
  //       limit: 50
  //     };

  //     let response = await api.get("/search", { params });
  //     let { businesses } = response.data;
  //     this.saveBusiness(businesses);
  //     //console.log(businesses);

  //     //this.setState({ business: businesses });
  //     //await this.setState({ loading: false });
  //     //this.setState({ search: "" });
  //   } catch (e) {
  //     console.log("error", e.message);
  //   }
  // };

  loadBathroom = async () => {
    //let lat = this.state.lat;
    //let lon = this.state.lon;

    try {
      let params = {
        page: 1,
        per_page: 30,
        lat: this.state.lat,
        lng: this.state.lon
      };

      let response = await restApi.get("/by_location", { params });
      let bathroom  = response.data;

      this.saveBathroom(bathroom);
      //await this.setState({ loading: false });
    } catch (e) {
      console.log("error", e.message);
    }
  };
  render() {
    if (this.state.isLoading === "true") {
      return (
        <AppLoading
          startAsync={this._getLocationAsync}
          onFinish={() => this.setState({ isLoading: "false" })}
        />
      );
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
