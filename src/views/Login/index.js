import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import useLogin from '../../hooks/useLogin';
import Logo from '../../assets/images/logo.png';

const LoginScreen = props => {
  const navigation = props.navigation;
  const {login, requestToken, error, isLoading} = useLogin();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const request_token = await requestToken();
    const newLogin = await login(username, password, request_token);

    newLogin && navigation.navigate('HomeNavigation');
  };

  return (
    <View style={styles.mainBackground}>
      <View style={styles.loginScreen}>
        <View style={{marginBottom: 25}}>
          <Image source={Logo} />
          <Text style={styles.logoText}>MovieDB</Text>
        </View>
        <TextInput
          placeholderTextColor="#ffffff54"
          style={styles.textInputs}
          autoCorrect={false}
          onChangeText={text => setUserName(text)}
          placeholder="username"
          autoCapitalize="none"
        />
        <TextInput
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="#ffffff54"
          style={styles.textInputs}
          autoCorrect={false}
          onChangeText={text => setPassword(text)}
          placeholder="password"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text
            style={{
              color: '#002d29',
              fontWeight: '700',
              fontSize: 18,
            }}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001323',
  },
  loginScreen: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 25,

    textAlign: 'center',
    fontWeight: '800',
    color: '#04ff8b',
  },
  textInputs: {
    width: 300,
    paddingVertical: 10,
    borderColor: '#ffffff54',
    borderWidth: 1,
    textAlign: 'center',
    marginBottom: 15,
    color: 'white',
    borderRadius: 4,
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: '#04ffe8',
    marginTop: 25,
  },
});

export default LoginScreen;
