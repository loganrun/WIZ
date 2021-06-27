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
  Image
} from "react-native";
//import {Video} from 'expo-av';
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
import StarRating from "react-native-star-rating";
//import { MapView } from "expo";
import Maps from "../components/Maps";
import { SafeAreaView } from 'react-navigation'
//import ContentArea from "../components/ContentArea";
//let ad = require("../assets/ad.png");
//let bathicon = require('../assets/bath3.png')
import Ad from "../components/Ads";
import Ratings from "../components/Rating"
import Checkin from "../components/Checkin"
//var vid = require("../assets/donut.mp4")

//const SCREEN_HEIGHT = Dimensions.get("window").height;
//const SCREEN_WIDTH = Dimensions.get("window").width;

let contentMarginTopAnim = new Animated.Value(200);
let mapTopMarginAnim = new Animated.Value(-250);

class Pee extends Component {
  // componentWillMount() {
  //   this.moveAnimation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 20 });
  // }

  constructor(props) {
    super(props);
    this.state = {
      showProfileInput: false,
      reviewModal: false,
      rating: 3,
      reviewContent: '',
    }
    // this.handleDirections = this.handleDirections.bind(this);
  }

  storeCheckedIn = async () => {
    try {
      const uID = await this.getUserId();
      const response = await restApi.post('/api/users/checkin', {
        userId: uID,
      });
      if (response.data) {
        Toast.show(response.data, {
          duration: Toast.durations.LONG,
        });
      }
    } catch (e) {
      console.log(e.response);
      // console.log(e.response);
    }
  }

  leaveReview = async() => {
    const { profileName } = this.props;
    if (profileName === '') {
      Toast.show('Your profile name is empty, Please click Check In', {
        duration: Toast.durations.LONG,
      });
    } else {
      this.setState({
        reviewModal: true,
      })
    }
  }

  saveReview = async() => {
    const { navigation } = this.props;
    const bathroomId = navigation.getParam('item')['_id'];
    const userId = await this.getUserId();
    const { rating } = this.state;
    const review = this.state.reviewContent;
    console.log(bathroomId);
    try {
      const response = await restApi.post('/api/bathReview', {
        bathroomId, userId, rating, review,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.data) {
        Toast.show(response.data, {
          duration: Toast.durations.LONG,
        });
      }
    } catch (e) {
      Toast.show(e.response.data.errors[0].msg, {
        duration: Toast.durations.LONG,
      });
    }
    this.setState({
      reviewModal: false,
    });
  }

  doCheckIn = async () => {
    const { profileName } = this.props;
    if (profileName === '') {
      const uID = await this.getUserId();
      try {
        const response = await restApi.get('/api/users', {
          params: {
            userId: uID
          }
        });
        if (response.data) {
          this.props.saveProfileName(response.data);
          this.setState({
            showProfileInput: false
          });
          this.storeCheckedIn();
        } else {
          this.setState({
            showProfileInput: true
          });
        }
      } catch (e) {
        // console.log(e.response);
        this.setState({
          showProfileInput: true
        });
      }
    } else {
      this.storeCheckedIn();
    }
  }

  getUserId = async () => {
    return await AsyncStorage.getItem("userToken");
  }

  submitProfileName = async (pname) => {
    const { navigation } = this.props;
    const uID = await this.getUserId();
    try {
      const response = await restApi.patch(`/api/users/${uID}`, {
        userName: pname,
      });
      this.props.saveProfileName(response.data);
      this.setState({
        showProfileInput: false,
      });
      this.doCheckIn();
    } catch (e) {
      if (e.response.data.errors) {
        this.setState({
          showProfileInput: false,
        });
        Toast.show(e.response.data.errors[0].msg, {
          duration: Toast.durations.LONG,
        });
      }
    }
  }



  static navigationOptions = {
    title: "DETAILS",
    headerStyle: {
      backgroundColor: "#3480CB",//"#52AEA0",
      elevation: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    // const animatedHeight = {
    //   transform: this.animation.getTranslateTransform()
    // };
    let item = this.props.navigation.getParam("item");
    //console.log(item)
    let curLat = this.props.navigation.getParam("currentLat");
    let curLon = this.props.navigation.getParam("currentLon");
    //console.log(curLat);
    let longitude = item.longitude;
    let latitude = item.latitude;
    let name = item.name;

    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              height: 1200,
              backgroundColor: "#fff"
            }}
          />
          <Animated.View
            style={{
              position: "absolute",
              top: mapTopMarginAnim,
              left: 0,
              width: "100%",
              zIndex: 0,
              height: 800,
              backgroundColor: "blue"
            }}
          >
            <Maps
              style={{ flex: 1 }}
              latitude={latitude}
              longitude={longitude}
              latitudeDelta={0.022}
              longitudeDelta={0.021}
              currLat={curLat}
              currLon={curLon}
              name={name}
              mapOnPress={() => {
                Animated.timing(contentMarginTopAnim, {
                  toValue: 400,
                  duration: 400
                }).start();

                Animated.timing(mapTopMarginAnim, {
                  toValue: -100,
                  duration: 400
                }).start();
              }}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              top: contentMarginTopAnim,
              left: 0,
              width: "100%",
              zIndex: 1
            }}
          >
            <Checkin item={item} sourceLat={curLat} sourceLon={curLon} />
          </Animated.View>
        </ScrollView>
      </View>
      </SafeAreaView>
    );
  }
}
export default Pee;

class ContentArea extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDirections = props => {
    showLocation({
      latitude: this.props.item.latitude,
      longitude: this.props.item.longitude,
      title: this.props.item.name,
      googleForceLatLon: true,
      alwaysIncludeGoogle: true
    });
  };

  render() {
    let item = this.props.item;
    //console.log(item);
    //let longitude = item.longitude;
    //let latitude = item.latitude;
    let name = item.name;
    let ad = item.ad
    //let phone = item.phone;
    let address = item.street;
    let city = item.city;
    let comment = item.comment;
    let direction = item.directions;

    return (
      <Animated.View style={styles.Card}>
        <TouchableOpacity
          onPress={() => {
            Animated.timing(contentMarginTopAnim, {
              toValue: 200,
              duration: 400,
              useNativeDriver: true
            }).start();

            Animated.timing(mapTopMarginAnim, {
              toValue: -250,
              duration: 400,
              useNativeDriver: true
            }).start();
          }}
        >
          <Card style={{ paddingBottom: 10 }}>
            <CardItem>
              <Left
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  paddingHorizontal: 10
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20, textTransform: 'capitalize'}}>{name}</Text>
                <Text>{address}</Text>
                <Text>{city}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  Instructions
                </Text>
                <Text>{direction}</Text>
              </Left>
              <Button
                style={{
                  marginTop: 25,
                  marginRight: 10,
                  backgroundColor: "#3480CB",//"red",
                  paddingRight: 10,
                  paddingLeft: 10
                }}
                onPress={this.handleDirections}
              >
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
                >
                  Directions
                </Text>
              </Button>
            </CardItem>
          </Card>
        </TouchableOpacity>
        <Ad adInfo= {ad}/>
      <Text style={{marginTop: 10, marginBottom: 5, fontSize: 18, fontWeight: "bold", marginLeft: 25}}>RATE THE RESTROOM</Text>
      <Ratings item={this.props.item}/>
        
        
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Card: {
    flex: 1,
    backgroundColor:  "#fff"//"#f5f5f5"
  }
});
