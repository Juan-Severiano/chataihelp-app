import { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ImageBackground, Alert } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import axios from 'axios'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    stageNew: false,
    showError: false,
    errors: []
  }

  signinOrSignup = () => {
    if (this.state.stageNew) {
      this.register()
      Alert.alert('Sucesso!', 'Criar conta')
    } else {
      this.login()
      Alert.alert('Sucesso!', 'Logar')
    }
    console.log(this.state)
  }

  login = async () => {
    console.log('iniciando o login');

    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    try {
      const response = await axios.post(
        'https://teenpod.pythonanywhere.com/api/token/',
        data,
        { headers }
      );

      console.log('STATUS Login', response.status);
      console.log(response.data);

      if (response.status === 200) {
        this.props.navigation.navigate('Chat');
      } else if (response.status === 400 || response.status === 401) {
        this.setState({ showError: true });
        const errors = [];
        response.data.username ? errors.push(`Email: ${response.data.username}`) : null;
        response.data.password ? errors.push(`Senha: ${response.data.password}`) : null;
        response.data.detail ? errors.push(`Erro: ${response.data.detail}`) : null;
        console.log(errors);
        this.setState({ errors });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }

  register = async () => {
    console.log('iniciando o registro');

    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      username: this.state.username,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      password: this.state.password,
      confirm_password: this.state.confirmPassword
    };

    try {
      const response = await axios.post(
        'https://teenpod.pythonanywhere.com/api/users/',
        data,
        { headers }
      );

      console.log('STATUS Register', response.status);
      console.log(response.data);

      if (response.status === 201) {
        this.setState({
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          confirmPassword: '',
          stageNew: false,
          showError: false,
          errors: []
        })
      } else if (response.status === 400 || response.status === 401) {
        this.setState({ showError: true });
        const errors = [];
        response.data.username ? errors.push(`Email: ${response.data.username}`) : null;
        response.data.password ? errors.push(`Senha: ${response.data.password}`) : null;
        response.data.detail ? errors.push(`Erro: ${response.data.detail}`) : null;
        console.log(errors);
        this.setState({ errors });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  } 
  

  render() {
    return (
      <ImageBackground source={require('../../assets/auth-page.png')} style={styles.container}>
        <Text style={styles.title}>
          {this.state.stageNew ? 'Crie sua conta' : 'Faça seu Login'}
        </Text>
        <TextInput
          placeholder='Nome de Usuário, sem espaços, somente letra minuscula sem acento'
          style={styles.input}
          autoFocus={true}
          value={this.state.username}
          placeholderTextColor='#cecece'
          onChangeText={username => this.setState({ username })}
        />
        {this.state.stageNew ?
          <>
            <TextInput
              placeholder='Primeiro Nome'
              style={styles.input}
              value={this.state.firstName}
              placeholderTextColor='#cecece'
              onChangeText={firstName => this.setState({ firstName })}
            />
            <TextInput
              placeholder='Segundo/Ultimo Nome'
              style={styles.input}
              value={this.state.lastName}
              placeholderTextColor='#cecece'
              onChangeText={lastName => this.setState({ lastName })}
            />

          </>
          : null}
        <TextInput
          placeholder='Insira sua Senha Aqui'
          style={styles.input}
          secureTextEntry={true}
          value={this.state.password}
          placeholderTextColor='#c0c0c0'
          onChangeText={password => this.setState({ password })}
        />
        {this.state.stageNew ?
          <TextInput
            placeholder='Confirme sua senha'
            style={styles.input}
            secureTextEntry={true}
            value={this.state.confirmPassword}
            placeholderTextColor='#c0c0c0'
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
          />
          : null}
        {this.state.showError ?
          <View style={styles.buttomError}>
            <FlatList
              data={this.state.errors}
              keyExtractor={item => `${item.id}`}
              renderItem={({ item }) => {
                return <Text style={styles.buttomTextError}><Ionicons name='close' size={20} />{item}</Text>
              }} /></View> : null}
        <TouchableOpacity onPress={this.signinOrSignup} style={styles.buttom}>
          <Text style={styles.buttomText}>{this.state.stageNew ? 'Registrar' : 'Entrar'}  </Text>
          <Ionicons name='log-in-outline' size={25} color='#fff' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({ stageNew: !this.state.stageNew })
          }}

          style={{
            marginTop: 20,
            width: '80%',
            alignItems: 'center',
            flexDirection: 'row'
          }} >
          <Text style={{
            fontSize: 15,
            color: '#c0c0c0',
          }}>
            {this.state.stageNew ? 'Já possui uma conta? Entrar' : 'Não possui conta? Criar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => {
            this.props.navigation.navigate('Chat')
        }}
        style={{
            marginTop: 10,
            width: '80%',
            alignItems: 'center',
            flexDirection: 'row'
          }} >
          <Text style={{
            fontSize: 15,
            color: '#c0c0c0',
          }}>
            Entrar como anônimo
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161616'
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    color: '#d0d0d0',
    width: '80%',
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#00d8ff',
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttomError: {
    marginTop: 10,
    padding: 10,
    borderWidth: 5,
    borderColor: '#dc3545',
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  buttomTextError: {
    fontSize: 10,
    color: '#dc3545',
  },
  buttomText: {
    fontSize: 20,
    color: '#fff',
  },
  input: {
    marginTop: 10,
    width: '80%',
    backgroundColor: '#555',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    borderRadius: 10,
    color: '#fff'
  },
})