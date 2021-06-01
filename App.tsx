/**
 * ZeroWallet App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { HomeScreen } from './src/Home';
import { KeyScanner } from './src/KeyScanner';
import { TransactionHandler } from './src/TransactionHandler';

import { AppContext } from './src/appContext';
import { IAccount } from './src/types';

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
  const [accounts, setAccounts] = useState<Array<IAccount>>([]);
  const appContext = { accounts, setAccounts };
  return (
    <AppContext.Provider value={appContext}>
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
    </AppContext.Provider>
  );
};

export default App;
