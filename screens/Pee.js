import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Modal,
  Text,
  TextInput,
  AsyncStorage
} from 'react-native';
import {
  Button,
} from 'native-base';
import { connect } from 'react-redux';
// import { MapView } from "expo";
import { SafeAreaView } from 'react-navigation';
import DialogInput from 'react-native-dialog-input';

import Maps from '../components/Maps';
import ContentArea from '../components/ContentArea';
import StarRating from '../components/StarRating';
import restApi from '../services/restroom';
import { storeProfileName } from '../store/actions';
import Toast from 'react-native-root-toast';
// let ad = require("../assets/ad.png");
// let bathicon = require('../assets/bath3.png')
// var vid = require("../assets/donut.mp4")

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const SCREEN_WIDTH = Dimensions.get("window").width;

const contentMarginTopAnim = new Animated.Value(200);
const mapTopMarginAnim = new Animated.Value(-250);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Card: {
    flex: 1,
    backgroundColor: '#fff', // "#f5f5f5"
  },
});

class Pee extends Component {
  // componentWillMount() {
  //   this.moveAnimation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 20 });
  // }

  static navigationOptions = {
    title: 'DETAILS',
    headerStyle: {
      backgroundColor: '#3480CB', // "#52AEA0",
      elevation: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

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

  componentDidMount() {
    
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
    const { profileName } = this.props;
    if (profileName === '') {
      Toast.show('Your profile name is empty, Please click Check In', {
        duration: Toast.durations.LONG,
      });
    } else {
      this.setState({
        reviewModal: true,
      })
    }
  }

  saveReview = async() => {
    const { navigation } = this.props;
    const bathroomId = navigation.getParam('item')['_id'];
    const userId = await this.getUserId();
    const { rating } = this.state;
    const review = this.state.reviewContent;
    console.log(bathroomId);
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

  render() {
    // const animatedHeight = {
    //   transform: this.animation.getTranslateTransform()
    // };
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    // console.log(item)
    const curLat = navigation.getParam('currentLat');
    const curLon = navigation.getParam('currentLon');
    // console.log(curLat);
    const { longitude } = item;
    const { latitude } = item;
    const { name } = item;


    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                height: 1200,
                backgroundColor: '#fff',
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                top: mapTopMarginAnim,
                left: 0,
                width: '100%',
                zIndex: 0,
                height: 800,
                backgroundColor: 'blue',
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
                    duration: 400,
                  }).start();

                  Animated.timing(mapTopMarginAnim, {
                    toValue: -100,
                    duration: 400,
                  }).start();
                }}
              />
            </Animated.View>
            <Animated.View
              style={{
                position: 'absolute',
                top: contentMarginTopAnim,
                left: 0,
                width: '100%',
                zIndex: 1,
              }}
            >
              <ContentArea
                item={item}
                sourceLat={curLat}
                sourceLon={curLon}
                doCheckIn={this.doCheckIn}
                leaveReview={this.leaveReview}
              />
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
          presentationStyle='formSheet'
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
            <StarRating
              onRatingChange={(rate) => this.setState({
                rating: rate,
              })}
            />
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
                numberOfLines={8}
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
