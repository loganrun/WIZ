import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { MapView } from "expo";

//const Marker = MapView.Marker;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
class Maps extends Component {
  render(props) {
    //console.log(this.props.initialRegion);

    const { region } = this.props;
    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: this.props.latitudeDelta,
          longitudeDelta: this.props.longitudeDelta
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: this.props.latitude,
            longitude: this.props.longitude
          }}
          title={"marker.title"}
          description={"desss"}
        />
      </MapView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width,
    height
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
{
  /* <MapView style={styles.container} region={region} /> */
}
