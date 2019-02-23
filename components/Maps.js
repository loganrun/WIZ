import React, { Component } from "react";
import { View, Text } from "react-native";
import { MapView } from "expo";

//const Marker = MapView.Marker;

class Maps extends Component {
  render() {
    const { region } = this.props;
    return <MapView style={styles.container} region={region} />;
  }
}

const styles = {
  container: {
    width: "100%",
    height: "80%"
  }
};

export default Maps;

// renderMarkers() {
//     return this.props.places.map((place, i) =>{
//         <Marker key={place.id} title ={place.name} coordinate={place.coords}/>>
//     })
// }
// showsUserLocation
//         showsMyLocationButton
//       >
//         {" "}
//         {this.renderMarkers()
