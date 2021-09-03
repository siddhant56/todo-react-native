import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const StarterScreen = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  useEffect(() => {
    AsyncStorage.setItem('token', 'SignedIn');
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/todo.jpg')}
        style={{width: width / 2, height: width / 2, borderRadius: width / 4}}
      />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Get Organised Your Life</Text>
        <View style={{marginBottom: 12, marginTop: 5}}>
          <Text style={styles.subtitle}>Todo is a simple and effective</Text>
          <Text style={styles.subtitle}>to-do list and task manager app</Text>
          <Text style={styles.subtitle}>which helps you to manage time</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <View>
          <Text style={styles.buttonText}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#7efff5',
  },
  image: {
    height: 220,
    width: 220,
    borderRadius: 110,
  },
  textContainer: {
    marginTop: 40,
  },
  mainText: {
    fontSize: 24,
    alignSelf: 'center',
    fontFamily: 'OpenSans-Bold',
    marginBottom: 12,
  },
  subtitle: {
    alignSelf: 'center',
    color: '#485460',
    fontSize: 17.5,
    fontFamily: 'OpenSans-Regular',
  },
  buttonContainer: {
    height: 50,
    width: '90%',
    backgroundColor: '#00d2d3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',

    fontSize: 19,
    fontWeight: '800',
    marginBottom: 4,
    fontFamily: 'OpenSans-Regular',
  },
});

export default StarterScreen;
