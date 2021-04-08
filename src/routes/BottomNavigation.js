import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

//ASSETS
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';

const MyTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.bottomNavContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: route.name,
                  },
                ],
              }),
            );
          }
        };

        return (
          <TouchableOpacity key={index} onPress={onPress}>
            <Text
              style={{
                color: isFocused ? '#04ff8b' : 'white',
                fontWeight: '900',
              }}>
              {label === 'Dashboard' ? 'HOME' : label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default ({children}: any) => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBar={props => <MyTabBar {...props} />}>
      {children}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomNavContainer: {
    borderTopWidth: 1,
    width: '100%',
    height: '7%',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopColor: '#D8D8D8',
    justifyContent: 'space-around',
    backgroundColor: '#001323',
  },
});
