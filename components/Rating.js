import React, { Component } from 'react';
import { Image, Text,TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Card, CardItem, Thumbnail,Button,Left, Body, Right } from 'native-base';
import axios from "axios";
//import { number } from 'yup';
let horrible = require('../assets/Omg_Emoji.png')
let bad = require('../assets/Very_Sad_Emoji.png')
let ok = require('../assets/Neutral_Face_Emoji.png')
let good = require('../assets/Slightly_Smiling_Face.png')
let great = require('../assets/Smiling_with_Eyes_Opened.png')

const userToken = AsyncStorage.getItem("userToken");
class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      rate: 0,
      longitude:  0,
      name: "",
      street: "",
      state:  "",
      id: "",
      city: "",
      changing_table: false
    };
  }

  componentDidMount() {
    this.setReview()
  }

  setReview=()=>{
    let item = this.props.item;
    let latitude = item.latitude;
    let longitude = item.longitude
    let name = item.name
    let street = item.street
    let state = item.state
    let id = item.id
    let city = item.city
    let table = item.changing_table
    this.setState({latitude: latitude})
    this.setState({longitude: longitude})
    this.setState({name:  name})
    this.setState({street: street})
    this.setState({state: state})
    this.setState({city: city})
    this.setState({id: id})
    this.setState({table: table})
    //this.placeUpdate()
    }

    placeUpdate = () =>{
      let user = userToken
      axios({
        method: "post",
        baseURL: "https://whizzit.herokuapp.com/api/users",
        timeout: 40000,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        data: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          name: this.state.name,
          street: this.state.street,
          state: this.state.state,
          userId: user,
          table:  this.state.table,
          city: this.state.city,
          id: this.state.id
        }
      });
    }

    addOne = () =>{
        this.setState({rate: 1})
    }

    addTwo = () =>{
        this.setState({rate: 2})
    }

    addThree = () =>{
        this.setState({rate: 3})
    }

    addFour = () =>{
        this.setState({rate: 4})
    }
    addFive = () =>{
        this.setState({rate: 5})
    }

    

    

  render() {
    
    
    return (
          <Card style={{flex: 0}}>
            <CardItem>
              <Body style={{
                  alignItems: "flex-start",
                  marginTop: 20
                }}>
                <Text style={{marginBottom: 10, fontWeight: "bold", fontSize: 16}}>How Was Your Visit?</Text>
                <CardItem style={{flexDirection: 'row'}}>
                <Button transparent style={styles.button1} onPress={this.addOne}><Image source={horrible} style={styles.image}/></Button>
                <Button transparent style={styles.button} onPress={this.addTwo}><Image source={bad} style={styles.image}/></Button>
                <Button transparent style={styles.button} onPress={this.addThree}><Image source={ok} style={styles.image}/></Button>
                <Button transparent style={styles.button} onPress={this.addFour}><Image source={good} style={styles.image}/></Button>
                <Button transparent style={styles.button} onPress={this.addFive}><Image source={great} style={styles.image}/></Button>
                </CardItem>
              </Body>
            
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
  
} export default Ratings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  image: {
    height: 40, 
    width: 40
  },
 
  button1: {
    height: 40, 
    width: 40, 
    marginRight: 25, 
    marginLeft: 20
  },
  button: {
    height: 40, 
    width: 40, 
    marginRight: 25
  }
});