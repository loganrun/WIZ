import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  Image,ActivityIndicator
} from "react-native";
 import {
   Left,
  Right,
   Icon,
   Card,
   CardItem,
   Row,
   Button
 } from "native-base";

//import { showLocation } from "react-native-map-link";
import StarRating from "react-native-star-rating";
import MapView,{Callout} from 'react-native-maps';
import { Ionicons } from "@expo/vector-icons";
//import Maps from "../components/Maps";
import restApi from "../services/restroom";
import {connect} from "react-redux"
import { SafeAreaView } from 'react-navigation'
import Intro from '../components/Slider'
import Over from '../components/Modal'
var tprating = require("../assets/TPratings_5Stars.png")
//import * as Analytics from 'expo-firebase-analytics'
import * as Amplitude from 'expo-analytics-amplitude'
//import { Callout } from "react-native-maps";
//var bathIcon = require("../assets/waba_icon_location.png");
//var restRoom= require("../assets/w_logo.png")



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
            mapMargin:  1,
            newUser: false
            
          };
      }
      

   componentDidMount() {
    //this.initBathroom();
    //this.setState({ loading: true });
    this.useCheck()
    Amplitude.logEvent("MAP_OPENED")
  }

  useCheck = async () =>{
  newUser = this.props.user
  await this.setState({ newUser: newUser })
  
  }
  // onDoneAllSlides = () => {
  //   this.setState({ newUser: false });
  // };
  // onSkipSlides = () => {
  //   this.setState({ newUsher: false });
  // };
  setMargin=()=>{
    this.setState({mapMargin: 0});
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }

  loadBathroom = async () => {
    //let lat = this.state.lat;
    //let lon = this.state.lon;
    try{

    
      let params = {
        //page: 1,
        //per_page: 40,
        lat: this.state.region.latitude,
        lng: this.state.region.longitude
      };

      let response = await restApi.get('/api/bathrooms',{ params });
    
        
      let bathroom = response.data;
      //console.log(bathroom)
      this.setState({ bathroom: bathroom });
     
      await this.setState({ loading: false });
    } catch (e) {
      console.log("error", e.message);
    }
  };
    
  

  onRegionChangeComplete = async (region) =>{
    Amplitude.logEvent("MAP_MOVED")
    await this.setState({region})
    this.loadBathroom()
  }

  createMarkers= () => {
    const { navigate } = this.props.navigation;

    return this.state.bathroom.map((item, i) => {
      //const rating = Math.floor(Math.random() * Math.floor(5))
      
      if(Platform.OS === 'ios'){
      return (
        <MapView.Marker
        key= {item.id}
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude
        }}
        title={item.name}
        image={{uri: item.icon}}
        onPress={() => {
          const markerProp = {
          id: item.id,
          name: item.name,
          street: item.street,
          city: item.city,
          dist: item.dist.calculated,

          }
          Amplitude.logEventWithProperties("MARKER_SELECT", markerProp)
          
        }}
        
        >
          <Callout onPress={() => {
            const eventProp = {
              id: item.id,
              name: item.name,
              street: item.street,
              city: item.city,
              dist: item.dist.calculated
            }
            Amplitude.logEventWithProperties("RESTAURANT_SELECT", eventProp)
          this.props.navigation.navigate("Pee", {
            id: item.id,
            item,
            currentLat: this.state.region.latitude,
            currentLon: this.state.region.longitude
          })}}
        
        >
        
            <View>
                <Card transparent style={{flexDirection: 'row'}}>
                  <Left style={{paddingLeft: 10}}>
        <Text style={{width: 50, height: 80, marginTop: 15}}><Image resizeMode={'cover'} source={{uri: item.icon}}style={{width: 50, height: 50}}/></Text>                  
        </Left> 
                  <CardItem style={{flexDirection: 'column'}}>
                    <Right style={{flex:1, alignItems: 'flex-start'}}>
                      <Text style={{fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 17}}>{item.name}</Text>
                      <Text>{item.street}</Text>
                      
                <Text style={{width: 110, height: 25, marginTop: 5}}><Image resizeMode={'cover'} source={tprating}style={{width:110, height: 23}}/></Text>
                    </Right>
                  </CardItem>
                </Card>
                </View>
          </Callout>
        </MapView.Marker>
      );
        }else{
          return (
            <MapView.Marker
            key= {item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude
            }}
            title={item.name}
            image={{uri: item.icon}}
           // pinColor={'yellow'}
            onPress={() => {
              const markerProp = {
              id: item.id,
              name: item.name,
              street: item.street,
              dist: item.dist.calculated,

              }
              Amplitude.logEventWithProperties("MARKER_SELECT", markerProp)
              }}
            
            >
              <Callout onPress={() => {
              const eventProp = {
                id: item.id,
                name: item.name,
                street: item.street,
                dist: item.dist.calculated
              }
              
              Amplitude.logEventWithProperties("RESTAURANT_SELECT", eventProp)
              this.props.navigation.navigate("Pee", {
                id: item.id,
                item,
                currentLat: this.state.region.latitude,
                currentLon: this.state.region.longitude
              })}}
            
            >
            
                <View>
                    <Card transparent style={{flexDirection: 'row'}}>
                      <Left style={{paddingLeft: 10}}>
            <Text style={{width: 50, height: 80}}><Image resizeMode={'cover'} source={{uri: item.icon}}style={{width: 50, height: 55}}/></Text>                  
            </Left> 
                      <CardItem style={{flexDirection: 'column'}}>
                        <Right style={{flex:1, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 17}}>{item.name}</Text>
                          <Text>{item.street}</Text>
                          <Text style={{width: 120, height: 30}}><Image resizeMode={'cover'} source={tprating}style={{width:120, height: 25}}/></Text>
                          
                        </Right>
                      </CardItem>
                    </Card>
                    </View>
              </Callout>
            </MapView.Marker>
          );
        }
    });

  }

  render() {
   
    
    if (this.state.newUser){
      return(

        <Over closeModal= { () => 
             this.setState({ newUser: false })
           }/>
      )

    } else if (this.state.loading){
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
      <SafeAreaView style={styles.container}>
            <View style={styles.container}>
            <MapView
            initialRegion={{latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            latitudeDelta: 0.5064,
            longitudeDelta: 0.0636 }}//.1764,.1236
              style={{flex:1, marginTop:this.state.mapMargin}}
              provider="google"
              showsUserLocation={true}
              showsMyLocationButton={true}
              onMapReady={this.setMargin}
              onRegionChangeComplete={this.onRegionChangeComplete}
              customMapStyle={mapStyles}
            >
              {this.createMarkers()}
            </MapView>
            </View>
      </SafeAreaView>
          
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

const mapStateToProps= state =>{
return{
  location: state.location.initlocation.loc,
  user: state.user.newUser.payload
}
}

const mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#525f66"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#8fa7b3"
            },
            {
                "lightness": "44"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#667780"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#333333"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#8fa7b3"
            },
            {
                "gamma": 2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a3becc"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#7a8f99"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#555555"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a3becc"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#7a8f99"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#555555"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#bbd9e9"
            },
            {
                "gamma": 2
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a3aeb5"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#bbd9e9"
            }
        ]
    }
]

