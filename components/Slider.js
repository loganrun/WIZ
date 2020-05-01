import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { StyleSheet, View, Image,Text } from 'react-native';



const slides = [
    {
      key: "1",
      title: 'WELCOME TO WHIZZ \n Quarantine Edition ',
      text: 'The Whizz Team would like to thank all of our Essential Workers for taking carfe of us during these challenging times.\nSay something cool',
      image: require('../assets/essWorker.png'),
      backgroundColor: '#febe29',
    },
    {
      key: "2",
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../assets/maskDeliv.jpg'),
      backgroundColor: '#22bcb5'//'#59b2ab',
    },
    {
      key: "3",
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: require('../assets/mask2.jpg'),
      backgroundColor: '#22bcb5',
    }
  ];

  const styles = StyleSheet.create({
    slide: {
      flex: 1,
      resizeMode: 'cover',
    },
    image: {
        width: 300,
        height: 300,
        
      },
    text: {
      color: '#333',
      marginTop: 92,
      textAlign: 'center',
    },
  });

  _renderItem = ({ item }) => {
    return (
      <View style={{flex:1, backgroundColor: item.backgroundColor}}>
        <View style={{alignContent:"center",alignItems: "center", marginTop: 40, marginBottom: 20}}>
        <Image source={item.image} style ={styles.image} />
        </View>
        <Text style={{fontSize:18, alignSelf:"center", marginBottom:5}}>{item.title}</Text>
        <Text style= {{marginLeft: 10}}>{item.text}</Text>
      </View>
    );
  }

  const Slider = props =>{
      return <AppIntroSlider data={slides} renderItem={this._renderItem} onDone={props.onDoneAllSlides} 
      onskip={props.onDoneAllSlides} showSkipButton={true}/>
  }

  export default Slider

