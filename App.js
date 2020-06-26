import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {fcmService} from './src/FCMService';
import {localNotificationService} from './src/LocalNotificationService';

export default function App() {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification', notify);
      alert('Open Notification' + notify.body);
    }

    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unRegister();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Sanmple React Native Firebase V7</Text>
      <Button
        title="Press Me"
        onPress={() => localNotificationService.cancelAllLocalNotifications()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
