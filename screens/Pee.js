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
//import ContentArea from "../components/ContentArea";
var ad = require("../assets/ad.png");
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
    // this.handleDirections = this.handleDirections.bind(this);
  }

  static navigationOptions = {
    title: "DETAILS",
    headerStyle: {
      backgroundColor: "#52AEA0",
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
    let longitude = item.longitude;
    let latitude = item.latitude;
    let name = item.name;

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
export default Pee;

class ContentArea extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDirections = props => {
    showLocation({
      latitude: this.props.item.latitude,
      longitude: this.props.item.longitude,
      title: this.props.item.name
    });
  };

  render() {
    let item = this.props.item;
    //console.log(item);
    //let longitude = item.longitude;
    //let latitude = item.latitude;
    let name = item.name;
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
                  flexDirection: "column",
                  alignItems: "flex-start",
                  paddingHorizontal: 10
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
                <Text>{address}</Text>
                <Text>{city}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  Directions
                </Text>
                <Text>{direction}</Text>
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

        <View
          style={{
            marginTop: 20,
            flex: 1,
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 0.2 }} />
          <Card
            style={{
              flex: 1,
              height: 300,
              //margin: 30,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={ad} style={{ height: 320, width: 320 }} />
            {/* <Video
            source={vid} rate={1.0} isMuted={false} resizeMode="cover" shouldPlay isLooping style={{with: 320, height:320}}/> */}
          </Card>
          <View style={{ flex: 0.2 }} />
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingLeft: 20,
            fontSize: 14,
            fontWeight: "bold",
            marginTop: 20
          }}
        >
          <Text style={{ fontSize: 16 }}>REVIEWS</Text>
        </View>
        <Card
          style={{
            marginTop: 10,
            flex: 1
          }}
        >
          <View style={{ paddingLeft: 10, paddingTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>{name}</Text>
          </View>
          <CardItem>
            <Right
              style={{
                flex: 1,
                alignItems: "flex-start",
                height: 200,
                paddingHorizontal: 20
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                Lorem ipsum dolor sit amet, ad sea idque populo iudicabit. Eos
                elitr tollit ullamcorper ut, eu vis nonumy laudem accusamus. Vix
                aliquid convenire persequeris at, doming feugiat has ei. Eu quo
                debitis probatus, nonumes theophrastus ut usu. Pro no porro
                aliquando, no sea homero altera. Sonet molestiae est et, et
                dicat adipisci eam.
              </Text>
              <Text>{address}</Text>
              <Text>{city}</Text>
            </Right>
          </CardItem>
        </Card>
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
