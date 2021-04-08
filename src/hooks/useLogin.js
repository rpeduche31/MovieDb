import {useState} from 'react';

import {apiCall, apiKey} from '../api';
import {
  SET_REQUEST_TOKEN,
  GET_REQUEST_TOKEN,
  SET_SESSION_ID,
  GET_SESSION_ID,
} from '../utils/asyncStorage';

const useLogin = () => {
  const [error, setError] = useState('');

  const [isLoading, setLoading] = useState();

  const requestToken = async () => {
    setLoading(true);

    try {
      const data = await apiCall.get(
        `authentication/token/new?api_key=${apiKey}`,
      );

      setLoading(false);
      await SET_REQUEST_TOKEN({
        token: data?.data?.request_token,
        expires_at: data?.data?.expires_at,
      });
      return data.data.request_token;
    } catch (err) {
      let {response} = err;
      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  const createNewSession = async () => {
    setLoading(true);
    const request_token = await GET_REQUEST_TOKEN();

    try {
      const data =
        request_token.token &&
        (await apiCall.post(`authentication/session/new?api_key=${apiKey}`, {
          request_token: request_token.token,
        }));

      setLoading(false);
      await SET_SESSION_ID(data?.data?.session_id);
      return data;
    } catch (err) {
      let {response} = err;
      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  const login = async (username, password, request_token) => {
    setLoading(true);
    try {
      const data = await apiCall.post(
        `authentication/token/validate_with_login?api_key=${apiKey}`,
        {username, password, request_token},
      );

      createNewSession();
      setLoading(false);
      return data;
    } catch (err) {
      let {response} = err;

      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  const getAccountDetails = async () => {
    setLoading(true);
    const session_id = await GET_SESSION_ID();
    try {
      const data = await apiCall.get(
        `account?api_key=${apiKey}&session_id=${session_id}`,
      );

      setLoading(false);
      return data;
    } catch (err) {
      let {response} = err;

      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  return {
    createNewSession,
    getAccountDetails,
    login,
    requestToken,
    error,
    isLoading,
    setError,
  };
};

export default useLogin;
