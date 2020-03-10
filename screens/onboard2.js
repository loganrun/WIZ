import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Intro  from '../components/Intro';

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
    title="Title two"
    body="Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  />
);
export default OnBoardTwo;