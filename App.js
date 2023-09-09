import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import {  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons'

export default class App extends Component {
  state = {
    userInput: '',
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1,  justifyContent: 'flex-end', backgroundColor: '#1e1e1e' }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.userInput}
            placeholder='Digite sua dúvida ...'
            value={this.state.userInput}
            onChangeText={text => this.setState({ userInput: text })}
            placeholderTextColor='#cecece'
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons color='#fff' name='send' size={30} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
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
    backgroundColor: '#0eaa83'
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }
})
