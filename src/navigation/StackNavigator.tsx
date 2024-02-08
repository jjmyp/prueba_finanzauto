import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Easing} from 'react-native';
import pages from '../pages';
import HeaderScreen from '../components/HeaderScreen';
import { colores } from '../styles/colores';

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
        header: ({options}) => {
          console.log(options.title);
          return <HeaderScreen title={options.title} color={colores.primary} />;
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
        options={{title: 'Inicio'}}
        component={pages.UserPage}
      />
      <Stack.Screen
        name="AddUserPage"
        options={{title: 'Crear usuario'}}
        component={pages.AddUserPage}
      />
      <Stack.Screen
        name="DetailUserPage"
        options={{title: 'Detalle de registro'}}
        component={pages.DetailUserPage}
      />
    </Stack.Navigator>
  );
};
