import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { Card, CardItem, Thumbnail,Button,Left, Body, Right } from 'native-base';
//let dog = require('../assets/earl_dog.jpg')
//let waba = require('../assets/Waba_ad.png')
export default class Ads extends Component {
  render() {
    return (
          <Card style={{flex: 0}}>
            <CardItem style={{margin: 0}}>
              <Body style={{margin: 0}}>
                <Image source={{uri: this.props.adInfo}} style={{height: 200, width: "100%", flex: 1, paddingLeft: 5}}/>
              </Body>
            </CardItem>
          </Card>
    );
  }
}