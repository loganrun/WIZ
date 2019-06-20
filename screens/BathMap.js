import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
  Slider,
  TouchableOpacity,
  Image,AsyncStorage,ActivityIndicator
} from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Card,
  CardItem
} from "native-base";

import { showLocation } from "react-native-map-link";
//import StarRating from "react-native-star-rating";
//import { MapView } from "expo";
//import Maps from "../components/Maps";
import restApi from "../services/restroom";
//import ContentArea from "../components/ContentArea";
//var ad = require("../assets/ad.png");

//const SCREEN_HEIGHT = Dimensions.get("window").height;
//const SCREEN_WIDTH = Dimensions.get("window").width;

//let contentMarginTopAnim = new Animated.Value(200);
//let mapTopMarginAnim = new Animated.Value(-250);

class BathMap extends Component {

constructor(props) {
        super(props);
        this.state = {
            bathroom: [],
            loading: false,
            lat: null,
            lon: null,
            errorMessage: null,
            search: ""
          };
      }
      
componentWillMount() {
    this._getLocationAsync();
    this.setState({ loading: true });
     
   }

  

  static navigationOptions = {
    title: "DETAILS",
    headerStyle: {
      backgroundColor: "#3a455c",
      elevation: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  getLocation = async () => {
    let location = "";
    try {
      location = await AsyncStorage.getItem("location");
      console.log(location)
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return JSON.parse(location);
  };

  _getLocationAsync = async () => {

    let location = await this.getLocation();
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    this.setState({ lat });
    this.setState({ lon });
    await this.loadBathroom();
    //console.log(lat);
    //console.log(lon);
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
      let bathroom = response.data;
      this.setState({ bathroom: bathroom });
      await this.setState({ loading: false });
      console.log(bathroom)
    } catch (e) {
      console.log("error", e.message);
    }
  };

  render() {
    // const animatedHeight = {
    //   transform: this.animation.getTranslateTransform()
    // };
    // let item = this.props.navigation.getParam("item");
    // let curLat = this.props.navigation.getParam("currentLat");
    // let curLon = this.props.navigation.getParam("currentLon");
    // //console.log(curLat);
    // let longitude = item.longitude;
    // let latitude = item.latitude;
    // let name = item.name;

    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "#ffff",
              justifyContent: "center"
            }}
          >
            {this.state.loading ? (
              <ActivityIndicator
                size="large"
                color="blue"
                style={{
                  paddingTop: 200,
                  paddingLeft: 200,
                  paddingRight: 200,
                  paddingBottom: 400
                }}
              />
            ) : (
              false
            )}
          </View>
        
            {/* <Maps
              style={{ flex: 1 }}
              latitude={latitude}
              longitude={longitude}
              latitudeDelta={0.022}
              longitudeDelta={0.021}
              currLat={curLat}
              currLon={curLon}
              name={name}
            /> */}
          
      </View>
    );
  }
}
export default BathMap;

// class ContentArea extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   handleDirections = props => {
//     showLocation({
//       latitude: this.props.item.latitude,
//       longitude: this.props.item.longitude,
//       title: this.props.item.name
//     });
//   };

//   render() {
//     let item = this.props.item;
//     //console.log(item);
//     //let longitude = item.longitude;
//     //let latitude = item.latitude;
//     let name = item.name;
//     //let phone = item.phone;
//     let address = item.street;
//     let city = item.city;
//     let comment = item.comment;
//     let direction = item.directions;

//     return (
//       <Animated.View style={styles.Card}>
//         <TouchableOpacity
//           onPress={() => {
//             Animated.timing(contentMarginTopAnim, {
//               toValue: 200,
//               duration: 400
//               //useNativeDriver: true
//             }).start();

//             Animated.timing(mapTopMarginAnim, {
//               toValue: -250,
//               duration: 400
//               //useNativeDriver: true
//             }).start();
//           }}
//         >
//           <Card style={{ paddingBottom: 10 }}>
//             <CardItem>
//               <Right
//                 style={{
//                   flex: 1,
//                   alignItems: "flex-start",
//                   height: 100,
//                   paddingHorizontal: 20
//                 }}
//               >
//                 <Text style={{ fontWeight: "bold", fontSize: 14 }}>{name}</Text>
//                 <Text>{address}</Text>
//                 <Text>{city}</Text>
//                 <Text>{comment}</Text>
//                 <Text>{direction}</Text>
//               </Right>
//               <Button
//                 style={{
//                   marginTop: 25,
//                   marginRight: 10,
//                   backgroundColor: "red",
//                   paddingRight: 10,
//                   paddingLeft: 10
//                 }}
//                 onPress={this.handleDirections}
//               >
//                 <Text
//                   style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
//                 >
//                   Directions
//                 </Text>
//               </Button>
//             </CardItem>
//           </Card>
//         </TouchableOpacity>

//         <View
//           style={{
//             marginTop: 20,
//             flex: 1,
//             flexDirection: "row"
//           }}
//         >
//           <View style={{ flex: 0.2 }} />
//           <Card
//             style={{
//               flex: 1,
//               height: 300,
//               //margin: 30,
//               justifyContent: "center",
//               alignItems: "center"
//             }}
//           >
//             <Image source={ad} style={{ height: 320, width: 320 }} />
//           </Card>
//           <View style={{ flex: 0.2 }} />
//         </View>
//         <View
//           style={{
//             paddingTop: 10,
//             paddingLeft: 20,
//             fontSize: 14,
//             fontWeight: "bold",
//             marginTop: 20
//           }}
//         >
//           <Text style={{ fontSize: 16 }}>REVIEWS</Text>
//         </View>
//         <Card
//           style={{
//             marginTop: 10,
//             flex: 1
//           }}
//         >
//           <View style={{ paddingLeft: 10, paddingTop: 10 }}>
//             <Text style={{ fontWeight: "bold", fontSize: 14 }}>{name}</Text>
//           </View>
//           <CardItem>
//             <Right
//               style={{
//                 flex: 1,
//                 alignItems: "flex-start",
//                 height: 200,
//                 paddingHorizontal: 20
//               }}
//             >
//               <Text style={{ fontWeight: "bold", fontSize: 14 }}>
//                 Lorem ipsum dolor sit amet, ad sea idque populo iudicabit. Eos
//                 elitr tollit ullamcorper ut, eu vis nonumy laudem accusamus. Vix
//                 aliquid convenire persequeris at, doming feugiat has ei. Eu quo
//                 debitis probatus, nonumes theophrastus ut usu. Pro no porro
//                 aliquando, no sea homero altera. Sonet molestiae est et, et
//                 dicat adipisci eam.
//               </Text>
//               <Text>{address}</Text>
//               <Text>{city}</Text>
//             </Right>
//           </CardItem>
//         </Card>
//       </Animated.View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   Card: {
//     flex: 1,
//     backgroundColor: "#fff" //"#F5F5F5"
//   }
// });
