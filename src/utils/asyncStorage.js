import AsyncStorage from '@react-native-async-storage/async-storage';

export const SET_REQUEST_TOKEN = async value => {
  try {
    await AsyncStorage.setItem('request-token', JSON.stringify(value));
  } catch (e) {}
};

export const GET_REQUEST_TOKEN = async () => {
  try {
    const newItem = await AsyncStorage.getItem('request-token');
    return JSON.parse(newItem);
  } catch (e) {}
};

export const DELETE_TOKEN = async () => {
  try {
    await AsyncStorage.removeItem('request-token');
  } catch (e) {}
};

export const SET_SESSION_ID = async value => {
  try {
    await AsyncStorage.setItem('session-id', JSON.stringify(value));
  } catch (e) {}
};

export const GET_SESSION_ID = async () => {
  try {
    const newItem = await AsyncStorage.getItem('session-id');
    return JSON.parse(newItem);
  } catch (e) {}
};

export const DELETE_SESSION_ID = async () => {
  try {
    await AsyncStorage.removeItem('session-id');
  } catch (e) {}
};
