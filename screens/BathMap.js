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
import MapView from 'react-native-maps';
import { Ionicons } from "@expo/vector-icons";
//import Maps from "../components/Maps";
import restApi from "../services/restroom";
import {connect} from "react-redux"
var bathIcon = require("../assets/location_icon.png");
var restRoom= require("../assets/location_icon.png")


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
            
          };
      }
      

   componentDidMount() {
    //this.initBathroom();
    //this.setState({ loading: true });
  }
  
  setMargin=()=>{
    this.setState({mapMargin: 0});
  }

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
    } catch (e) {
      console.log("error", e.message);
    }
  };

  onRegionChangeComplete = async (region) =>{
    await this.setState({region})
    this.loadBathroom()
  }

  createMarkers= () => {
    const { navigate } = this.props.navigation;

    return this.state.bathroom.map((item, i) => {
      const rating = Math.floor(Math.random() * Math.floor(5))
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
          <MapView.Callout toolTip>
            <View>
                <Card transparent style={{flexDirection: 'row'}}>
                  <Left style={{paddingLeft: 10}}>
        <Text style={{width: 50, height: 80}}><Image resizeMode={'cover'} source={restRoom}style={{width: 50, height: 50}}/></Text>                  
        </Left> 
                  <CardItem style={{flexDirection: 'column'}}>
                    <Right style={{flex:1, alignItems: 'flex-start'}}>
                      <Text style={{fontWeight: 'bold',textTransform: 'capitalize', color: 'blue', fontSize: 17}}>{item.name}</Text>
                      <Text>{item.street}</Text>
                      <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={rating}
                  starSize={12}
                  fullStarColor={"orange"}
                  emptyStarColor={"orange"}
                />
                    </Right>
                  </CardItem>
                </Card>
                </View>
          </MapView.Callout>
        </MapView.Marker>
      );
    });

  }

  render() {
    
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
            initialRegion={{latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            latitudeDelta: 0.1764,
            longitudeDelta: 0.1236 }}
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
  location: state.location.initlocation.loc
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