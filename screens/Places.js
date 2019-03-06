import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
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
  constructor(props) {
    super(props);
    this.state = {
      lon: null,
      lat: null
    };
  }

  render() {
    return (
      <Container>
        <Header
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
        </Header>
        <Content>
          <Maps
            style={{ flex: 1 }}
            latitude={34.058803}
            longitude={-118.337986}
            latitudeDelta={0.0922}
            longitudeDelta={0.0421}
          />
          <View>
            <Text>Extra goes here</Text>
          </View>
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

//"#757575"#3a455c"
//alignItems: "center",
//justifyContent: "center"
{
  /* <MapView
            style={{ flex: 1, height: "80%", width: "100%" }}
            initialRegion={{
              latitude: 34.058803,
              longitude: -118.337986,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <MapView.Marker
              coordinate={{ latitude: 34.064029, longitude: -118.398768 }}
              title={"marker.title"}
              description={"desss"}
            />
          </MapView> */
}
