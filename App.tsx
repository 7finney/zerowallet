/**
 * ZeroWallet App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { HomeScreen } from './src/Home';
import { KeyScanner } from './src/KeyScanner';
import { TransactionHandler } from './src/TransactionHandler';

declare const global: { HermesInternal: null | {} };
const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'yellow',
  },
};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="KeyScanner" component={KeyScanner} />
            <Drawer.Screen name="Transaction" component={TransactionHandler} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;
