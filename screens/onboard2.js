import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Intro  from '../components/Intro';
var bathIcon = require("../assets/premium_icon.png");

const animation = require('../animations/location.json');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
const OnBoardTwo = () => (
    <Intro
    animation={animation}
    title="Where to 'go'?"
    body="On the map you will find markers for restrooms in your area.  Dark blue markers are from our restaurant partners.  Click on the markers for exclusive offers and discounts from these select restaurants.  Click on any marker to see more info about the restroom."
  />
);
export default OnBoardTwo;