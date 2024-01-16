import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import {
  getTokenMessage,
  notificationRequestPermission,
  onForeGroundEvent,
} from '../utils/Notifications';

export const AuthenticationScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressRegister = async () => {
    console.log('onPressRegister', email, password);
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log('response', response);
      await analytics().logEvent('register', {
        email: email,
        password: password,
      });
      if (!!response) {
        props.navigation.navigate('CartScreen');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    notificationRequestPermission();
    onForeGroundEvent();
    getTokenMessage();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="Register" onPress={onPressRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 10,
  },
});

export default AuthenticationScreen;
