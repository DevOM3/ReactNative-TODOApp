/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  Keyboard,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import Todo from './Todo';

const App = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [keys, setKeys] = useState([]);

  const storeData = async () => {
    try {
      let position = todos.length < 10 ? `0${todos.length}` : todos.length;
      if (keys.includes(`key${position}`)) {
        position = `1${position}`;
      }
      await AsyncStorage.setItem(
        `key${position}`,
        `${input}`
      )
    } catch (error) {

    }
  }

  const retriveData = async () => {
    try {
      // await AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
      await AsyncStorage.getAllKeys().then(keys => setKeys(keys));
      await AsyncStorage.getAllKeys().then(keys => console.log(keys));
      setTodos([]);

      await AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiGet(keys).then(data => setTodos(data.map(dataBit => dataBit[1]))));
    } catch (error) {

    }
  }

  const removeTodoFromStorage = async (key) => {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.getAllKeys().then(keys => setKeys(keys));
  }

  const addTodo = () => {
    setTodos([...todos, input]);
    setInput('');

    storeData();
    Keyboard.dismiss();
  }

  const deleteTodo = (id) => {
    alert(`Your TODO: "${todos[id]}" is removed !`);
    removeTodoFromStorage(keys[id]);
    setTodos(todos.filter(todo => todos.indexOf(todo) !== id));
  }

  useEffect(() => {
    retriveData();
  }, []);

  console.log(todos);

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={styles.screen}>
        {
          todos.length === 0
            ? <Text style={styles.heading}>Add your TODOs</Text>
            : <Text style={styles.heading}>Your TODOs !</Text>
        }
        <ScrollView>
          {
            todos.map((todo, key) => (
              <Todo id={key} title={todo} key={key} onPress={deleteTodo} />
            ))
          }
        </ScrollView>

        <View style={styles.entryView}>
          <TextInput
            style={styles.textInput}
            value={input}
            placeholder="Enter your TODO..."
            autoCapitalize="sentences"
            blurOnSubmit={true}
            placeholderTextColor="grey"
            onChangeText={text => setInput(text)}
          />
          <Button title="Add TODO!" onPress={addTodo} style={styles.button} disabled={!input} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#222',
    flex: 1,
  },

  heading: {
    fontSize: 30,
    color: '#EEE',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  entryView: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInput: {
    fontSize: 20,
    flex: 0.95,
    borderColor: 'grey',
    borderWidth: 1,
    height: 44,
    marginHorizontal: 5,
    marginBottom: 7,
    marginTop: 7,
    borderRadius: 11,
    color: "#EEE",
  },

  button: {
    borderWidth: 1,
    borderRadius: 11,
  }
});

export default App;
