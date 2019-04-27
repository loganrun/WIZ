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
  TouchableOpacity,
  ActivityIndicator,
  Keyboard
} from "react-native";

import { Location, Permissions } from "expo";

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
import restApi from "../services/restroom";
//import StarRating from "react-native-star-rating";

class Bathroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bathroom: [],
      loading: false,
      lat: null,
      lon: null,
      errorMessage: null,
      search: ""
    };
    //this.handleSearch = this.handleSearch.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: "WIZ-TIME",
    headerStyle: {
      backgroundColor: "#3a455c"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  componentDidMount() {
    this._getLocationAsync();
    this.setState({ loading: true });
  }

  //   handleSearch(search) {
  //     this.setState({ search: search });
  //   }

  //   handleSubmit() {
  //     this.loadBusiness();
  //     this.setState({ loading: true });
  //   }

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
    //console.log(lat);
    //console.log(lon);
  };

  loadBusiness = async () => {
    //let lat = this.state.lat;
    //let lon = this.state.lon;

    try {
      let params = {
        page: 1,
        per_page: 30,
        lat: this.state.lat,
        lng: this.state.lon
      };

      let response = await restApi.get("/by_location", { params });
      let bathroom = response.data;
      this.setState({ bathroom: bathroom });
      await this.setState({ loading: false });
    } catch (e) {
      console.log("error", e.message);
    }
  };

  recommend = () => {
    const { navigate } = this.props.navigation;
    return this.state.bathroom.map((item, i) => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            this.props.navigation.navigate("Pee", {
              id: item.id,
              item,
              currentLat: this.state.lat,
              currentLon: this.state.lon
            });
          }}
        >
          <CardItem style={{ paddingBottom: 10 }}>
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
              <Text>{item.street}</Text>
              <Text>{item.city}</Text>
              <Text>{item.comment}</Text>
              <Text>{item.directions}</Text>
            </Right>
          </CardItem>
        </TouchableOpacity>
      );
    });
  };

  render() {
    let text = " ";
    //let text1 = "";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.loading) {
    }

    return (
      <Container>
        <Header
          style={{
            backgroundColor: "#3a455c",
            height: 50,
            borderBottomColor: "#757575"
          }}
        />
        {/* <View
          style={{
            backgroundColor: "#3a455c",
            position: "absolute",
            flex: 1,
            left: 0,
            right: 0,
            top: 40,
            height: 70,
            flexDirection: "row"
          }}
        /> */}

        <Content style={{ backgroundColor: "#d5d5d6", marginTop: 20 }}>
          <View
            style={{
              height: 50,
              backgroundColor: "white",
              fontWeight: "bold",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 24
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Find Relief Here!
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "#ffff",
              justifyContent: "center"
            }}
          >
            {this.state.loading ? (
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
            ) : (
              false
            )}
          </View>
          <Card>{this.recommend()}</Card>
        </Content>
      </Container>
    );
  }
}
export default Bathroom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
