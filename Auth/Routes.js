import React from "react";
import { Platform, Dimensions } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import Explore from "../screens/Explore";
import Places from "../screens/Places";
import Favorites from "../screens/Favorites";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
//import Home from "../screens/Home";
import Login from "../Auth/Auth_Login";
//import ResSign from "../screens/ResSign";
//import Bathroom from "../screens/Bathroom";
import Pee from "../screens/Pee";
import BathMap from "../screens/BathMap";
import AuthHome from "./Auth_Home";
import Reset from "../Auth/Auth_Reset";
import SignUp from "../Auth/Auth_Reg";
import AddBath from "../screens/AddBath";
import Contact from "../screens/ContactUs"
import Logo from "../components/Logo"
import Logo2 from "../components/Logo2"
import Logo3 from "../components/Logo3"
import Invite from "../screens/invite"
import Problem from "../screens/Problem"



const Width = Dimensions.get("window").width;
const DrawerConfig = {
  drawerWidth: Width * 0.8,
  drawerBackgroundColor: "#f5f5f5", 
  overlayColor: 0
};

const BathStackNavigator = createStackNavigator({
  BathMap: {
    screen: BathMap,
    navigationOptions: ({ navigation }) => {

      if(Platform.OS === "ios"){
      return {
        
        headerTitle: ()=><Logo2 navigation={navigation}/>,
        
      };
    }else{
      return {
         
        headerTitle: ()=><Logo3 navigation={navigation}/>,
    
      };


    }
    }
  },
  Pee: Pee
});

// const HomeStackNavigator = createStackNavigator({
//   Home: Home,
//   Login: Login,
//   ResSign: ResSign,
//   SignUp: SignUp
// });
const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: AuthHome,
    navigationOptions: ({ navigation }) => {
      return {
        // headerLeft: (
        //   <Ionicons
        //     style={{ padding: 10 }}
        //     onPress={() => navigation.openDrawer()}
        //     name='md-menu'
        //     size={30}
        //     color={"#fff"}
        //   />
        // ),
        headerTitle: ()=><Logo/>,
        //title: "LOGIN",
        // headerStyle: {
        //   backgroundColor: "#3480CB",//"#52AEA0",
        //   elevation: 0
        // },
        //headerTintColor: "#fff",
        // headerTitleStyle: {
        //   fontWeight: "bold"
        // }
      };
    }
  },
  Reset: Reset,
  SignUp: SignUp
});
const AddBathStackNavigator = createStackNavigator({
  AddBath: {
    screen: AddBath,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            style={{ padding: 10 }}
            onPress={() => navigation.openDrawer()}
            name='md-menu'
            size={30}
            color={"#fff"}
          />
        ),
        title: "Add Restroom",
        headerStyle: {
          backgroundColor: "#3480CB",//"#52AEA0",
          elevation: 0
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };
    }
  },
});
const ContactStackNavigator = createStackNavigator({
  Contact: {
    screen: Contact,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            style={{ padding: 10 }}
            onPress={() => navigation.openDrawer()}
            name='md-menu'
            size={30}
            color={"#fff"}
          />
        ),
        title: "Contact Us",
        headerStyle: {
          backgroundColor: "#3480CB",//"#52AEA0",
          elevation: 0
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };
    }
  },
});
const InviteStackNavigator = createStackNavigator({
  Invite: {
    screen: Invite,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            style={{ padding: 10 }}
            onPress={() => navigation.openDrawer()}
            name='md-menu'
            size={30}
            color={"#fff"}
          />
        ),
        title: "Invite a Friend",
        headerStyle: {
          backgroundColor: "#3480CB",//"#52AEA0",
          elevation: 0
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };
    }
  },
});
const ProblemStackNavigator = createStackNavigator({
  Problem: {
    screen: Problem,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            style={{ padding: 10 }}
            onPress={() => navigation.openDrawer()}
            name='md-menu'
            size={30}
            color={"#fff"}
          />
        ),
        title: "Report a Problem",
        headerStyle: {
          backgroundColor: "#3480CB",//"#52AEA0",
          elevation: 0
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };
    }
  },
});
const SignStackNavigator = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            style={{ padding: 10 }}
            onPress={() => navigation.openDrawer()}
            name='md-menu'
            size={30}
            color={"#fff"}
          />
        ),
        title: "SIGNUP",
        headerStyle: {
          backgroundColor: "#3480CB",//"#52AEA0",
          elevation: 0
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };
    }
  }
});
const AppStackNavigator = createStackNavigator({
  Explore: {
    screen: Explore,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            style={{ padding: 10 }}
            onPress={() => navigation.openDrawer()}
            name='md-menu'
            size={30}
            color={"#fff"}
          />
        ),
        title: "FOOD",
        headerStyle: {
          backgroundColor: "#3480CB",//"#52AEA0",
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

const FavoriteStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    // navigationOptions: ({ navigation }) => {
    //   return {
    //     headerLeft: (
    //       <Ionicons
    //         style={{ padding: 10 }}
    //         onPress={() => navigation.openDrawer()}
    //         name='md-menu'
    //         size={30}
    //         color={"#fff"}
    //       />
    //     ),
    //     title: "FAVORITES",
    //     headerStyle: {
    //       backgroundColor: "#3480CB",//"#52AEA0",
    //       elevation: 0
    //     },
    //     headerTintColor: "#fff",
    //     headerTitleStyle: {
    //       fontWeight: "bold"
    //     }
    //   };
    // }
  }
});

