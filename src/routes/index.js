import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import Login from '../views/Login';
import Home from '../views/Home';
import LoadingScreen from '../views/LoadingScreen';

import WatchListing from '../views/WatchListing';
import MovieDetails from '../views/MovieDetails';

import BottomNavigation from './BottomNavigation';

const Stack = createStackNavigator();

function HomeNavigation() {
  return (
    <BottomNavigation>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="WatchList" component={WatchListing} />
    </BottomNavigation>
  );
}

export default props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={LoadingScreen} name="LoadingScreen" />

        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={HomeNavigation} name="HomeNavigation" />
        <Stack.Screen component={MovieDetails} name="MovieDetails" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
