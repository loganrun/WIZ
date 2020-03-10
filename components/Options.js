import React from 'react';

import OnbFooter from '../components/OnbFooter';

const footer = () => <OnbFooter />;

export const options = {
  initialRouteName: 'OnBoard1',
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarComponent: footer,
};