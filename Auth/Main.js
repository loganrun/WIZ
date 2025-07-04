import React from "react";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import AuthHome from "./Auth_Home";
import Login from "./Auth_Login";
import Reset from "./Auth_Reset";
import SignUp from "./Auth_Reg";
import Routes from "./Routes";
import AuthLoading from "../screens/AuthLoading";
import Phone from "./Auth_Phone"


const AuthStackNavigator = createStackNavigator({
  Home: AuthHome,
  Login: Login,
  Reset: Reset,
  SignUp: SignUp,
  Phone: Phone
});


//   options

//   // {
//   //   defaultNavigationOptions: ({ navigation }) => ({
//   //     tabBarIcon: ({ tintColor }) => {
//   //       const { routeName } = navigation.state;
//   //       let IconComponent = Ionicons;
//   //       let iconName = "";
//   //       if (routeName === "Home") {
//   //         iconName = `ios-home`;
//   //       } else if (routeName === "Restroom") {
//   //         iconName = `ios-search`;
//   //       } else if (routeName === "Food") {
//   //         iconName = `ios-restaurant`;
//   //       } else if (routeName === "Favorites") {
//   //         iconName = `ios-heart`;
//   //       }

//   //       // You can return any component that you like here!
//   //       return <IconComponent name={iconName} size={25} color={tintColor} />;
//   //     }
//   //   }),
//   //   tabBarOptions: {
//   //     activeTintColor: "#3480CB",//"#52AEA0",
//   //     inactiveTintColor: "gray"
//   //   }
//   // }
// );

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Main: Routes,
    Auth: AuthStackNavigator
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(switchNavigator);
