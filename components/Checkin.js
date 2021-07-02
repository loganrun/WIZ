import React from 'react';
import {
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  AppState, View
} from 'react-native';
// import {Video} from 'expo-av';
import {
  Left,
  Right,
  Button,
  Card,
  CardItem,Body, Image
} from 'native-base';

import { showLocation } from 'react-native-map-link';
//import DialogInput from 'react-native-dialog-input';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { getDistance, getPreciseDistance } from 'geolib';
import Ad from './Ads';
import Ratings from './Rating';
let ranking = require('../assets/tprate.png')
// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const SCREEN_WIDTH = Dimensions.get("window").width;

const contentMarginTopAnim = new Animated.Value(200);
const mapTopMarginAnim = new Animated.Value(-250);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Card: {
    flex: 1,
    backgroundColor: '#fff', // "#f5f5f5"
  },
  image: {
    height: 71,//71, 
    width: 327, //327,
    marginTop: 20,
    marginRight: 20
  
  },
});

class Checkin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInAvailable: true,
      ctlat: 0,
      ctlng: 0,
      rslat: 0,
      rslng: 0,
      distanceLimit: 100,
      dd: 0,
      appState: AppState.currentState,
    };
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidMount() {
    this.checkRestroomDistance();
    AppState.addEventListener('change', this._handleAppStateChange);
    this._mounted = true
  }

  _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.checkRestroomDistance();
    }
    this.setState({ appState: nextAppState });
  };

  checkRestroomDistance = async () => {
    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
    const {latitude, longitude} = this.props.item;

    const distance = getPreciseDistance(
      { latitude: location.coords.latitude, longitude: location.coords.longitude },
      // { latitude: latitude + 0.00005, longitude: longitude + 0.00001},
      { latitude, longitude }
    );
    const checkInAvailable =  distance <= this.state.distanceLimit;
    this.setState({
      checkInAvailable,
      ctlat: location.coords.latitude,
      ctlng: location.coords.longitude,
      rslat: latitude,
      rslng: longitude,
      dd: distance,
    });

    this.updateDistance()
  }

  updateDistance = () =>{
    if(!this.state.checkInAvailable){
      setTimeout(this.checkRestroomDistance, 60000)
    }else{
      return
    }
  }

  handleDirections = (props) => {
    showLocation({
      latitude: this.props.item.latitude,
      longitude: this.props.item.longitude,
      title: this.props.item.name,
      googleForceLatLon: true,
      alwaysIncludeGoogle: true
    });
  };

  render() {
    const { item } = this.props;
    let longitude = item.longitude;
    let latitude = item.latitude;
    const { name } = item;
    const { ad } = item;
    // let phone = item.phone;
    const address = item.street;
    const { city } = item;
    const { comment } = item;
    const direction = item.directions;

    return (
      <Animated.View style={styles.Card}>
        <TouchableOpacity
          onPress={() => {
            Animated.timing(contentMarginTopAnim, {
              toValue: 200,
              duration: 400,
              // useNativeDriver: true
            }).start();

            Animated.timing(mapTopMarginAnim, {
              toValue: -250,
              duration: 400,
              // useNativeDriver: true
            }).start();
          }}
        >
          <Card style={{ paddingBottom: 10 }}>
            <CardItem>
              <Left 
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  //paddingHorizontal: 10,
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 20, textTransform: 'capitalize' }}>{name}</Text>
                <Text>{address}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Instructions
                </Text>
                <Text>{direction}</Text>
              </Left>
              <Right style={{flexDirection: 'column', alignItems: 'flex-end'}}>
              <Button
                style={{
                  //marginTop: 5,
                  marginRight: 10,
                  backgroundColor: '#3480CB', // "red",
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
                onPress={this.handleDirections}
              >
                <Text
                  style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign:'center',width: '100%' }}
                >
                  Directions
                </Text>
              </Button>
              <Button 
            style={this.state.checkInAvailable ? {
              marginTop: 10,
              backgroundColor: '#3480CB',
              paddingRight: 10,
              paddingLeft: 10,
              //width: 130
            } : {
              marginTop: 10,
              backgroundColor: '#ddd',
              paddingRight: 10,
              paddingLeft: 10,
              //width: 130
            }}
            onPress={() => {
              if (this.state.checkInAvailable) {
                this.props.doCheckIn();
              }
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign:'center',
                width: '100%'
              }}
            >
            Check In
          </Text>
        </Button>
              </Right>
              
            </CardItem>
          </Card>
        </TouchableOpacity>
        <Ad adInfo={ad} /> 
        
        <Text style={{
          marginTop: 10, marginBottom: 5, fontSize: 18, fontWeight: 'bold', marginLeft: 25,
        }}
        >
          RATE THE RESTROOM
        </Text>

        
        
        
      </Animated.View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  profileName: (user) => {
    dispatch(newUser(user));
  },
});

export default connect(null, mapDispatchToProps)(Checkin);