import React, { Component } from 'react';
import {
  View,
  Platform,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Left,
  Right,
  Card,
  CardItem,
} from 'native-base';

// import { showLocation } from "react-native-map-link";
import axios from 'axios';
import MapView, { Callout } from 'react-native-maps';
// import Maps from "../components/Maps";
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import restApi, { refugeeApi } from '../services/restroom';
import Over from '../components/Modal';
// import * as Analytics from 'expo-firebase-analytics'

const tprating = require('../assets/TPratings_5Stars.png');
// import { Callout } from "react-native-maps";
// var bathIcon = require("../assets/waba_icon_location.png");
// var restRoom= require("../assets/w_logo.png")

const styles = {
  container: {
    flex: 1,
    // width,
    // height
  },
  tool: {
    width: 250,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
};

const mapStyles = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#525f66',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#8fa7b3',
      },
      {
        lightness: '44',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#667780',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#333333',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#8fa7b3',
      },
      {
        gamma: 2,
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a3becc',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#7a8f99',
      }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#555555',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a3becc',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#7a8f99',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#555555',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#bbd9e9',
      },
      {
        gamma: 2,
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a3aeb5',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#bbd9e9',
      },
    ],
  },
];

var { CancelToken } = axios;

var cancel;
class BathMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bathroom: [],
      region: {
        longitude: -118.39,
        latitude: 34.022,
        latitudeDelta: 0.072, // {0.022},
        longitudeDelta: 0.070, // {0.021}
      },
      loading: false,
      mapMargin: 1,
      newUser: false,
    };
  }

  componentDidMount() {
    // this.initBathroom();
    // this.setState({ loading: true });
    this.useCheck();
    // Amplitude.logvent('MAP_OPENED');
  }

  useCheck = async () => {
    const { user } = this.props;
    const newUser = this.props.user;
    await this.setState({ newUser });
  }

  // onDoneAllSlides = () => {
  //   this.setState({ newUser: false });
  // };
  // onSkipSlides = () => {
  //   this.setState({ newUsher: false });
  // };

  setMargin=() => {
    this.setState({ mapMargin: 0 });
  }

  _renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  )

  getBathroomNearBy = (bathrooms) => {
    let count = 0;
    let ids = [0];
    let res = [];
    for (let i = 0 ; i < bathrooms.length; i++) {
      if (ids[bathrooms[i].id] !== 1) {
        ids[bathrooms[i].id] = 1;
        res[count++] = bathrooms[i];
      }
      if (count === 50) break;
    }
    return res;
  };

  loadBathroom = async () => {
    // let lat = this.state.lat;
    // let lon = this.state.lon;
    try {
      const params = {
        // page: 1,
        // per_page: 40,
        lat: this.state.region.latitude,
        lng: this.state.region.longitude,
      };

      cancel && cancel();
      try {
        const response = await restApi.get('/api/unverified', {
          params,
          cancelToken: new CancelToken(function executor(c){
            cancel = c;
          })
        });
        
        console.log('restroom loaded', response.data.length);
        const bathroom = this.getBathroomNearBy(response.data);
        // const response = await refugeeApi.get('/by_location', { params }, {
        //   cancelToken: new CancelToken((c) => {
        //     cancel = c;
        //   }),
        // });
        // const bathroom = response.data.map((restroom) => ({
        //   _id: restroom.id,
        //   location: {
        //     coordinates: [
        //       restroom.longitude,
        //       restroom.latitude,
        //     ],
        //     type: 'Point',
        //   },
        //   name: restroom.name,
        //   street: restroom.street,
        //   city: restroom.city,
        //   state: restroom.state,
        //   directions: restroom.directions,
        //   latitude: restroom.latitude,
        //   longitude: restroom.longitude,
        //   id: restroom.id,
        //   icon: 'https://storage.googleapis.com/whizz_pics/717114454-generic-location_icon.png',
        //   ad: 'https://storage.googleapis.com/whizz_pics/730115610-waba_20ad.png',
        //   logo: '',
        //   date: restroom.updated_at,
        //   __v: 0,
        //   dist: {
        //     calculated: restroom.calculated,
        //   },
        // }));
        this.setState({ bathroom });
      } catch (e) {
        console.log(e.message);
        if(axios.isCancel(e)) {
          console.log('post request cancelled1');
        }
      }

      this.setState({ loading: false });
    } catch (e) {
      console.log('error', e.message);
    }
  };

  onRegionChangeComplete = async (region) => {
    console.log(`---Region Change---`, region.latitude, region.longitude);
    // Amplitude.logvent('MAP_MOVED');
    await this.setState({ region });
    this.loadBathroom();
  }

  createMarkers= () => {
    const { navigate } = this.props.navigation;

    return this.state.bathroom.map((item, i) => {
      // const rating = Math.floor(Math.random() * Math.floor(5))

      if (Platform.OS === 'ios') {
        return (
          <MapView.Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            title={item.name}
            image={{ uri: item.icon }}
            onPress={() => {
              // Amplitude.logventWithProperties('MARKER_SELECT', markerProp);
            }}
          >
            <Callout onPress={() => {
              const eventProp = {
                id: item.id,
                name: item.name,
                street: item.street,
                city: item.city,
                dist: item.dist.calculated,
              };
              // Amplitude.logventWithProperties('RESTAURANT_SELECT', eventProp);
              this.props.navigation.navigate('Pee', {
                id: item.id,
                item,
                currentLat: this.state.region.latitude,
                currentLon: this.state.region.longitude,
              });
            }}
            >

              <View>
                <Card transparent style={{ flexDirection: 'row' }}>
                  <Left style={{ paddingLeft: 10 }}>
                    <Text style={{ width: 50, height: 80, marginTop: 15 }}><Image resizeMode="cover" source={{ uri: item.icon }} style={{ width: 50, height: 50 }} /></Text>
                  </Left>
                  <CardItem style={{ flexDirection: 'column' }}>
                    <Right style={{ flex: 1, alignItems: 'flex-start' }}>
                      <Text style={{
                        fontWeight: 'bold', textTransform: 'capitalize', color: '#173E81', fontSize: 17,
                      }}
                      >
                        {item.name}
                      </Text>
                      <Text>{item.street}</Text>

                      <Text style={{ width: 110, height: 25, marginTop: 5 }}><Image resizeMode="cover" source={tprating} style={{ width: 110, height: 23 }} /></Text>
                    </Right>
                  </CardItem>
                </Card>
              </View>
            </Callout>
          </MapView.Marker>
        );
      }
      return (
        <MapView.Marker
          key={item.id}
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
          title={item.name}
          image={{ uri: item.icon }}
           // pinColor={'yellow'}
          onPress={() => {
            const markerProp = {
              id: item.id,
              name: item.name,
              street: item.street,
              dist: item.dist.calculated,

            };
            // Amplitude.logventWithProperties('MARKER_SELECT', markerProp);
          }}
        >
          <Callout onPress={() => {
            const eventProp = {
              id: item.id,
              name: item.name,
              street: item.street,
              dist: item.dist.calculated,
            };

            // Amplitude.logventWithProperties('RESTAURANT_SELECT', eventProp);
            this.props.navigation.navigate('Pee', {
              id: item.id,
              item,
              currentLat: this.state.region.latitude,
              currentLon: this.state.region.longitude,
            });
          }}
          >

            <View>
              <Card transparent style={{ flexDirection: 'row' }}>
                <Left style={{ paddingLeft: 10 }}>
                  <Text style={{ width: 50, height: 80 }}><Image resizeMode="cover" source={{ uri: item.icon }} style={{ width: 50, height: 55 }} /></Text>
                </Left>
                <CardItem style={{ flexDirection: 'column' }}>
                  <Right style={{ flex: 1, alignItems: 'flex-start' }}>
                    <Text style={{
                      fontWeight: 'bold', textTransform: 'capitalize', color: '#173E81', fontSize: 17,
                    }}
                    >
                      {item.name}
                    </Text>
                    <Text>{item.id}</Text>
                    <Text style={{ width: 120, height: 30 }}><Image resizeMode="cover" source={tprating} style={{ width: 120, height: 25 }} /></Text>

                  </Right>
                </CardItem>
              </Card>
            </View>
          </Callout>
        </MapView.Marker>
      );
    });
  }

  render() {
    const { newUser, loading, mapMargin } = this.state;
    const { location } = this.props;
    if (newUser) {
      return (

        <Over closeModal={() => this.setState({ newUser: false })} />
      );
    } if (loading) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            size="large"
            color="blue"
            style={{
              paddingTop: 200,
              paddingLeft: 200,
              paddingRight: 200,
              paddingBottom: 400,
            }}
          />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <MapView
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.5064,
              longitudeDelta: 0.0636,
            }}// .1764,.1236
            style={{ flex: 1, marginTop: mapMargin }}
            provider="google"
            showsUserLocation
            showsMyLocationButton
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

const mapStateToProps = (state) => ({
  location: state.location.initlocation.loc,
  user: state.user.newUser.payload,
});

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
// <StarRating
// disabled={true}
// maxStars={5}
// rating={5}
// starSize={12}
// fullStarColor={"orange"}
// emptyStarColor={"orange"}
/// >//
