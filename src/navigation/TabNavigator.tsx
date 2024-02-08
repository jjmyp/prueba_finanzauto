import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import pages from '../pages';
// import { StackNavigator} from './StackNavigator';
import pages from '../pages';
// import {StackScreenProps} from '@react-navigation/stack';

// import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type RootTabParamList = {
  UserPage: undefined;
  // Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// type TabNavigator = StackScreenProps<RootStackParamList, 'Tab'>;

 export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="StackNavigator" component={StackNavigator} /> */}
      <Tab.Screen name="UserPage" component={pages.UserPage} />
      {/* <Tab.Screen name="Customer" component={pages.CustomerPage} /> */}
    </Tab.Navigator>
  );
};

