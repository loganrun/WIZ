import React from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import AuthHome from "./Auth_Home";
import Login from "./Auth_Login";
import Reset from "./Auth_Reset";
import SignUp from "./Auth_Reg";
import Routes from "./Routes";
import AuthLoading from '../screens/AuthLoading'


const AuthStackNavigator = createStackNavigator({
  Home: AuthHome,
  Login: Login,
  Reset: Reset,
  SignUp: SignUp
});

const switchNavigator = createSwitchNavigator({
  Main: Routes,
  Auth: AuthStackNavigator,
  AuthLoading:  AuthLoading
},
{
  initialRouteName: 'Main'
}

);

export default createAppContainer(switchNavigator);
