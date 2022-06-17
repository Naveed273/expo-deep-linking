import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

const prefix = Linking.makeUrl('/');

export default function App() {
  const [data, setdata] = useState(null);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: 'home',
        Settings: 'settings',
      },
    },
  };

  useEffect(() => {
    /*
    This function will check for the initial url when the app get cold started
    */
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        setdata(Linking.parse(initialURL));
      }
    }
    /*
    this method checks whether the opens via a link or not
    */
    Linking.addEventListener('url', handleDeepLink);
    if (!data) {
      getInitialURL();
    }
    return () => {
      Linking.removeEventListener('url');
    };
  }, []);
  const handleDeepLink = (event) => {
    setdata(Linking.parse(event.url));
  };
  return (
    <View style={styles.container}>
      <Text>
        {data ? JSON.stringify(data) : 'App not opened from deep link'}
      </Text>
      <Button
        title="Open Link in browser"
        onPress={() => Linking.openURL('https://docs.expo.io')}
      />
      <Button
        title="Open Link within  Appbrowser"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
