/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    if (type === EventType.ACTION_PRESS && pressAction.id === "mark-as-read") {
        await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
            method: "POST",
        });
        await notifee.cancelNotification(notification.id);
    }
});


AppRegistry.registerComponent(appName, () => App);
