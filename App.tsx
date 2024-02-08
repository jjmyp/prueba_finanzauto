import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// import { DrawerNavigator } from './src/navigation/DrawerNavigator';
import { StackNavigator } from './src/navigation/StackNavigator';
// import { TabNavigator } from './src/navigation/TabNavigator';

function App(): JSX.Element {
  return (
    <NavigationContainer >
      {/* <DrawerNavigator/> */}
      <StackNavigator />
      {/* <TabNavigator /> */}
    </NavigationContainer>
  );
}



export default App;
