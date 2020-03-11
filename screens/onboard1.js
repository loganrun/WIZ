import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Intro  from '../components/Intro';

const animation = require('../animations/drive.json');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
const OnBoardOne = () => (
    <Intro
    animation={animation}
    title="We All Live Busy Lives!"
    body="When you are out and about and have to 'go', don't sweat it. Launch Whizz and click on the marker to find the restrooms in your area!"
  />
);
export default OnBoardOne;