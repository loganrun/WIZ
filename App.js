import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import Main from './Auth/Main'
import { SplashScreen, AppLoading, Location, Permissions } from "expo";
import * as firebase from 'firebase'
import api from "./services/Api";
import restApi from "./services/restroom";

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

  saveBusiness = async businesses => {
    try {
      await AsyncStorage.setItem("businesses", JSON.stringify(businesses));
      //console.log(location);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  saveBathroom = async bathroom => {
    try {
      await AsyncStorage.setItem("bathroom", JSON.stringify(bathroom));
      //console.log(location);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  loadBusiness = async () => {
    let lat = this.state.lat;
    let lon = this.state.lon;

    try {
      let params = {
        term: this.state.search,
        latitude: lat,
        longitude: lon,
        radius: 20000,
        limit: 50
      };

      let response = await api.get("/search", { params });
      let { businesses } = response.data;
      this.saveBusiness(businesses);
      //console.log(businesses);

      //this.setState({ business: businesses });
      //await this.setState({ loading: false });
      //this.setState({ search: "" });
    } catch (e) {
      console.log("error", e.message);
    }
  };

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
      return <Main />;
    }
    //return <Routes />;
  }
}
export default App;
// const HomeStackNavigator = createStackNavigator({
//   Home: Home,
//   Login: Login,
//   ResSign: ResSign,
//   SignUp: SignUp,
//   Explore: Explore,
//   Favorites: Favorites,
//   Bathroom: Bathroom,
//   Places: Places,
//   Pee: Pee
// });
// const AppStackNavigator = createStackNavigator({
//   Explore: Explore,
//   Home: Home,
//   Places: Places
// });

// export default createAppContainer(
//   createBottomTabNavigator(
//     {
//       Home: {
//         screen: HomeStackNavigator
//       },
//       Explore: {
//         screen: AppStackNavigator
//       },
//       Favorites: {
//         screen: Favorites
//       }
//     },
//     {
//       // navigationOptions: ({ navigation }) => ({
//       //   tabBarIcon: ({ tintColor }) => {
//       //     const { routeName } = navigation.state;

//       //     let icon;
//       //     switch (routeName) {
//       //       case "Explore":
//       //         icon = `md-search`;
//       //         break;
//       //       case "Favorite":
//       //         icon = `md-heart`;
//       //         break;
//       //     }

//       //     return <Ionicons name={icon} size={25} color={tintColor} />;
//       //   }
//       // }),

//       tabBarOptions: {
//         activeTintColor: "red",
//         inactiveTintColor: "grey",
//         style: {
//           backgroundColor: "white",
//           borderTopWidth: 0,
//           shadowOffset: { width: 5, height: 3 },
//           shadowColor: "black",
//           shadowOpacity: 0.5,
//           elevation: 5
//         }
//       }
//     }
//   )
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "orange",
//     justifyContent: "flex-end"
//   },
//   box1: {
//     height: "80%",
//     width: "100%",
//     backgroundColor: "blue"
//   },
//   box2: {
//     flex: 1,
//     backgroundColor: "green"
//   }
// });

// {
//   defaultNavigationOptions: ({ navigation }) => ({
//     tabBarIcon: ({ focused, horizontal, tintColor }) => {
//       const { routeName } = navigation.state;
//       let IconComponent = Ionicons;
//       let iconName;
//       if (routeName === 'Home') {
//         iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//         // Sometimes we want to add badges to some icons.
//         // You can check the implementation below.
//         IconComponent = HomeIconWithBadge;
//       } else if (routeName === 'Settings') {
//         iconName = `ios-options${focused ? '' : '-outline'}`;
//       }

//       // You can return any component that you like here!
//       return <IconComponent name={iconName} size={25} color={tintColor} />;
//     },
//   })
// }

// tabBarOptions: {
//   initialRouteNAme: "Explore",
//   activeTintColor: "red",
//   inactiveTintColor: "grey",
//   style: {
//     backgroundColor: "white",
//     borderTopWidth: 0,
//     shadowOffset: { width: 5, height: 3 },
//     shadowColor: "black",
//     shadowOpacity: 0.5,
//     elevation: 5
//   }
// }
// }
// );
// class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }

//export default App;

// const AppBottomNavigator = createBottomTabNavigator(
//   {
//     Explore: {
//       screen: AppStackNavigator,
//       defaultNavigationOptions: {
//         tabBarLabel: "EXPLORE",
//         tabBarIcon: ({ tintColor }) => (
//           <Ionicons name="md-search" color={tintColor} size={24} />
//         )
//       }
//     },
//     Favorites: {
//       screen: Favorites,
//       defaultNavigationOptions: {
//         tabBarLabel: "FAVORITES",
//         tabBarIcon: ({ tintColor }) => (
//           <Ionicons name="md-heart" color={tintColor} size={24} />
//         )
//       }
//     }
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: "red",
//       inactiveTintColor: "grey",
//       style: {
//         backgroundColor: "white",
//         borderTopWidth: 0,
//         shadowOffset: { width: 5, height: 3 },
//         shadowColor: "black",
//         shadowOpacity: 0.5,
//         elevation: 5
//       }
//     }
//   }
// );
//places={this.state.coffeeShops}
{
  /* <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 34.058803,
            longitude: -118.337986,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: 34.064029, longitude: -118.398768 }}
            title={"marker.title"}
            description={"desss"}
          />
        </MapView>
        <View style={styles.box1}></View>
        <View style={styles.box2}></View> */
}
