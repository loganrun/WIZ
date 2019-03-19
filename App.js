import React from "react";
import { StyleSheet, Text, View } from "react-native";
//import Map from "./components/Maps";
import { MapView } from "expo";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Explore from "./screens/Explore";
import Places from "./screens/Places";
import Favorites from "./screens/Favorites";
import { Ionicons } from "@expo/vector-icons";
import Home from "./screens/Home";
class App extends React.Component {
  state = {
    region: null,
    coffeeShops: []
  };
  render() {
    return <View style={styles.container} />;
  }
}

const HomeStackNavigator = createStackNavigator({
  Home: Home,
  Explore: Explore
});
const AppStackNavigator = createStackNavigator({
  Explore: Explore,
  Places: Places
});

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: HomeStackNavigator
      },
      Explore: {
        screen: AppStackNavigator
      },
      Favorites: {
        screen: Favorites
      }
    },
    {
      tabBarOptions: {
        activeTintColor: "red",
        inactiveTintColor: "grey",
        style: {
          backgroundColor: "white",
          borderTopWidth: 0,
          shadowOffset: { width: 5, height: 3 },
          shadowColor: "black",
          shadowOpacity: 0.5,
          elevation: 5
        }
      }
    }
  )
);

//const AppContainer = createAppContainer(AppBottomNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "flex-end"
  },
  box1: {
    height: "80%",
    width: "100%",
    backgroundColor: "blue"
  },
  box2: {
    flex: 1,
    backgroundColor: "green"
  }
});

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
