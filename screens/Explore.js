import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
//import { Ionicons } from "@expo/vector-icons";
import { Location, Permissions, MapView } from "expo";
import api from "../services/Api";

import {
  Container,
  Content,
  Left,
  Right,
  Icon,
  Header,
  Input,
  Item,
  Card,
  CardItem
} from "native-base";

import StarRating from "react-native-star-rating";

//import Result from "../components/Results";

class Explore extends Component {
  state = {
    business: [],
    loading: false,
    lat: null,
    lon: null,
    errorMessage: null
  };
  componentDidMount() {
    this._getLocationAsync();
    // this.startHeaderHeight = 80;
    // if (Platform.OS == "android") {
    //   this.startHeaderHeight = 65 + StatusBar.currentHeight;
    // }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    this.setState({ lat });
    this.setState({ lon });
    await this.loadBusiness();
    //await this.getVenues();
  };

  loadBusiness = async () => {
    this.setState({ loading: true });

    let lat = this.state.lat;
    let lon = this.state.lon;
    //let price = this.state.price;

    try {
      let params = {
        term: "restaurants",
        latitude: lat,
        longitude: lon,
        radius: 10000,
        limit: 20
      };

      let response = await api.get("/search", { params });
      let { businesses } = response.data;
      //let { total } = response.data;

      this.setState({ business: businesses });
      //console.log(this.state.business);
      //this.setState({ total: total });

      await this.setState({ loading: false });
    } catch (e) {
      console.log("valor", e.message);
    }
  };

  // openDetails = () => {
  //   this.props.navigation.navigate("Places", {
  //     data: this.state.business,
  //   });
  // };

  recommend = () => {
    console.log(this.state.business);
    // const { params } = navigation.props.business;
    //const { navigate } = this.props.navigation;
    return this.state.business.map(function (item, i) {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => this.props.navigation.navigate("Places")}
        >
          <CardItem style={{ paddingBottom: 10 }}>
            <View>
              <Image
                style={{ height: 90, width: 90 }}
                source={{ uri: item.image_url }}
              />
            </View>
            <Right
              style={{
                flex: 1,
                alignItems: "flex-start",
                height: 100,
                paddingHorizontal: 20
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {item.name}
              </Text>
              <Text>
                {item.location.address1} {item.location.address2}
              </Text>
              <Text>{item.location.city}</Text>
              <Text>{item.display_phone}</Text>
              <Text>{item.price}</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rating}
                starSize={12}
                fullStarColor={"orange"}
                emptyStarColor={"orange"}
              />
            </Right>
          </CardItem>
        </TouchableOpacity>
      );
    });
  }

  render() {
    let text = "Loading..";
    let text1 = "";
    if (this.state.errorMessage) {
      //text = this.state.errorMessage;
      //console.log(this.state.errorMessage);
    } else if (this.state.lon) {
      //text = this.state.lat;
      //text1 = this.state.lon;
      //console.log(this.state.business);
    }

    return (
      <Container>
        <Header
          style={{
            backgroundColor: "#3a455c",
            height: 100,
            borderBottomColor: "#757575",
            paddingBottom: 20
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                alignContent: "center",
                justifyContent: "center",
                marginTop: 50
              }}
            >
              Yelpie!!!
            </Text>
          </View>
        </Header>
        <View
          style={{
            backgroundColor: "#3a455c",
            position: "absolute",
            flex: 1,
            left: 0,
            right: 0,
            top: 100,
            height: 70
          }}
        >
          <TouchableOpacity>
            <Item
              style={{
                backgroundColor: "white",
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 4
              }}
            >
              <Icon active name="search" style={{ paddingLeft: 10 }} />
              <Input placeholder="Were do you want to chow?" />
            </Item>
          </TouchableOpacity>
        </View>
        <Content style={{ backgroundColor: "#d5d5d6", marginTop: 70 }}>
          <View
            style={{
              height: 50,
              backgroundColor: "white",
              fontWeight: "bold",
              justifyContent: "center",
              fontSize: 18
            }}
          >
            <Text> Check These Places Out!</Text>
          </View>
          <Card>{this.recommend()}</Card>

        </Content>
      </Container>
    );
  }
}
export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

