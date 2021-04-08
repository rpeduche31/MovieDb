import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const Home = ({item}) => {
  const navigate = useNavigation();
  const handleNavigate = () => {
    navigate.navigate('MovieDetails', {
      movieData: item,
    });
  };
  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.mainBackground}>
      <Image
        style={{
          resizeMode: 'stretch',
          height: '100%',
          width: '100%',
        }}
        source={{uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBackground: {
    alignItems: 'center',
    justifyContent: 'center',

    width: '33.5%',
    height: 200,
  },
});

export default Home;
