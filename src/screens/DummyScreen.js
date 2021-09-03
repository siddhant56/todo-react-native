import React, {useEffect} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

const DummyScreen = ({navigation}) => {
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token !== null) {
      navigation.navigate('Home');
    } else {
      const arr = [];
      await AsyncStorage.setItem('todaytodos', JSON.stringify(arr));
      await AsyncStorage.setItem('grocerytodos', JSON.stringify(arr));
      await AsyncStorage.setItem('personaltodos', JSON.stringify(arr));
      await AsyncStorage.setItem('worktodos', JSON.stringify(arr));

      navigation.navigate('Starter');
    }
  };

  useEffect(() => {
    const willFocus = navigation.addListener('focus', () => {
      checkToken();
    });
  }, []);

  return null;
};

export default DummyScreen;
