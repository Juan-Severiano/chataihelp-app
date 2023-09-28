import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import Header from './components/Header';
import ResponseContainer from './components/responseContainer';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [chatResponse, setChatResponse] = useState(
    'AI: Seja bem vindo a nossa plataforma'
  );
  const [messages, setMessages] = useState([]);

  const saveUserMessages = () => {
    if (userInput.trim() === '') {
      return; // Evita adicionar mensagens em branco à lista
    }

    const msgContent = {
      user: true,
      msg: userInput,
    };

    setMessages([...messages, msgContent]);
    setUserInput('')
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#1e1e1e' }}>
        <StatusBar barStyle="light-content" />
        <Header />
        <View style={styles.chatContainer}>
          <View style={{ width: '100%', zIndex: -2 }}>
          <ResponseContainer
                key={8}
                msg='Olá, seja bem vindo, me diga sua dúvida'
                userMsg={false}
              />
            {messages.map((item, index) => (
              <ResponseContainer
                key={index}
                msg={item.msg}
                userMsg={item.user}
              />
            ))}
          </View>
          
        </View>
        
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.userInput}
          placeholder='Digite sua dúvida ...'
          value={userInput}
          onChangeText={text => setUserInput(text)}
          placeholderTextColor='#cecece'
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={saveUserMessages}
        >
          <Ionicons color='#fff' name='send' size={30} />
        </TouchableOpacity>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  chatContainer: {
    height: '92%',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  userInput: {
    backgroundColor: '#151515',
    borderRadius: 40,
    padding: 20,
    width: '75%',
    color: '#fff',
    margin: 10
  },
  sendButton: {
    padding: 15,
    borderRadius: 40,
    backgroundColor: '#00d8ff'
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '87%',
    marginBottom: 20,
    zIndex: 2,
    position: 'absolute',
  },
  responseContainer: {
    width: '60%',
    backgroundColor: '#151515',
    marginTop: 20,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 25,
  },
  userResponseContainer: {
    marginLeft: 150,
  },
});
