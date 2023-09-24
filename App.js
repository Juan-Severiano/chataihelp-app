import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import OpenAI from 'openai';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [chatResponse, setChatResponse] = useState('AI: Seja bem vindo a nossa plataforma');

  const openai = new OpenAI({ apiKey: '' });

  const main = async () => {
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: "Say this is a test.",
      max_tokens: 7,
      temperature: 0,
    });

    setChatResponse(completion.choices[0].text)
    console.log(completion);
  }

  return (
    <>
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e1e1e' }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.responseContainer}>
        <Text style={{ color: '#fff' }}>
          {chatResponse}
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
        <TouchableOpacity style={styles.sendButton} onPress={main}>
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
