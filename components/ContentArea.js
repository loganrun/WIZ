import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image
} from "react-native";
import { Card, CardItem, Right, Button } from "native-base";
import StarRating from "react-native-star-rating";
import { showLocation } from "react-native-map-link";
var ad = require("../assets/ad.png");
let contentMarginTopAnim = new Animated.Value(400);
let mapTopMarginAnim = new Animated.Value(-100);

class ContentArea extends Component {
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
              <Right
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  height: 100,
                  paddingHorizontal: 20
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
              </Right>
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
              <Text>
                {address1} {address2}
              </Text>
              <Text>{city}</Text>
            </Right>
          </CardItem>
        </Card>
      </Animated.View>
    );
  }
}
export default ContentArea;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Card: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  }
});
