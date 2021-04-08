import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import useLogin from '../../hooks/useLogin';

import {GET_REQUEST_TOKEN} from '../../utils/asyncStorage';
import {useEffect} from 'react/cjs/react.development';
import {CommonActions} from '@react-navigation/native';
import moment from 'moment';

export default props => {
  const navigation = props.navigation;

  const backToLogin = home => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: home === 'Home' ? 'HomeNavigation' : 'Login',
          },
        ],
      }),
    );
  };

  const getToken = async () => {
    const date = new Date();
    const request_token = await GET_REQUEST_TOKEN();

    if (request_token.token) {
      const expiredDate = moment(request_token?.expires_at).format(
        'DD/MM/YYYY hh:mm:ss a',
      );
      const dateNow = moment(date).format('DD/MM/YYYY hh:mm:ss a');

      backToLogin(expiredDate === dateNow ? '' : 'Home');
    } else {
      backToLogin();
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#001323',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" />
    </View>
  );
};
