import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidStyle} from '@notifee/react-native';

export const notificationRequestPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const onMessageListener = async () => {
  NotificationsAndroid.setNotificationChannel({
    channelId: 'default',
    name: 'Default Channel',
  });
};

export const getTokenMessage = async () => {
  const getToken = await messaging().getToken();
  console.log('getToken', getToken);
};

export const notifeeNotification = async () => {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: 'Hey user this is Title',
    body: 'Hey user this is Body',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture:
          'https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg',
      },
    },
  });
};

export const onForeGroundEvent = async () => {
  messaging().onMessage(() => {
    notifeeNotification();
  });
};
