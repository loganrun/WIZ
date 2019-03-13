import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Body
} from "native-base";

import { MapView } from "expo";
import Maps from "../components/Maps";
class Places extends Component {
  static navigationOptions = {
    title: "DETAILS",
    headerStyle: {
      backgroundColor: "#3a455c"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  render() {
    let item = this.props.navigation.getParam("item");
    console.log(item.coordinates);
    let longitude = item.coordinates.longitude;
    let latitude = item.coordinates.latitude;
    // const data = this.props.navigation.getParam('places');
    // // const data = params ? params.data : null;
    // console.log(data)
    const { navigate } = this.props.navigation;
    return (
      <Container>
        {/* <Header
          style={{
            backgroundColor: "#3a455c",
            height: 100,
            borderBottomColor: "#757575"
          }}
        >
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text
              style={{
                fontSize: 18,
                color: "white"
              }}
            >
              DETAILS
            </Text>
          </Body>
        </Header> */}
        <Content>
          <ScrollView>
            <Maps
              style={{ flex: 1 }}
              latitude={latitude}
              longitude={longitude}
              latitudeDelta={0.022}
              longitudeDelta={0.021}
            />
            <View
              style={{
                flex: 1,
                height: "80%",
                width: "100%",
                backgroundColor: "white"
              }}
            >
              <Text>Extra goes here</Text>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
export default Places;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
