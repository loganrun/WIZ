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
  TouchableHighlight,
  TouchableOpacity,
  Image,AsyncStorage,ActivityIndicator
} from "react-native";
 import {
//   Container,
//   Content,
//   Header,
   Left,
  Right,
   Icon,
//   Button,
//   Body,
   Card,
   CardItem,
   Row,
   Button
 } from "native-base";

//import { showLocation } from "react-native-map-link";
import StarRating from "react-native-star-rating";
import { MapView } from "expo";
import { Ionicons } from "@expo/vector-icons";
//import Maps from "../components/Maps";
import restApi from "../services/restroom";
var bathIcon = require("../assets/bath3.png");
var button5 = require("../assets/button.png")
//import ContentArea from "../components/ContentArea";
//var ad = require("../assets/ad.png");

// const height = Dimensions.get("window").height;
// const width = Dimensions.get("window").width;

//let contentMarginTopAnim = new Animated.Value(200);
//let mapTopMarginAnim = new Animated.Value(-250);

class BathMap extends Component {

constructor(props) {
        super(props);
        this.state = {
            bathroom: [],
            region: {
              longitude: -118.39,
              latitude: 34.022,
              latitudeDelta: 0.072,//{0.022},
              longitudeDelta: 0.070,//{0.021}
            },
            loading: false,
            lat: null,
            lon: null,
            errorMessage: null,
            search: "",
            mapMargin:  1
            //color:  ['green', 'yellow', 'tan'], //['#13DE25','#FFFF08','#C26138'],
            //pick: ''
          };

          //this.markerClick = this.markerClick.bind(this);
      }
      
// componentWillMount() {
//     this._getLocationAsync();
//     this.setState({ loading: true });
     
//    }
   componentDidMount() {
    this.initBathroom();
    this.setState({ loading: true });
  }
  
  setMargin=()=>{
    this.setState({mapMargin: 0});
  }

  static navigationOptions = ({ navigation }) => {
    //const { navigate } = this.props.navigation;
    return {
      headerRight: (
        <Ionicons style={{padding:10}} name='ios-list' size={30} color={"#fff"}/>
      ),
    };
  };

  // static navigationOptions = {
  //   // title: "WHIZZ",
  //   // headerStyle: {
  //   //   backgroundColor: "#3a455c",
  //   //   elevation: 0
  //   // },
  //   // headerTintColor: "#fff",
  //   // headerTitleStyle: {
  //   //   fontWeight: "bold"
  //   // }
  //   headerRight:(
  //     <Ionicons style={{padding:10}} onPress={()=>this.props.navigation.navigate('Bathroom')} name='ios-list' size={30} color={"#fff"}/>

  //   ),
  // };

  getLocation = async () => {
    let location = "";
    try {
      location = await AsyncStorage.getItem("location");
     //console.log(location)
      //console.log(location)
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return JSON.parse(location);
  };

  initBathroom = async () => {
    let bathroom = await this.getBathroom();
    this.setState({ bathroom: bathroom });
    //console.log(this.state.bathroom)
    this._getLocationAsync();
    //console.log(this.state.lat)
    //console.log(this.state.lon)
    this.setState({ loading: false });
  };

  _getLocationAsync = async () => {

    let location = await this.getLocation();
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    this.setState({ latitude: lat });
    this.setState({ lon });
    //await this.loadBathroom();
    //console.log(lat);
    //console.log(lon);
  };

  getBathroom = async () => {
    let bathroom = "";
    try {
      bathroom = await AsyncStorage.getItem("bathroom");
      //console.log(bathroom)
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return JSON.parse(bathroom);
  };

  loadBathroom = async () => {
    //let lat = this.state.lat;
    //let lon = this.state.lon;

    try {
      let params = {
        page: 1,
        per_page: 50,
        lat: this.state.region.latitude,
        lng: this.state.region.longitude
      };

      let response = await restApi.get("/by_location", { params });
      let bathroom = response.data;
      this.setState({ bathroom: bathroom });
     
      await this.setState({ loading: false });
      //console.log(this.state.bathroom)
    } catch (e) {
      console.log("error", e.message);
    }
  };

  onRegionChangeComplete = async (region) =>{
    await this.setState({region})
    //console.log(this.state.region.latitude)
    this.loadBathroom()
  }

  // markerClick = () =>{
  //   console.log("click")
  // }

  

  createMarkers= () => {
    const { navigate } = this.props.navigation;

    return this.state.bathroom.map((item, i) => {
      // colorPick = () => {
      //   this.setState({
      //     pick: this.state.color[Math.floor(Math.random()*this.state.color.length)]
      //   })

      //   console.log(this.state.pick)
        
      // }
      // //const color = this.colorPick()
      // //console.log(color)
      return (
        <MapView.Marker
        key= {item.id}
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude
        }}
        title={item.name}
        image={bathIcon}
       // pinColor={'yellow'}
        onCalloutPress={() => {
          this.props.navigation.navigate("Pee", {
            id: item.id,
            item,
            currentLat: this.state.region.latitude,
            currentLon: this.state.region.longitude
          })}}
        
        >
          <MapView.Callout tooltip={true}>
                <Card style={{flexDirection: 'row'}}>
                  <Left style={{paddingLeft: 10}}>
                    <View>
                      <Button style={{width: 50, height: 50, backgroundColor: '#13DE25'}}>
                        <Text style={{fontWeight:'bold', fontSize: 35, color: 'white', paddingLeft: 15}}>5</Text>
                        </Button>
                        </View>
                        </Left>
                  <CardItem style={{flexDirection: 'column'}}>
                    <Right style={{flex:1, alignItems: 'flex-start'}}>
                      <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                      <Text>{item.street}</Text>
                    </Right>
                  </CardItem>
                </Card>
          </MapView.Callout>
        </MapView.Marker>
      );
    });

  }


  render() {
    
    // let item = this.props.navigation.getParam("item");
    // let curLat = this.props.navigation.getParam("currentLat");
    // let curLon = this.props.navigation.getParam("currentLon");
    // //console.log(curLat);
    // let longitude = item.longitude;
    // let latitude = item.latitude;
    // let name = item.name;

    //const { navigate } = this.props.navigation;
   

    
    if (this.state.loading) {
    return (
      <View style={{ flex: 1 }}>
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
      </View>
    );
              }
    return (
     
            <View style={styles.container}>
            <MapView
            initialRegion={this.state.region}
              style={{flex:1, marginTop:this.state.mapMargin}}
              //latitude={this.state.lat}
              //longitude={this.state.lon}
              //latitudeDelta={0.072}//{0.022}
              //longitudeDelta={0.070}//{0.021}
              provider="google"
              showsUserLocation={true}
              showsMyLocationButton={true}
              onMapReady={this.setMargin}
              onRegionChangeComplete={this.onRegionChangeComplete}
             //currLat={this.state.lat}
              //currLon={this.state.lon}
              //name={name}
            >

              {this.createMarkers()}
            </MapView>
            </View>
          
    );
  }
}

const styles = {
  container: {
    flex: 1,
    //width,
    //height
  },
  tool:{
    width: 250,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 10
  }
};

export default BathMap;

{/* <StarRating 
                disabled={true}
                maxStars={5}
                rating={5}
                starSize={12}
                fullStarColor={"orange"}
                emptyStarColor={"orange"}
              /> */}
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
