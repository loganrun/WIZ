import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  Animated,
  PanResponder,
  Modal,Alert,
  TouchableOpacity,
  Image
} from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Card,
  CardItem
} from "native-base";

import { showLocation } from "react-native-map-link";
import AsyncStorage from '@react-native-async-storage/async-storage'
import StarRating from "react-native-star-rating";
import {connect} from 'react-redux'
//import { MapView } from "expo";
import Maps from "../components/Maps";
import { SafeAreaView } from 'react-navigation'
import Ad from "../components/Ads";
import restApi from '../services/restroom';
import Ratings from "../components/Rating"
import Checkin from "../components/Checkin"
import DialogInput from 'react-native-dialog-input';
import { storeProfileName } from '../store/actions';
import Toast from 'react-native-root-toast';
//var vid = require("../assets/donut.mp4")

//const SCREEN_HEIGHT = Dimensions.get("window").height;
//const SCREEN_WIDTH = Dimensions.get("window").width;

let contentMarginTopAnim = new Animated.Value(200);
let mapTopMarginAnim = new Animated.Value(-250);

class Pee extends Component {
  // componentWillMount() {
  //   this.moveAnimation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 20 });
  // }

  constructor(props) {
    super(props);
    this.state = {
      showProfileInput: false,
      reviewModal: false,
      rating: 3,
      reviewContent: '',
    }
    // this.handleDirections = this.handleDirections.bind(this);
  }

  storeCheckedIn = async () => {
    try {
      const uID = await this.getUserId();
      const response = await restApi.post('/api/users/checkin', {
        userId: uID,
      });
      if (response.data) {
        Toast.show(response.data, {
          duration: Toast.durations.LONG,
        });
      }
    } catch (e) {
      console.log(e.response);
      // console.log(e.response);
    }
  }

  leaveReview = async() => {
    this.setState({reviewModal:true})
    // const { profileName } = this.props;
    // if (profileName === '') {
    //   Toast.show('Your profile name is empty, Please click Check In', {
    //     duration: Toast.durations.LONG,
    //   });
    // } else {
    //   this.setState({
    //     reviewModal: true,
    //   })
    // }
  }

