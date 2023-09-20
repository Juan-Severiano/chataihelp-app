import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


export default function App() {
  const [userInput, setUserInput] = useState('');
  const [chatResponse, setChatResponse] = useState('AI: Seja bem vindo a nossa plataforma');
  const [ chatResponses, setChatResponses ] = useState([])

  const sendQuestion = () => {
    const sQuestion = userInput;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY,
        "OpenAI-Organization": "org-04099gNSWTCq4d35T0hE2l09"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        prompt: sQuestion,
        max_tokens: 2048,
        temperature: 0.5,
      }),
    })
    .then(response => response.json())
    .then(json => {
      if (chatResponse) {
        setChatResponse(chatResponse + "{'\n'}")
        setChatResponses([chatResponse])
      };

      if (json.error?.message) {
        setChatResponse(chatResponse + "{'\n'}" + `Error: ${json.error.message}`);
      } else if (json.choices?.[0].text) {
        const text = json.choices[0].text || "Sem resposta";
        setChatResponse(chatResponse + "AI: " + text);
      }
    })
    .catch(e => console.log(e))
    .finally(() => {
      setUserInput('');
    });
    if (chatResponse) setChatResponse(chatResponse + "{'\n\n\n'}");
    setUserInput('Carregando');
  }

  return (
    <>
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e1e1e' }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.responseContainer}>
        <Text style={{ color: '#fff' }}>
          {chatResponse}
        </Text>
        <Text style={{ color: '#fff' }}>
          asasdasdasdas {'\n'} asdasdasda
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.userInput}
          placeholder='Digite sua dúvida ...'
          value={userInput}
          onChangeText={text => setUserInput(text)}
          placeholderTextColor='#cecece'
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendQuestion}>
          <Ionicons color='#fff' name='send' size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  userInput: {
    backgroundColor: '#151515',
    borderRadius: 40,
    padding: 20,
    width: '75%',
    color: '#fff',
    margin: 10
  },
  sendButton: {
    padding: 20,
    borderRadius: 40,
    backgroundColor: '#00d8ff'
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  responseContainer: {
    width: '90%',
    marginTop: 20,
  }
});
