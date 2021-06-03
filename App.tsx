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

import { HomeScreen } from './src/screens/Home';
import { KeyScanner } from './src/screens/KeyScanner';
import { AccountsManager } from './src/screens/AccountsManager';

import { AppContext } from './src/utils/appContext';
import { IAccount } from './src/utils/types';

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
  const [account, setAccount] = useState<IAccount>();
  const [accounts, setAccounts] = useState<Array<IAccount>>([]);
  const appContext = { account, setAccount, accounts, setAccounts };
  return (
    <AppContext.Provider value={appContext}>
      <StatusBar barStyle="dark-content" />
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Scan QR" component={KeyScanner} />
            <Drawer.Screen
              name="Accounts Manager"
              component={AccountsManager}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  );
};

export default App;
