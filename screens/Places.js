import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
  Slider
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

import StarRating from "react-native-star-rating";
//import { MapView } from "expo";
import Maps from "../components/Maps";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
class Places extends Component {
  componentWillMount() {
    this.moveAnimation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 20 });
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
  render() {
    // const animatedHeight = {
    //   transform: this.animation.getTranslateTransform()
    // };
    let item = this.props.navigation.getParam("item");
    console.log(item);
    let longitude = item.coordinates.longitude;
    let latitude = item.coordinates.latitude;
    let name = item.name;
    let phone = item.display_phone;
    let address1 = item.location.address1;
    let address2 = item.location.address2;
    let city = item.location.city;
    let price = item.price;
    let rating = item.rating;

    // const data = this.props.navigation.getParam('places');
    // // const data = params ? params.data : null;
    // console.log(data)
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <View>
            <Maps
              style={{ flex: 1 }}
              latitude={latitude}
              longitude={longitude}
              latitudeDelta={0.022}
              longitudeDelta={0.021}
              name={name}
            />
          </View>
          <Animated.View style={styles.Card}>
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
                  <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                    {name}
                  </Text>
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
              </CardItem>
            </Card>
            <View
              style={{
                marginTop: 10,
                flex: 1,
                flexDirection: "row"
              }}
            >
              <View style={{ flex: 0.2 }} />
              <Card style={{ flex: 1 }}>
                <CardItem
                  style={{ justifyContent: "center", alignContent: "center" }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 14
                    }}
                  >
                    Place Ad Here
                  </Text>
                </CardItem>
              </Card>
              <View style={{ flex: 0.2 }} />
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingLeft: 20,
                fontSize: 14,
                fontWeight: "bold"
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
                    height: 100,
                    paddingHorizontal: 20
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                    Lorem ipsum dolor sit amet, ad sea idque populo iudicabit.
                    Eos elitr tollit ullamcorper ut, eu vis nonumy laudem
                    accusamus. Vix aliquid convenire persequeris at, doming
                    feugiat has ei. Eu quo debitis probatus, nonumes
                    theophrastus ut usu. Pro no porro aliquando, no sea homero
                    altera. Sonet molestiae est et, et dicat adipisci eam.
                  </Text>
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
              </CardItem>
              <CardItem>
                <Right
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    height: 100,
                    paddingHorizontal: 20
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                    Lorem ipsum dolor sit amet, ad sea idque populo iudicabit.
                    Eos elitr tollit ullamcorper ut, eu vis nonumy laudem
                    accusamus. Vix aliquid convenire persequeris at, doming
                    feugiat has ei. Eu quo debitis probatus, nonumes
                    theophrastus ut usu. Pro no porro aliquando, no sea homero
                    altera. Sonet molestiae est et, et dicat adipisci eam.
                  </Text>
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
              </CardItem>
              <CardItem>
                <Right
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    height: 100,
                    paddingHorizontal: 20
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                    Lorem ipsum dolor sit amet, ad sea idque populo iudicabit.
                    Eos elitr tollit ullamcorper ut, eu vis nonumy laudem
                    accusamus. Vix aliquid convenire persequeris at, doming
                    feugiat has ei. Eu quo debitis probatus, nonumes
                    theophrastus ut usu. Pro no porro aliquando, no sea homero
                    altera. Sonet molestiae est et, et dicat adipisci eam.
                  </Text>
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
              </CardItem>
            </Card>
          </Animated.View>
        </Content>
      </Container>
    );
  }
}
export default Places;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Card: {
    left: 0,
    right: 0,
    zIndex: 10,
    marginTop: 80,
    height: SCREEN_HEIGHT,
    backgroundColor: "#F5F5F5",
    position: "absolute"
  }
});
