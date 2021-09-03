import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useRoute, useFocusEffect} from '@react-navigation/native';

import Card from '../components/Card';

const HomeScreen = ({navigation}) => {
  const [today, settoday] = useState(0);
  const [work, setwork] = useState(0);
  const [person, setperson] = useState(0);
  const [grocery, setgrocery] = useState(0);

  var gettodayTodos = async () => {
    try {
      const todayTodos = await AsyncStorage.getItem('todaytodos').then(
        (value) => {
          const today = JSON.parse(value);
          settoday(today.length);
        },
      );
    } catch (error) {
      console.log(error);
    }

    try {
      const workTodos = await AsyncStorage.getItem('worktodos').then(
        (value) => {
          const work = JSON.parse(value);
          setwork(work.length);
        },
      );
    } catch (error) {
      console.log(error);
    }

    try {
      const personalTodos = await AsyncStorage.getItem('personaltodos').then(
        (value) => {
          const person = JSON.parse(value);
          setperson(person.length);
        },
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const groceryTodos = await AsyncStorage.getItem('grocerytodos').then(
        (value) => {
          const grocery = JSON.parse(value);
          setgrocery(grocery.length);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const willFocus = navigation.addListener('focus', () => {
      gettodayTodos();
    });
  }, []);

  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route.name === 'Home') {
          return BackHandler.exitApp();
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainText}>
        <Text style={{fontSize: 18, fontFamily: 'OpenSans-Bold'}}>
          Hello There
        </Text>
        <Text style={{fontSize: 14, fontFamily: 'OpenSans-Regular'}}>
          Today You Have {today} Tasks
        </Text>
      </View>
      <Image
        source={require('../../assets/avatar1.jpg')}
        style={{
          height: Dimensions.get('window').height * 0.23,
          width: Dimensions.get('window').height * 0.23,
          alignSelf: 'flex-end',
          position: 'absolute',
          top: 0,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{width: '100%', paddingBottom: 10, paddingTop: 5}}>
        <Card
          title="Today"
          subTitle={today}
          image={require('../../assets/todo.jpg')}
          routeName="Today"
          navigation={navigation}
        />
        <Card
          title="Work"
          subTitle={work}
          image={require('../../assets/work.jpg')}
          routeName="Work"
          navigation={navigation}
        />
        <Card
          title="Personal"
          subTitle={person}
          image={require('../../assets/personal.jpg')}
          routeName="Person"
          navigation={navigation}
        />
        <Card
          title="Grocery"
          subTitle={grocery}
          image={require('../../assets/grocery.jpg')}
          routeName="Grocery"
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7efff5',
    justifyContent: 'center',
  },
  mainText: {
    paddingTop: Dimensions.get('window').height * 0.08,
    paddingLeft: 40,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    width: '100%',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  avatarContainer: {},
});

export default HomeScreen;
