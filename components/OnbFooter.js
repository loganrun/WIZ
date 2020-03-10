import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
// import { Container, Tracker, Circle } from './styledComponents';
import Icon from './Icon';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: 16px;
  margin-left: 16px;
  margin-right: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
`;

const Tracker = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 80;
`;

const Circle = styled.View`
  height: 10px;
  width: 10px;
  background-color: ${props => (props.color ? '#fff' : '#a9c3c7')};
  align-items: center;
  justify-content: center;
  border-radius: 100;
`;

const IntroFooter = ({ navigation }) => {
  const indexOfCurrentScreen = navigation.state.index;
  const nameOfScreen = index => navigation.state.routes[index].routeName;
  const nameOfNextScreen = () =>
    indexOfCurrentScreen !== 2
      ? navigation.navigate(nameOfScreen(indexOfCurrentScreen + 1))
      : navigation.navigate('Home');
  const trackerColor = indexOfComp => indexOfCurrentScreen === indexOfComp;
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Icon iconName="home" />
      </TouchableOpacity>
      <Tracker>
        {[0, 1, 2].map(indexOfComp => (
          <Circle key={indexOfComp} color={trackerColor(indexOfComp)} />
        ))}
      </Tracker>
      <TouchableOpacity onPress={nameOfNextScreen}>
        <Icon iconName={indexOfCurrentScreen === 2 ? 'check' : 'arrowright'} />
      </TouchableOpacity>
    </Container>
  );
};
export default withNavigation(IntroFooter);