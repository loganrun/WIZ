import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { StyleSheet, View, Image,Text} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize'



const slides = [

    {
      key: "1",
      title: 'WELCOME \nTO WHIZZ',
      //text: 'Hello fellow Whizzards',
      image: require('../assets/onboard-welcome.png'),
      backgroundColor: '#fff'//'#8b0000'//'#daa520'//''// //#febe29',
    },
    {
      key: "2",
      title: "LET'S GO!!!",
      text: 'America is back on the road again!!! And Whizz is here to help you find a place to "go" when you are on the go!',
      image: require('../assets/onboard-lets-go.png'),
      backgroundColor: '#fff'//'#8b0000'//'#daa520'//''// //#febe29',
    },
    {
      key: "3",
      title: 'OPEN or CLOSED?',
      text: "Dark blue pins means the restrooms are open (subject to business hours) and you are good to go. \n\nLight blue pins means we need you to tell us if it is still there! Please CHECK IN and review the restroom to update it's status.",
      image: require('../assets/onboard-verification-1.png'),
      backgroundColor: '#fff'//'#59b2ab',
    },
    {
        key: "4",
        title: 'RATE IT!',
        text: 'Help your fellow Whizzards by rating your visit.',
        image: require('../assets/onboard-rating.png'),
        backgroundColor: '#fff' //'#22bcb5',
      },
   {
      key: "5",
      title: 'CHECK IN!',
      text: "Remember to check in at your favorite spots, and we'll get busy conjuring up some exclusive discounts for you.",
      image: require('../assets/onboard-favorite-1.png'),
      backgroundColor: '#fff',
    } 
  ];

  const styles = StyleSheet.create({
    slide: {
      flex: 1,
      resizeMode: 'cover',
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode:'contain',
        marginTop: -40
        
      },
    text: {
      color: '#333',
      //marginTop: '2%',
      textAlign: 'center',
    },
  });

  _renderItem = ({ item }) => {
    return (
      <View style={{flex:1, backgroundColor: item.backgroundColor}}>
        <View style={{alignContent:"center",alignItems: "center"}}>
        <Image source={item.image} style ={styles.image} />
        </View>
        <Text style={{fontSize:RFPercentage(5), alignSelf:"center", marginTop: -65}}>{item.title}</Text>
        <Text style= {{marginLeft: 40, marginRight:40, marginTop: 8, fontSize:RFPercentage(2.4)}}>{item.text}</Text>
      </View>
    );
  }

  _renderSkipButton = () =>{
    return (
      <View>
        <Text style={{color: '#333', fontSize: 18}}>Skip</Text>
      </View>
    )
  }

  _renderDoneButton = () => {
    return (
      <View>
        <Text style={{color: '#333', fontSize: 18}}>Done</Text>
      </View>
    );
  };

  const Slider = props =>{
      return <AppIntroSlider data={slides} renderItem={this._renderItem} onDone={props.onDone}
     showSkipButton={true} renderDoneButton={this._renderDoneButton} renderSkipButton={this._renderSkipButton}
      />
  }

  export default Slider
