import React, { Component, useState } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';
import Intro from './Slider'

export default function App(props) {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        >
        <Intro onDoneAllSlides = {props.closeModal}
        />
      </Modal>
    </View>
  );
}

// onSkipSlides = { () => 
//     this.setState({ newUsher: false })
//   }