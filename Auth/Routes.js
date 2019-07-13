import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
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

const BathStackNavigator = createStackNavigator({
  BathMap: {  
  screen: BathMap,
  navigationOptions:({navigation}) =>{
    return{
      headerLeft: (
        <Ionicons style={{padding: 10}} onPress={() => navigation.openDrawer()} name="md-menu" size={30} color={"#fff"} />
      ),
      title: "WHIZZ",
    headerStyle: {
      backgroundColor: "#3a455c",
      elevation: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
    };
  }
},
  Pee: Pee,
  Bathroom: Bathroom
  
});
const HomeStackNavigator = createStackNavigator({
  Home: Home,
  Login: Login,
  ResSign: ResSign,
  SignUp: SignUp
});
const AppStackNavigator = createStackNavigator({
  Explore: {
    screen: Explore,
    navigationOptions:({navigation}) =>{
      return{
        headerLeft: (
          <Ionicons style={{padding: 10}} onPress={() => navigation.openDrawer()} name="md-menu" size={30} color={"#fff"} />
        ),
        title: "FOOD",
      headerStyle: {
        backgroundColor: "#3a455c",
        elevation: 0
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
      };
    }
},
  Places: Places
});

const AppTabNavigator = createBottomTabNavigator(
  {
    // Home: {
    //   screen: HomeStackNavigator
    // },
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
        let iconName="";
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
    },
  },
 
);

const MainStackNavigator = createStackNavigator(
  {
    MainStackNavigator: AppTabNavigator,
    navigationOptions:({navigation}) => {
      return {
        header: null
      }
    }
  }
  
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Main:{
      screen: AppTabNavigator,
      // navigationOptions:({navigation}) => {
      //     return {
      //       header: null
      //     }
      //   }
      
    }
  }
  
);




export default createAppContainer(AppDrawerNavigator);