export default connect(mapStateToProps)(BathMap);



// getLocation = async () => {
  //   let location = "";
  //   try {
  //     location = await AsyncStorage.getItem("location");
  //    //console.log(location)
  //     //console.log(location)
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error.message);
  //   }
  //   return JSON.parse(location);
  // };

  // initBathroom = async () => {
  //   let bathroom = await this.getBathroom();
  //   this.setState({ bathroom: bathroom });
  //   //console.log(this.state.bathroom)
  //   this._getLocationAsync();
  //   //console.log(this.state.lat)
  //   //console.log(this.state.lon)
  //   this.setState({ loading: false });
  // };

  // _getLocationAsync = async () => {
    

  //   let location = await this.getLocation();
  //   let lat = location.coords.latitude;
  //   let lon = location.coords.longitude;
  //   this.setState({ latitude: lat });
  //   this.setState({ lon });
  //   //await this.loadBathroom();
  //   //console.log(lat);
  //   //console.log(lon);
  // };

  // getBathroom = async () => {
  //   let bathroom = "";
  //   try {
  //     bathroom = await AsyncStorage.getItem("bathroom");
  //     //console.log(bathroom)
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error.message);
  //   }
  //   return JSON.parse(bathroom);
  // };
  //<StarRating
                  //disabled={true}
                  //maxStars={5}
                  //rating={5}
                  //starSize={12}
                  //fullStarColor={"orange"}
                  //emptyStarColor={"orange"}
                ///>//