import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Location, Permissions } from "expo";
import api from "../services/Api";

class Explore extends Component {
  state = {
    business: [],
    loading: false,
    lat: null,
    lon: null,
    errorMessage: null
  };
  componentWillMount() {
    this._getLocationAsync();
    //this.loadBusiness();
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 65 + StatusBar.currentHeight;
    }
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
        limit: 10
      };

      let response = await api.get("/search", { params });
      let { businesses } = response.data;
      //let { total } = response.data;

      this.setState({ business: businesses });
      console.log(businesses);
      //this.setState({ total: total });

      await this.setState({ loading: false });
    } catch (e) {
      console.log("valor", e.message);
    }
  };

  render() {
    let text = "Loading..";
    let text1 = "";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.lon) {
      text = this.state.lat;
      text1 = this.state.lon;
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
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
            <View>
              <Text>
                {text} {text1}{" "}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
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
