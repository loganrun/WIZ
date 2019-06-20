import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Explore from "../screens/Explore";
import Places from "../screens/Places";
import Favorites from "../screens/Favorites";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Login from "../screens/Login";
import ResSign from "../screens/ResSign";
import SignUp from "../screens/SignUp";
import Bathroom from "../screens/Bathroom";
import Pee from "../screens/Pee";
import BathMap from "../screens/BathMap"

const HomeStackNavigator = createStackNavigator({
  Home: Home,
  Login: Login,
  ResSign: ResSign,
  SignUp: SignUp
});
const AppStackNavigator = createStackNavigator({
  Explore: Explore,
  Places: Places
});
const BathStackNavigator = createStackNavigator({
  Bathroom: Bathroom,
  Pee: Pee,
  BathMap:  BathMap
});

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: HomeStackNavigator
      },
      Bathroom: {
        screen: BathStackNavigator
      },
      Food: {
        screen: AppStackNavigator
      },
      Favorites: {
        screen: Favorites
      }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = Ionicons;
          let iconName;
          if (routeName === "Home") {
            iconName = `ios-home`;
          } else if (routeName === "Bathroom") {
            iconName = `ios-search`;
          } else if (routeName === "Food") {
            iconName = `ios-restaurant`;
          } else if (routeName === "Favorites") {
            iconName = `ios-heart`;
          }

          // You can return any component that you like here!
          return <IconComponent name={iconName} size={25} color={tintColor} />;
        }
      }),
      tabBarOptions: {
        activeTintColor: "orange",
        inactiveTintColor: "gray"
      }
    }
  )
);
