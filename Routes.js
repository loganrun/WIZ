import React from "react";
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
import Login from "./screens/Login";
import ResSign from "./screens/ResSign";
import SignUp from "./screens/SignUp";
import Bathroom from "./screens/Bathroom";
import Pee from "./screens/Pee";

const HomeStackNavigator = createStackNavigator({
  Home: Home,
  Login: Login,
  ResSign: ResSign,
  SignUp: SignUp,
  Explore: Explore,
  Favorites: Favorites,
  Bathroom: Bathroom,
  Places: Places,
  Pee: Pee
});
const AppStackNavigator = createStackNavigator({
  Explore: Explore,
  Home: Home,
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
      // navigationOptions: ({ navigation }) => ({
      //   tabBarIcon: ({ tintColor }) => {
      //     const { routeName } = navigation.state;

      //     let icon;
      //     switch (routeName) {
      //       case "Explore":
      //         icon = `md-search`;
      //         break;
      //       case "Favorite":
      //         icon = `md-heart`;
      //         break;
      //     }

      //     return <Ionicons name={icon} size={25} color={tintColor} />;
      //   }
      // }),

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
