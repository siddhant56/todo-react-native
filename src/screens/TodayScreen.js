import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  LogBox,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TodoComponent from '../components/TodoComponent';

import {Input} from 'react-native-elements';
import {v4 as uuidv4} from 'uuid';

const TodayScreen = ({navigation}) => {
  const [Ttodos, setTTodos] = useState([]);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(false);

  const [todoString, setTodoString] = useState('');
  const [edit, setedit] = useState(false);
  const [updateId, setupdateId] = useState('');

  const handleSubmit = async () => {
    if (edit) {
      setTTodos(
        Ttodos.map((todo) => {
          if (todo.id === updateId) {
            todo.todoString = todoString;
          }
          return todo;
        }),
      );

      await AsyncStorage.setItem('todaytodos', JSON.stringify(Ttodos));
      setTodoString('');
      setedit(false);
      return;
    } else {
      if (todoString === '') {
        Alert.alert('Hello There', 'Please Enter Something', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        return;
      }

      const existingProducts = await AsyncStorage.getItem('todaytodos');

      let already = JSON.parse(existingProducts);

      if (!already) {
        already = [];
      }

      const todo = {
        todoString,
        id: uuidv4(),
        isChecked: false,
        random: Math.floor(Math.random() * 8) + 1,
      };

      already.push(todo);

      await AsyncStorage.setItem('todaytodos', JSON.stringify(already));

      setTTodos([...Ttodos, todo]);

      setTodoString('');
    }
  };
  const getTodos = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const localTodos = await AsyncStorage.getItem('todaytodos').then(
        (value) => {
          const arr = JSON.parse(value);
          setTTodos(arr);
          setlength(arr.length);
          setLoading(false);
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    const willFocus = navigation.addListener('focus', () => {
      getTodos();
    });
  }, []);

  const markComplete = (id) => {
    setTTodos(Ttodos.filter((todo) => todo.id != id));
  };

  const changeBool = async (id) => {
    setTTodos(
      Ttodos.filter((todo) => {
        if (todo.id === id) {
          todo.isChecked = !todo.isChecked;
        }
        return todo;
      }),
    );

    await AsyncStorage.setItem('todaytodos', JSON.stringify(Ttodos));
  };

  if (!loading && Ttodos.length !== 0) {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '80%',
            position: 'absolute',
            bottom: 0,
          }}>
          <Input
            placeholder="Enter Todo"
            value={todoString}
            onChangeText={(text) => {
              setTodoString(text);
            }}
            placeholderTextColor="#3d3d3d"
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{position: 'absolute', top: 10, left: 10}}>
          <Image
            source={require('../../assets/back1.png')}
            style={{height: 35, width: 35}}
          />
        </TouchableOpacity>
        <View style={styles.headingConatiner}>
          <Image
            source={require('../../assets/todo.jpg')}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={{color: '#636e72', fontFamily: 'OpenSans-Regular'}}>
              {Ttodos.length} Tasks
            </Text>
            <Text style={{fontSize: 30, fontFamily: 'OpenSans-SemiBold'}}>
              Today
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={styles.floatButton}>
          <Image
            source={require('../../assets/plus.jpg')}
            style={{height: 44, width: 44, borderRadius: 22}}
          />
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.todosContainer}>
          <FlatList
            data={Ttodos}
            renderItem={({item}) => {
              return (
                <TodoComponent
                  routeName="Today"
                  name={item.todoString}
                  changeBool={changeBool}
                  isSelected={item.isChecked}
                  id={item.id}
                  complete={markComplete}
                  rnd={item.random}
                  setupdateId={setupdateId}
                  setTodoString={setTodoString}
                  setEdit={setedit}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
    );
  }

  if (!loading && Ttodos.length == 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#7efff5',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingTop: 40,
          paddingLeft: 20,
        }}>
        <Image
          source={require('../../assets/cat.jpg')}
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
            position: 'absolute',
            alignSelf: 'center',
            top: '40%',
            bottom: '60%',
          }}
        />

        <View
          style={{
            width: '80%',
            position: 'absolute',
            bottom: 0,
          }}>
          <Input
            placeholder="Enter Todo"
            value={todoString}
            onChangeText={(text) => {
              setTodoString(text);
            }}
            placeholderTextColor="#3d3d3d"
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{position: 'absolute', top: 10, left: 10}}>
          <Image
            source={require('../../assets/back1.png')}
            style={{height: 35, width: 35}}
          />
        </TouchableOpacity>
        <View style={styles.headingConatiner}>
          <Image
            source={require('../../assets/todo.jpg')}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={{color: '#636e72', fontFamily: 'OpenSans-Regular'}}>
              {Ttodos.length} Tasks
            </Text>
            <Text style={{fontSize: 30, fontFamily: 'OpenSans-SemiBold'}}>
              Today
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={styles.floatButton}>
          <Image
            source={require('../../assets/plus.jpg')}
            style={{height: 44, width: 44, borderRadius: 22}}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return <View style={styles.container}></View>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7efff5',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 50,
  },
  headingConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginBottom: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  textContainer: {
    marginBottom: 9,
    marginLeft: 10,
  },
  floatButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    position: 'absolute',
    bottom: 28,
    right: 30,
    height: 40,
    backgroundColor: '#1B9CFC',
    borderRadius: 100,
  },
  todosContainer: {
    marginBottom: 90,
    width: '100%',
    flex: 1,
  },
});

export default TodayScreen;
