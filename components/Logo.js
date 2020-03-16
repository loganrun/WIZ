import React from "react";
import {Image} from "react-native"

class LogoTitle extends React.Component {
    render() {
      return (
        <Image
          source={require('../assets/rectangle_logo.png')}
          style={{ width: 75, height: 50, paddingLeft: 30, paddingRight: 30 }}
        />
      );
    }
  }

  export default LogoTitle