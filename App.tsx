
// In App.js in a new project
import Realm from 'realm';
import { AppProvider, createRealmContext, useApp, UserProvider  } from '@realm/react'
import * as React from 'react';
import { View, Text,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login'
import Main from './Main'
import Details2 from './Details2'
import Cardetails from './Cardetails';
import { Provider } from 'react-redux';
import store from './store';
import ChatScreen from './ChatScreen'
import Sellchat from './Sellchat'
const Stack = createNativeStackNavigator();

import { realmContext } from './RealmContext';






const { RealmProvider, useRealm, useObject, useQuery } = realmContext;
const AppWrapper = () => {
  return (
    <AppProvider id="tradeacar-0-xeoov" >
      <UserProvider fallback={LogIn}>
        <App />
      </UserProvider>
    </AppProvider>
  );
}

function App() {

  return (

  
    <RealmProvider
  sync={{
    flexible: true,
    initialSubscriptions: {
      update(subs, realm) {
        subs.add(realm.objects('Room'));
        subs.add(realm.objects('Message'));
      },
    },
    onError: console.log,
  }}>
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen  name="Details2"  component={Details2} />
      <Stack.Screen  name="Cardetails"  component={Cardetails} />
      <Stack.Screen  name="ChatScreen"  component={ChatScreen} />
      <Stack.Screen  name="Sellchat"  component={Sellchat} />
      </Stack.Navigator>
    </NavigationContainer>
   </Provider>
   </RealmProvider>
    
  );
}

function LogIn() {
  const app = new Realm.App({id: "tradeacar-0-xeoov"});


  async function logInUser() {
    try {
      const credentials = Realm.Credentials.emailPassword("ahmusa118@yahoo.com", "System123");
      await app.logIn(credentials);
  
      const user = app.currentUser;
      console.log('Logged in user:', user);
      
      // Fetch additional user data or perform other actions after login
      // ...
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Button
      title='Log In'
      onPress={logInUser}
   
    />
    </View>
  );
}
export default AppWrapper;