const AppTabNavigator = createBottomTabNavigator(
  {
    // Home: {
    //   screen: HomeStackNavigator
    // },
    Restroom: {
      screen: BathStackNavigator
    },
    Food: {
      screen: AppStackNavigator
    },
    Favorites: {
      screen: FavoriteStackNavigator
    }
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName = "";
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName === "Restroom") {
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
      activeTintColor: "#3480CB",//"#52AEA0",
      inactiveTintColor: "gray"
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          drawerLabel: "Home",
          drawerIcon: <Ionicons name='ios-home' size={30} color= "#3480CB" />,
          title: "Login",
          headerStyle: {
            backgroundColor: "#3480CB",//"#52AEA0",
            elevation: 0
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        };
      }
    },
    AddBath: {
      screen: AddBathStackNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          drawerLabel: "Add Restroom",
          drawerIcon: (
            <Ionicons name='ios-business' size={30} color="#3480CB" />
          ),
          title: "Add Restroom",
          headerStyle: {
            backgroundColor: "#3480CB",//"#52AEA0",
            elevation: 0
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        };
      }
    },
    // SignIn: {
    //   screen: LoginStackNavigator,
    //   navigationOptions: ({ navigation }) => {
    //     return {
    //       drawerLabel: "SignIn",
    //       drawerIcon: <Ionicons name='ios-key' size={30} color={"#d2b48c"} />,
    //       headerLeft: (
    //         <Ionicons
    //           style={{ padding: 10 }}
    //           onPress={() => navigation.openDrawer()}
    //           name='md-menu'
    //           size={30}
    //           color={"#fff"}
    //         />
    //       ),
    //       title: "Login",
    //       headerStyle: {
    //         backgroundColor: "#3480CB",//"#52AEA0",
    //         elevation: 0
    //       },
    //       headerTintColor: "#fff",
    //       headerTitleStyle: {
    //         fontWeight: "bold"
    //       }
    //     };
    //   }
    // },
    // SignUp: {
    //   screen: LoginStackNavigator,
    //   navigationOptions: ({ navigation }) => {
    //     return {
    //       drawerLabel: "SignUp",
    //       drawerIcon: (
    //         <Ionicons name='ios-person-add' size={30} color={"#d2b48c"} />
    //       ),
    //       headerLeft: (
    //         <Ionicons
    //           style={{ padding: 10 }}
    //           onPress={() => navigation.openDrawer()}
    //           name='md-menu'
    //           size={30}
    //           color={"#fff"}
    //         />
    //       ),
    //       title: "Sign Up",
    //       headerStyle: {
    //         backgroundColor: "#3480CB",//"#52AEA0",
    //         elevation: 0
    //       },
    //       headerTintColor: "#fff",
    //       headerTitleStyle: {
    //         fontWeight: "bold"
    //       }
    //     };
    //   }
    // },
    Favorites: {
      screen: FavoriteStackNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          drawerLabel: "Favorites",
          drawerIcon: <Ionicons name='ios-heart' size={30} color={"#3480CB"} />,
          headerLeft: (
            <Ionicons
              style={{ padding: 10 }}
              onPress={() => navigation.openDrawer()}
              name='md-menu'
              size={30}
              color={"#fff"}
            />
          ),
          title: "Sign Up",
          headerStyle: {
            backgroundColor: "#3480CB",//"#52AEA0",
            elevation: 0
          },
          headerTintColor: "#d2b48c",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        };
      }
    },
    Contact: {
      screen: ContactStackNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          drawerLabel: "Contact Us",
          drawerIcon: <Ionicons name='phone-portrait' size={30} color={"#3480CB"} />,
          headerLeft: (
            <Ionicons
              style={{ padding: 10 }}
              onPress={() => navigation.openDrawer()}
              name='md-menu'
              size={30}
              color={"#fff"}
            />
          ),
          title: "Contact Us",
          headerStyle: {
            backgroundColor: "#3480CB",//"#52AEA0",
            elevation: 0
          },
          headerTintColor: "#d2b48c",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        };
      }
    },
    Invite: {
      screen: InviteStackNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          drawerLabel: "Invite a Friend",
          drawerIcon: <Ionicons name='md-share' size={30} color={"#3480CB"} />,
          headerLeft: (
            <Ionicons
              style={{ padding: 10 }}
              onPress={() => navigation.openDrawer()}
              name='md-menu'
              size={30}
              color={"#fff"}
            />
          ),
          title: "Invite a Friend",
          headerStyle: {
            backgroundColor: "#3480CB",//"#52AEA0",
            elevation: 0
          },
          headerTintColor: "#d2b48c",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        };
      }
    },
    Problem: {
      screen: ProblemStackNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          drawerLabel: "Report A Problem",
          drawerIcon: <MaterialIcons name="report-problem" size={24} color={"#3480cb"} />,
          headerLeft: (
            <Ionicons
              style={{ padding: 10 }}
              onPress={() => navigation.openDrawer()}
              name='md-menu'
              size={30}
              color={"#fff"}
            />
          ),
          title: "Invite a Friend",
          headerStyle: {
            backgroundColor: "#3480CB",//"#52AEA0",
            elevation: 0
          },
          headerTintColor: "#d2b48c",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        };
      }
    }
  },
  DrawerConfig
);

export default createAppContainer(AppDrawerNavigator);
