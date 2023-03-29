/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AppContainer from './src/navigation';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux';
import Store from './src/redux/store';
import FlashMessage from 'react-native-flash-message'
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [generatedToken, setGeneratedToken] = useState();

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  useEffect(() => {
    requestFCMPermission();
    const unsubMessaging = messaging().onMessage(onMessageHandler)
    return () => {
      unsubMessaging()
    }
  }, [])

  const requestFCMPermission = async () => {
    const authResponse = await messaging().requestPermission();
    const enabled = authResponse === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      setGeneratedToken(fcmToken)
    }
  }

  const onMessageHandler = async (remoteMessage) => {
    const { notification, data } = remoteMessage;
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    console.log(notification, data, 'noti -=--=--=--')

    await notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
      // data: data
    })
  }

  console.log(generatedToken)

  const store = Store()
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store} >
        <AppContainer />
        <FlashMessage position='bottom' />
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
});

export default App;
