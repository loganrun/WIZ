import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { StyleSheet, View, Image,Text } from 'react-native';



const slides = [
    {
      key: "1",
      title: 'WELCOME TO WHIZZ \n Quarantine Edition ',
      text: 'The Whizz Team would like to thank all of our Essential Workers for taking care of us during these challenging times.\n\nBut we especially want to thank the unsung heroes...',
      image: require('../assets/essWorker.png'),
      backgroundColor: '#ff8c00'//'#8b0000'//'#daa520'//''// //#febe29',
    },
    {
      key: "2",
      title: 'DELIVERY WORKERS!!!!!',
      text: 'You guys are saving lives!!!!  Your hard work allows us to stay home and slow the spread of the virus.\n\n So Whizz is partnering with our good friends at Waba Grill to take care of you. How are we going to do that? How about a nice discount on their amazing food and exclusive access to their restrooms!!!',
      image: require('../assets/maskDeliv.jpg'),
      backgroundColor: '#22bcb5'//'#59b2ab',
    },
    {
        key: "3",
        title: 'WELCOME',
        text: 'This offer is available at participating Waba Grills.  Open the Whizz map and click on the icon. Select the popup to get directions. To gain access to the restroom and the exclusive discount, show the app to the manager.',
        image: require('../assets/waba.jpg'),
        backgroundColor: '#ff8c00'//'#22bcb5',
      },
   {
      key: "4",
      title: 'BE SAFE!!!',
      text: 'Please remember to wear your mask at all times, especially in the restaurant.  Be safe out their!!!\n\n The Whizz Team. \n\nIf you know of any restaurant that wants to join, they can reach is at Whizzzit@gmail.com',
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
        <View style={{alignContent:"center",alignItems: "center", marginTop: 20, marginBottom: 20}}>
        <Image source={item.image} style ={styles.image} />
        </View>
        <Text style={{fontSize:18, alignSelf:"center", marginBottom:5}}>{item.title}</Text>
        <Text style= {{marginLeft: 10, marginRight:10}}>{item.text}</Text>
      </View>
    );
  }

  const Slider = props =>{
      return <AppIntroSlider data={slides} renderItem={this._renderItem} onDone={props.onDoneAllSlides} 
      onskip={props.onDoneAllSlides} showSkipButton={true}/>
  }

  export default Slider

