import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {CheckBox} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../components/colors';

const TodoComponent = ({
  name,
  isSelected,
  id,
  routeName,
  changeBool,
  complete,
  rnd,
  setupdateId,
  setTodoString,
  setEdit,
}) => {
  const deleteTodo = async (id) => {
    if (routeName === 'Today') {
      complete(id);

      const existing = await AsyncStorage.getItem('todaytodos');
      let modify = JSON.parse(existing);
      const postsItems = modify.filter(function (e) {
        return e.id !== id;
      });

      await AsyncStorage.setItem('todaytodos', JSON.stringify(postsItems));
    }
    if (routeName === 'Work') {
      complete(id);

      const existing = await AsyncStorage.getItem('worktodos');
      let modify = JSON.parse(existing);
      const postsItems = modify.filter(function (e) {
        return e.id !== id;
      });

      await AsyncStorage.setItem('worktodos', JSON.stringify(postsItems));
    }
    if (routeName === 'Person') {
      complete(id);
      const existing = await AsyncStorage.getItem('personaltodos');
      let modify = JSON.parse(existing);
      const postsItems = modify.filter(function (e) {
        return e.id !== id;
      });

      await AsyncStorage.setItem('personaltodos', JSON.stringify(postsItems));
    }
    if (routeName === 'Grocery') {
      complete(id);
      const existing = await AsyncStorage.getItem('grocerytodos');
      let modify = JSON.parse(existing);
      const postsItems = modify.filter(function (e) {
        return e.id !== id;
      });

      await AsyncStorage.setItem('grocerytodos', JSON.stringify(postsItems));
    }
  };
  const changeTodos = async (id) => {
    setEdit(true);
    setupdateId(id);
    setTodoString(name);
  };

  const dynamicStyle = () => {
    if (isSelected == true) {
      return {
        textDecorationLine: 'line-through',
        color: 'gray',

        fontSize: 19,
        fontFamily: 'Lato-Regular',
      };
    } else {
      return {
        color: 'black',

        fontSize: 19,
        fontFamily: 'Lato-Regular',
        color: colors[rnd],
      };
    }
  };

  return (
    <View style={styles.todoList}>
      <CheckBox
        checkedIcon={
          <Image
            source={require('../../assets/checked.jpg')}
            style={{height: 35, width: 35}}
          />
        }
        uncheckedIcon={
          <Image
            source={require('../../assets/square.jpg')}
            style={{height: 35, width: 35}}
          />
        }
        checked={isSelected}
        onPress={() => {
          changeBool(id);
        }}
      />
      <View style={{paddingRight: 30, marginRight: 30}}>
        <Text style={dynamicStyle()}>{name}</Text>
      </View>
      {isSelected ? (
        <TouchableOpacity
          style={{position: 'absolute', right: 2}}
          onPress={() => {
            deleteTodo(id);
          }}>
          <Icon name="trash-o" size={25} color="red" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{position: 'absolute', right: 2}}
          onPress={() => {
            changeTodos(id);
          }}>
          <Icon name="edit" size={25} color={colors[rnd]} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  todoList: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  checkbox: {
    height: 22,
    width: 22,
  },
});

export default TodoComponent;
