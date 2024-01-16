import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Clipboard from '@react-native-clipboard/clipboard';

const CartScreen = () => {
  const [generalLink, setGeneralLink] = useState(null);

  const buildLink = async () => {
    const link = await dynamicLinks().buildLink({
      link: 'https://www.youtube.com',
      domainUriPrefix: 'https://mynewprojectfirebase.page.link/krish',
      analytics: {
        campaign: 'banner',
      },
    });

    setGeneralLink(link);
  };

  const handleDynamicLink = link => {
    console.log('link', link);
    if (link.url === 'https://www.youtube.com') {
      Alert.alert('If condition in foreground mode');
    } else {
      Alert.alert('Else Condition in foreground mode');
    }
  };

  useEffect(() => {
    const DynamicLinkVar = dynamicLinks().onLink(handleDynamicLink);
    return () => DynamicLinkVar();
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link.url === 'https://www.youtube.com') {
          Alert.alert('If condition in kill mode');
        } else {
          Alert.alert('Else Condition in kill mode');
        }
      });
  }, []);

  const openLink = () => {
    Clipboard.setString(generalLink);
  };

  return (
    <View style={styles.container}>
      <Text>{generalLink}</Text>
      <TouchableOpacity style={styles.button} onPress={buildLink}>
        <Text style={styles.buttonText}>Generate Deep Link</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openLink}>
        <Text style={styles.buttonText}>Copy Deep Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkred',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
