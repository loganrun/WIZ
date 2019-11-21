import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, CardItem, Right } from "native-base";
import StarRating from "react-native-star-rating";

class Results extends Component {
  recommend(props) {
    return this.props.business.map(function (item, i) {
      return (
        <TouchableOpacity
          key={item.id}
          location={item.coordinates}
          onPress={() => { this.props.navigation.navigate("Places", { 'places': item }) }}
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

  render(props) {
    return <Card>{this.recommend()}</Card>;
  }
}
export default Results;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
