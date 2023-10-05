import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from '../components/Header';
import ResponseContainer from '../components/responseContainer';
import conversation from '../assets/conversation'

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    {
      user: false,
      msg: "Olá, seja bem vindo a nossa plataforma, em que posso lhe ajudar? ",
    },
  ]);

  const main = (prompt) => {
    fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
        "OpenAI-Organization": "org-3dkAnZx3PnWUlpbhM2MISlri"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: `${prompt} gere oque deve ser feito após isso, oque e quem deve ser procurado para que o problema seja resolvido` }],
        max_tokens: 256,
        temperature: 0.4,
      }),
    })
    .then(response => response.json())
    .then(json =>{
      const msgContents = {
        user: false,
        msg: json.choices[0].message.content,
      };
      console.log(json)
      setMessages(prevMessages => [...prevMessages, msgContents]);
    })
    .catch(e => console.log(e))
  }

  const saveUserMessages = () => {
    if (userInput.trim() === '') {
      return;
    }
  
    const userMsgContent = {
      user: true,
      msg: userInput,
    };
  
    setMessages(prevMessages => [...prevMessages, userMsgContent]);
  
    main(userInput);
  
    setUserInput('');
  };

  return (
    <>
      <SafeAreaView style={{ flex: 2, backgroundColor: '#1e1e1e', width: '100%' }}>
        <StatusBar barStyle="light-content" />
        <Header />
        <FlatList
          data={conversation}
          renderItem={({ item }) => {
            if (item.user === true) return <ResponseContainer msg={item.msg} userMsg={item.user}  />;
            return <ResponseContainer
              msg={item.msg}
            />;
          }
          }
        />
        <View style={styles.inputContainer}>
          <View style={[ styles.inputContainer, { backgroundColor: '#1e1e1e', height: 80 } ]}>
            <TextInput
              style={styles.userInput}
              placeholder='Digite sua dúvida ...'
              value={userInput}
              onChangeText={text => setUserInput(text)}
              placeholderTextColor='#cecece'
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                saveUserMessages()
              }}
            >
              <Ionicons color='#fff' name='send' size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
    marginTop: '93%',
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
