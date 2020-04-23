import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Intro  from '../components/Intro';

const animation = require('../animations/marker.json');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
const OnBoardThree = () => (
    <Intro
    animation={animation}
    title="Get There Now!"
    body="For directions or restroom reviews, click on the info window.  Please consider making a purchase while you are there to thank them for letting you 'go'. Thank you and let us know what you think about our app!"
  />
);
export default OnBoardThree;