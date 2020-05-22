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
  Keyboard,
  AsyncStorage
} from "react-native";

//import { Location, Permissions } from "expo";
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

class Explore extends Component {
  constructor(props) {
    super(props);
    //console.log(this.props);
    this.state = {
      business: [],
      loading: false,
      lat: null,
      lon: null,
      errorMessage: null,
      search: ""
    };
   // this.handleSearch = this.handleSearch.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  // static navigationOptions = {
  //   title: "BREAK-TIME",
  //   headerStyle: {
  //     backgroundColor: "#3a455c"
  //   },
  //   headerTintColor: "#fff",
  //   headerTitleStyle: {
  //     fontWeight: "bold"
  //   }
  // };

  // componentDidMount() {
  //   this._getLocationAsync();
  //   this.setState({ loading: true });
  // }

  // handleSearch(search) {
  //   this.setState({ search: search });
  // }

  // handleSubmit() {
  //   this.loadBusiness();
  //   this.setState({ loading: true });
  // }

  // getLocation = async () => {
  //   let location = "";
  //   try {
  //     location = await AsyncStorage.getItem("location");
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error.message);
  //   }
  //   return JSON.parse(location);
  // };

  // getBusinesses = async () => {
  //   let businesses = "";
  //   try {
  //     businesses = await AsyncStorage.getItem("businesses");
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error.message);
  //   }
  //   return JSON.parse(businesses);
  // };

  // _getLocationAsync = async () => {
  //   // let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   // if (status !== "granted") {
  //   //   this.setState({
  //   //     errorMessage: "Permission to access location was denied"
  //   //   });
  //   // }

  //   let location = await this.getLocation();
  //   let lat = location.coords.latitude;
  //   let lon = location.coords.longitude;
  //   this.setState({ lat });
  //   this.setState({ lon });
  //   this.loadBusiness();
  // };

  // initBusinesses = async () => {
  //   let business = await this.getBusinesses();
  //   this.setState({ business: business });
  //   this._getLocationAsync();
  //   this.setState({ loading: false });
  // };

  // loadBusiness = async () => {
  //   let lat = this.state.lat;
  //   let lon = this.state.lon;

  //   try {
  //     let params = {
  //       term: this.state.search,
  //       latitude: lat,
  //       longitude: lon,
  //       radius: 10000,
  //       limit: 20
  //     };

  //     let response = await api.get("/search", { params });
  //     let { businesses } = response.data;

  //     this.setState({ business: businesses });
  //     await this.setState({ loading: false });
  //     this.setState({ search: "" });
  //   } catch (e) {
  //     console.log("error", e.message);
  //   }
  // };

  recommend = () => {
    const { navigate } = this.props.navigation;
    return this.state.business.map((item, i) => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            this.props.navigation.navigate("Places", {
              id: item.id,
              item,
              currentLat: this.state.lat,
              currentLon: this.state.lon
            });
          }}
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
  };

  render() {
    let text = " ";
    //let text1 = "";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.loading) {
    }

    return (
      <SafeAreaView style={styles.container}>
        {/* <Header
          style={{
            backgroundColor: "#3480CB",//"#52AEA0",
            height: 100,
            borderBottomColor: "#757575"
          }}
        /> */}

      <View style={styles.container}>
        <Text>FEATURE COMING SOON</Text>
      </View>
        {/* <View
          style={{
            backgroundColor: "#3480CB",//"#52AEA0",
            position: "absolute",
            flex: 1,
            left: 0,
            right: 0,
            top: 40,
            height: 70,
            flexDirection: "row"
          }}
        >
          <Item
            style={{
              backgroundColor: "white",
              marginLeft: 15,
              marginRight: 10,
              marginBottom: 15,
              borderRadius: 4,
              paddingRight: 50,
              flex: 4
            }}
            onBlur={Keyboard.dismiss}
          >
            <Icon
              active
              name='search'
              style={{ paddingLeft: 10, paddingRight: 10 }}
            />
            <Input
              placeholder='Need a Break?'
              value={this.state.search}
              onChangeText={this.handleSearch}
            />
          </Item>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              marginRight: 15,
              flex: 1,
              marginBottom: 15
            }}
            onPressIn={Keyboard.dismiss}
            onPress={this.handleSubmit}
          >
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontWeight: "bold"
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>

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
              Check These Places Out!
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
                size='large'
                color='blue'
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
        </Content> */}
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

