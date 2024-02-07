import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Easing} from 'react-native';
import pages from '../pages';

export type RootStackParamList = {
  UserPage: undefined;
  AddUserPage: {
    id: string | '0';
  };

  DetailUserPage: {
    id: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          backgroundColor: 'transparent',
        },
        cardStyle: {
          backgroundColor: 'white',
        },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 150,
              easing: Easing.linear,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 200,
              easing: Easing.linear,
            },
          },
        },
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}>
      <Stack.Screen
        name="UserPage"
        options={{title: 'User', headerShown: false}}
        component={pages.UserPage}
      />
      <Stack.Screen
        name="AddUserPage"
        options={{title: 'Add User', headerShown: false}}
        component={pages.AddUserPage}
      />
      <Stack.Screen
        name="DetailUserPage"
        options={{title: 'Detail User', headerShown: false}}
        component={pages.DetailUserPage}
      />
    </Stack.Navigator>
  );
};
