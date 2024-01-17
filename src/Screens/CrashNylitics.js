import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

const CrashNylitics = () => {
  const getUserData = () => {
    return new Promise((resolve, reject) => {
      resolve('Success');
      reject('Error');
    });
  };

  const onPressGoBack = () => {
    console.log('button pressed');
  };

  useEffect(() => {
    crashlytics().crash();
    crashlytics().log('App Mounted.');
    getUserData()
      .then(res => {
        console.log('res', res);
        crashlytics().setUserId('USER ID DATA');
        crashlytics().setAttribute('USER_NAME', 'KRISH');
      })
      .catch(err => {
        console.log('err', err);
        crashlytics().recordError(err);
      });
    return () => {
      crashlytics().log('App Unmounted.');
    };
  }, []);

  return (
    <View style={localStyles.main}>
      <TouchableOpacity style={localStyles.button} onPress={onPressGoBack}>
        <Text>This is Crash</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CrashNylitics;

const localStyles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 180,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
