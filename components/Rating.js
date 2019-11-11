import React, { Component } from 'react';
import { Image, Text,TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail,Button,Left, Body, Right } from 'native-base';
let dog = require('../assets/earl_dog.jpg')
let horrible = require('../assets/Omg_Emoji.png')
let bad = require('../assets/Very_Sad_Emoji.png')
let ok = require('../assets/Neutral_Face_Emoji.png')
let good = require('../assets/Slightly_Smiling_Face.png')
let great = require('../assets/Smiling_with_Eyes_Opened.png')
export default class Ratings extends Component {
  render() {
    return (
          <Card style={{flex: 0}}>
            <CardItem>
            <TouchableOpacity>
              <Body style={{
                  alignItems: "flex-start",
                  marginTop: 20
                }}>
                <Text style={{marginBottom: 10, fontWeight: "bold", fontSize: 16}}>How Was Your Visit?</Text>
                <CardItem style={{flexDirection: 'row'}}>
                
                <Button transparent style={{height: 40, width: 40, marginRight: 25, marginLeft: 20}}><Image source={horrible} style={{height: 40, width: 40}}/></Button>
                <Button transparent style={{height: 40, width: 40, marginRight: 25}}><Image source={bad} style={{height: 40, width: 40}}/></Button>
                <Button transparent style={{height: 40, width: 40, marginRight: 25}}><Image source={ok} style={{height: 40, width: 40}}/></Button>
                <Button transparent style={{height: 40, width: 40, marginRight: 25}}><Image source={good} style={{height: 40, width: 40}}/></Button>
                <Button transparent style={{height: 40, width: 40, marginRight: 25}}><Image source={great} style={{height: 40, width: 40}}/></Button>
            
                </CardItem>
              </Body>
              </TouchableOpacity>
            </CardItem>
            <CardItem>
            <Button block
                style={{
                  marginTop: 25,
                  marginRight: 10,
                  backgroundColor: "red",
                  paddingRight: 10,
                  paddingLeft: 10, width: '100%'
                }}
                
              >
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
                >
                  SUBMIT RATINGS
                </Text>
              </Button>
            </CardItem>
          </Card>
    );
  }
}