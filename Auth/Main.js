import React from "react";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import AuthHome from "./Auth_Home";
import Login from "./Auth_Login";
import Reset from "./Auth_Reset";
import SignUp from "./Auth_Reg";
import Routes from "./Routes";
import AuthLoading from "../screens/AuthLoading";
import OnBoard1 from "../screens/onboard1";
import OnBoard2 from "../screens/onboard2";
import OnBoard3 from "../screens/onboard3";
import options from "../components/Options"

const AuthStackNavigator = createStackNavigator({
  Home: AuthHome,
  Login: Login,
  Reset: Reset,
  SignUp: SignUp
});


const OnBoardStackNavigator = createStackNavigator({
  Board1: OnBoard1,
  Board2: OnBoard2,
  Board3: OnBoard3
});
const OnBoardTabNavigator = createBottomTabNavigator(
  {
    
    Page1: {
      screen: OnBoard1
    },
    Page2: {
      screen: OnBoard2
    },
    Page3: {
      screen: OnBoard3
    }
  },

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
 );

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Main: Routes,
    Auth: AuthStackNavigator,
    OnBoard: OnBoardTabNavigator
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(switchNavigator);
