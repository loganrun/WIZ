import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { Card, CardItem, Thumbnail,Button,Left, Body, Right } from 'native-base';
//let dog = require('../assets/earl_dog.jpg')
let waba = require('../assets/Waba_ad.png')
export default class Ads extends Component {
  render() {
    const newAd = this.props.adInfo
    console.log(newAd)
    return (
          <Card style={{flex: 0}}>
            {/* <CardItem>
              <Left >
                <Body>
                  <Text style= {{fontSize: 24, fontWeight:"bold",}}>Earle's on Crenshaw</Text>
                  <Text>3864 Crenshaw Blvd</Text> 
                  <Text>Los Angeles, CA 90008 </Text>
                
                </Body>
              </Left>
            </CardItem> */}
            <CardItem style={{margin: 0}}>
              <Body style={{margin: 0}}>
                <Image source={{uri: this.props.adInfo}} style={{height: 200, width: "100%", flex: 1, paddingLeft: 5}}/>
                {/* <Text>
                  Our World Famous Chilli Dog!
                </Text> */}
              </Body>
            </CardItem>
            {/* <CardItem>
              <Left>
                  <Text style={{fontSize: 16, fontWeight:"400"}}>We have the best food around and an atmosphere to match. Try us and you'll be convinced! Our recipes are authentic and time-tested.</Text>
                
              </Left>
            </CardItem> */}
          </Card>
    );
  }
}