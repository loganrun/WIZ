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
import Ad from "../components/Ads"
//import ContentArea from "../components/ContentArea";
//var ad = require("../assets/ad.png");

//const SCREEN_HEIGHT = Dimensions.get("window").height;
//const SCREEN_WIDTH = Dimensions.get("window").width;

let contentMarginTopAnim = new Animated.Value(200);
let mapTopMarginAnim = new Animated.Value(-250);

class Places extends Component {
  // componentWillMount() {
  //   this.moveAnimation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 20 });
  // }

  constructor(props) {
    super(props);
    // this.handleDirections = this.handleDirections.bind(this);
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
    let curLat = this.props.navigation.getParam("currentLat");
    let curLon = this.props.navigation.getParam("currentLon");
    //console.log(curLat);
    let longitude = item.coordinates.longitude;
    let latitude = item.coordinates.latitude;
    let name = item.name;
    let phone = item.display_phone;
    let address1 = item.location.address1;
    let address2 = item.location.address2;
    let city = item.location.city;
    let price = item.price;
    let rating = item.rating;

    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              height: 1000,
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
            <ContentArea item={item} />
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}
export default Places;

class ContentArea extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDirections = props => {
    showLocation({
      latitude: this.props.item.coordinates.latitude,
      longitude: this.props.item.coordinates.longitude,
      title: this.props.item.name
    });
  };

  render() {
    let item = this.props.item;
    let longitude = item.coordinates.longitude;
    let latitude = item.coordinates.latitude;
    let name = item.name;
    let phone = item.display_phone;
    let address1 = item.location.address1;
    let address2 = item.location.address2;
    let city = item.location.city;
    let price = item.price;
    let rating = item.rating;

    return (
      <Animated.View style={styles.Card}>
        <TouchableOpacity
          onPress={() => {
            Animated.timing(contentMarginTopAnim, {
              toValue: 200,
              duration: 400
              //useNativeDriver: true
            }).start();

            Animated.timing(mapTopMarginAnim, {
              toValue: -250,
              duration: 400
              //useNativeDriver: true
            }).start();
          }}
        >
          <Card style={{ paddingBottom: 10 }}>
            <CardItem>
              <Left
                style={{
                  flexDirection: 'column',
                  alignItems: "flex-start",
                  paddingHorizontal: 10
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>{name}</Text>
                <Text>
                  {address1} {address2}
                </Text>
                <Text>{city}</Text>
                <Text>{phone}</Text>
                <Text>{price}</Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={rating}
                  starSize={12}
                  fullStarColor={"orange"}
                  emptyStarColor={"orange"}
                />
              </Left>
              <Button
                style={{
                  marginTop: 25,
                  marginRight: 10,
                  backgroundColor: "red",
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
        <Ad/>
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
    backgroundColor: "#fff" //"#F5F5F5"
  }
});