// key={item.id}
//           location={item.coordinates}
{/* <Result Result={this.recommend} /> */ }
{
  /* <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: this.startHeaderHeight,
              backgroundColor: "dodgerblue"
              //   borderBottomWidth: 1,
              //   borderBottomColor: "#dddd"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                backgroundColor: "skyblue",
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "black",
                shadowOpacity: 0.2,
                elevation: 1,
                marginTop: Platform.OS == "android" ? 30 : null
              }}
            >
              <Ionicons
                name="md-search"
                size={20}
                style={{ marginRight: 10, color: "white" }}
              />
              <TextInput
                placeholder="Where are you braking today?"
                placeholderTextColor="white"
                style={{
                  flex: 1,
                  fontWeight: "700",
                  backgroundColor: "skyblue",
                  fontSize: 18,
                  color: "white",
                  borderBottomWidth: 1,
                  borderBottomColor: "white"
                }}
              />
            </View>
            <View />
          </View>

          <ScrollView scrollEventThrottle={16}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  paddingHorizontal: 20,
                  paddingTop: 10
                }}
              >
                Take a Break!
              </Text>
            </View>

            <FlatList
              data={this.state.business}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                <TouchableNativeFeedback
                  onPress={() => {
                    this.props.navigation.navigate("Places", { places: item });
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      width: "auto",
                      backgroundColor: "#FFFFFF",
                      flexDirection: "row",
                      marginTop: 5,
                      marginBottom: 5,
                      marginLeft: 10,
                      marginRight: 10,
                      borderRadius: 5
                    }}
                  >
                    <Image
                      source={{ uri: item.image_url }}
                      style={{
                        flex: 1,
                        width: 100,
                        height: 100,
                        borderRadius: 5
                      }}
                    />
                    <View
                      style={{
                        flex: 2,
                        width: "auto",
                        height: "auto",
                        padding: 10
                      }}
                    >
                      <Text
                        style={{ flexGrow: 1, fontSize: 16, color: "#666666" }}
                      >
                        {item.name}
                      </Text>
                      <Text style={{ fontSize: 12, color: "#999999" }}>
                        {item.location.address1}
                      </Text>
                      <View style={{ marginTop: 5, flexDirection: "row" }}>
                        <Text>{item.price}</Text>
                        <StarRating
                          disabled={true}
                          maxStars={5}
                          rating={item.rating}
                          starSize={12}
                          fullStarColor="orange"
                          emptyStarColor="orange"
                        />
                      </View>
                    </View>
                  </View>
                </TouchableNativeFeedback>;
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView> */
}

//#2C75FF
// getVenues = () => {
//   const endpoint = "https://api.yelp.com/v3/businesses/search";
//   const parameters = {
//     term: "restaurants",
//     latitude: 33.9668462,
//     longitude: -118.3848496,
//     limit: 2
//   };
//   const config = {
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//       authorization:
//         "Bearer" +
//         "7NmxfSO3r5cO1iVjlSvkR5CBv17T_BDZ99MfpK0ZVsu7eQJ_Is8kd0wnXtmrBmrBJYZ5jRJoz8X-FtaQ9zN4MDr3dSIHkSblFQRxmQYrV2cf-IMd3fX5hkCQKRlqXHYx"
//     }
//   };

//   Axios.get(endpoint, parameters, config)
//     .then(response => {
//       this.setState({
//         business: business
//       });
//       //this.renderMap();
//       console.log(response);
//     })
//     .catch(error => {
//       console.log("Error" + error);
//     });
// };
// {
//   /* <FontAwesome
//                             name={"dollar"}
//                             size={14}
//                             color="black"
//                           /> */
// }
// {
//   /* <FontAwesome name={"dollar"} size={14} color="black" /> */
// }
// /import { FontAwesome } from "@expo/vector-icons";