  saveReview = async() => {
    const { navigation } = this.props;
    const bathroomId = navigation.getParam('item')['_id'];
    const userId = await this.getUserId();
    const { rating } = this.state;
    const review = this.state.reviewContent;
    
    try {
      const response = await restApi.post('/api/bathReview', {
        bathroomId, userId, rating, review,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.data) {
        Toast.show(response.data, {
          duration: Toast.durations.LONG,
        });
      }
    } catch (e) {
      Toast.show(e.response.data.errors[0].msg, {
        duration: Toast.durations.LONG,
      });
    }
    this.setState({
      reviewModal: false,
    });
  }

  doCheckIn = async () => {
    const { profileName } = this.props;
    if (profileName === '') {
      const uID = await this.getUserId();
      try {
        const response = await restApi.get('/api/users', {
          params: {
            userId: uID
          }
        });
        if (response.data) {
          this.props.saveProfileName(response.data);
          this.setState({
            showProfileInput: false
          });
          this.storeCheckedIn();
        } else {
          this.setState({
            showProfileInput: true
          });
        }
      } catch (e) {
        // console.log(e.response);
        this.setState({
          showProfileInput: true
        });
      }
    } else {
      this.storeCheckedIn();
    }
  }

  getUserId = async () => {
    return await AsyncStorage.getItem("userToken");
  }

  submitProfileName = async (pname) => {
    const { navigation } = this.props;
    const uID = await this.getUserId();
    try {
      const response = await restApi.patch(`/api/users/${uID}`, {
        userName: pname,
      });
      this.props.saveProfileName(response.data);
      this.setState({
        showProfileInput: false,
      });
      this.doCheckIn();
    } catch (e) {
      if (e.response.data.errors) {
        this.setState({
          showProfileInput: false,
        });
        Toast.show(e.response.data.errors[0].msg, {
          duration: Toast.durations.LONG,
        });
      }
    }
  }



  static navigationOptions = {
    title: "DETAILS",
    headerStyle: {
      backgroundColor: "#3480CB",//"#52AEA0",
      elevation: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    // const animatedHeight = {
    //   transform: this.animation.getTranslateTransform()
    // };
    let item = this.props.navigation.getParam("item");
    //console.log(item)
    let curLat = this.props.navigation.getParam("currentLat");
    let curLon = this.props.navigation.getParam("currentLon");
    //console.log(curLat);
    let longitude = item.longitude;
    let latitude = item.latitude;
    let name = item.name;

    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              height: 1200,
              backgroundColor: "#fff"
            }}
          />
          <Animated.View
            style={{
              position: "absolute",
              top: mapTopMarginAnim,
              left: 0,
              width: "100%",
              zIndex: 0,
              height: 800,
              backgroundColor: "blue"
            }}
          >
            <Maps
              style={{ flex: 1 }}
              latitude={latitude}
              longitude={longitude}
              latitudeDelta={0.022}
              longitudeDelta={0.021}
              currLat={curLat}
              currLon={curLon}
              name={name}
              mapOnPress={() => {
                Animated.timing(contentMarginTopAnim, {
                  toValue: 400,
                  duration: 400
                }).start();

                Animated.timing(mapTopMarginAnim, {
                  toValue: -100,
                  duration: 400
                }).start();
              }}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              top: contentMarginTopAnim,
              left: 0,
              width: "100%",
              zIndex: 1
            }}
          >
            <Checkin item={item} sourceLat={curLat} sourceLon={curLon} doCheckIn={this.doCheckIn} leaveReview={this.leaveReview} />
             <Ratings item={this.props.item} leaveReview={this.leaveReview}/>  
          </Animated.View>
        </ScrollView>
      </View>
      <DialogInput
          isDialogVisible={this.state.showProfileInput}
          title="Profile Name"
          message="Please input your profile name"
          hintInput="John"
          submitInput={(inputText) => this.submitProfileName(inputText)}
          closeDialog={() => this.setState({
            showProfileInput: false
          })}
        />
        <Modal
          animationType="slide"
          visible={this.state.reviewModal}
          presentationStyle='fullScreen'
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            
            <View
            style={{
              backgroundColor: '#ddd',
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              marginTop: 30,
              width: 300,
            }}>
              <TextInput
                multiline
                editable
                numberOfLines={1}
                placeholder={"How was your visit? Any Pro tips?"}
                placeholderTextColor={'#3480CB'}
                style={{
                  fontSize: 16,
                  padding: 10,
                }}
                value={this.state.reviewContent}
                onChangeText={text => this.setState({
                  reviewContent: text,
                })}
              />
            </View>
            <View
            style={{
              backgroundColor: '#ddd',
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              marginTop: 30,
              width: 300,
            }}>
              <TextInput
                multiline
                editable
                numberOfLines={1}
                placeholder={"Your rating from 1-5"}
                placeholderTextColor={'#3480CB'}
                style={{
                  fontSize: 16,
                  padding: 10,
                }}
                value={this.state.reviewContent}
                onChangeText={text => this.setState({
                  reviewContent: text,
                })}
              />
            </View>
            <Button
              style={{
                margin: 0,
                marginTop: 25,
                backgroundColor: '#3480CB',
                width: 300,
              }}
              onPress={this.saveReview}
            >
              <Text
                style={{ width: '100%',
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Rate
              </Text>
            </Button>
            <Button
              style={{
                margin: 0,
                marginTop: 25,
                backgroundColor: '#3480CB',
                width: 300,
              }}
              onPress={() => this.setState({
                reviewModal: false,
              })}
            >
              <Text
                style={{ width: '100%',
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Cancel
              </Text>
            </Button>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  profileName: state.user.profileName,
  userId: state.user.newUser.payload,
});

const mapDispatchToProps = dispatch => {

  return {
    saveProfileName: (name)=> {
      dispatch(storeProfileName(name))
    }
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Pee);

// class ContentArea extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   handleDirections = props => {
//     showLocation({
//       latitude: this.props.item.latitude,
//       longitude: this.props.item.longitude,
//       title: this.props.item.name,
//       googleForceLatLon: true,
//       alwaysIncludeGoogle: true
//     });
//   };

//   render() {
//     let item = this.props.item;
//     //console.log(item);
//     //let longitude = item.longitude;
//     //let latitude = item.latitude;
//     let name = item.name;
//     let ad = item.ad
//     //let phone = item.phone;
//     let address = item.street;
//     let city = item.city;
//     let comment = item.comment;
//     let direction = item.directions;

//     return (
//       <Animated.View style={styles.Card}>
//         <TouchableOpacity
//           onPress={() => {
//             Animated.timing(contentMarginTopAnim, {
//               toValue: 200,
//               duration: 400,
//               useNativeDriver: true
//             }).start();

//             Animated.timing(mapTopMarginAnim, {
//               toValue: -250,
//               duration: 400,
//               useNativeDriver: true
//             }).start();
//           }}
//         >
//           <Card style={{ paddingBottom: 10 }}>
//             <CardItem>
//               <Left
//                 style={{
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   paddingHorizontal: 10
//                 }}
//               >
//                 <Text style={{ fontWeight: "bold", fontSize: 20, textTransform: 'capitalize'}}>{name}</Text>
//                 <Text>{address}</Text>
//                 <Text>{city}</Text>
//                 <Text style={{ fontWeight: "bold", fontSize: 14 }}>
//                   Instructions
//                 </Text>
//                 <Text>{direction}</Text>
//               </Left>
//               <Button
//                 style={{
//                   marginTop: 25,
//                   marginRight: 10,
//                   backgroundColor: "#3480CB",//"red",
//                   paddingRight: 10,
//                   paddingLeft: 10
//                 }}
//                 onPress={this.handleDirections}
//               >
//                 <Text
//                   style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
//                 >
//                   Directions
//                 </Text>
//               </Button>
//             </CardItem>
//           </Card>
//         </TouchableOpacity>
//         <Ad adInfo= {ad}/>
//       <Text style={{marginTop: 10, marginBottom: 5, fontSize: 18, fontWeight: "bold", marginLeft: 25}}>RATE THE RESTROOM</Text>
//       <Ratings item={this.props.item}/>
        
        
//       </Animated.View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Card: {
    flex: 1,
    backgroundColor:  "#fff"//"#f5f5f5"
  }
});
