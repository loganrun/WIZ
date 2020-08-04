import React, { Component } from 'react';
import { Image, Text,TouchableOpacity, StyleSheet, AsyncStorage,Alert } from 'react-native';
import { Card, CardItem, Thumbnail,Button,Left, Body, Right } from 'native-base';
import axios from "axios";
//import AlertMod  from "../components/alertModal"
let horrible = require('../assets/TP-ratingsno!!!.png')
let bad = require('../assets/TP-ratingsgross.png')
let ok = require('../assets/TP-ratingsmeh.png')
let good = require('../assets/TP-ratingsclean.png')
let great = require('../assets/TP-ratingsfresh.png')

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
      changing_table: false,
      directions:  "",
      accessible: true,
      unisex: false
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
    let directions = item.directions
    let accessible = item.accessible
    let unisex = item.unisex
    this.setState({latitude: latitude})
    this.setState({longitude: longitude})
    this.setState({name:  name})
    this.setState({street: street})
    this.setState({state: state})
    this.setState({city: city})
    this.setState({id: id})
    this.setState({table: table})
    this.setState({directions: directions})
    this.setState({accessible: accessible})
    this.setState({unisex:  unisex})
    //this.placeUpdate()
    }

    placeUpdate = () =>{
      //let user = userToken
      axios({
        method: "post",
        baseURL: "https://whizzit.herokuapp.com/api/bathrooms",
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
          table:  this.state.table,
          city: this.state.city,
          id: this.state.id,
          directions: this.state.directions,
          accessible: this.state.accessible,
          unisex: this.state.unisex
        }
      });
    }

    addOne = () =>{
     Alert.alert('Your rating has been recorded! Thank You.')
     this.setState({rate: 1})
    }

    addTwo = () =>{
    Alert.alert('Your rating has been recorded! Thank You.')
    this.setState({rate: 2})
    }

    addThree = () =>{
    Alert.alert('Your rating has been recorded! Thank You.')
    this.setState({rate: 3})
    }

    addFour = () =>{
    Alert.alert('Your rating has been recorded! Thank You.')
    this.setState({rate: 4})
    }
    addFive = () =>{
    Alert.alert('Your rating has been recorded! Thank You.')
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
    height: 80, 
    width: 45,
    marginTop: 5
  
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

//<Button block
  //              style={{
    //              marginTop: 25,
      //            marginRight: 10,
        //          backgroundColor: "red",
        //          paddingRight: 10,
        //          paddingLeft: 10, 
        //          width: '100%'
        //        }}
                
          //    >
            //    <Text
              //    style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
              //  >
              //    SUBMIT RATINGS
              //  </Text>
             // </Button>