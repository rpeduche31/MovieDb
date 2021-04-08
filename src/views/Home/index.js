/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';

import useMovies from '../../hooks/useMovies';
import VideoBox from './components/VideoBox';

const HomeHeader = ({getSearchMovies}) => {
  const {searchMovies} = useMovies();

  const handleSearch = async input => {
    const searchedData = await searchMovies(input);
    getSearchMovies(searchedData);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.logoText}>MovieDB</Text>
      <View style={styles.searchHolder}>
        <TextInput
          onChangeText={handleSearch}
          placeholderTextColor="black"
          placeholder="Search here..."
          style={styles.searchBar}
        />
      </View>
    </View>
  );
};

const VideoContainer = ({trendingMovies}) => {
  const renderItem = ({item}) => <VideoBox item={item} />;
  return (
    <FlatList
      style={{width: '100%'}}
      horizontal={false}
      numColumns={3}
      data={trendingMovies}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={{
        display: 'flex',
      }}
    />
  );
};

const Home = props => {
  const {getTrending} = useMovies();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [queryMovies, setQueryMovies] = useState([]);

  const getTrendingMovies = async () => {
    const newMovies = await getTrending();

    setTrendingMovies(newMovies?.results);
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getSearchMovies = data => {
    setQueryMovies(data.results);
  };

  return (
    <>
      <StatusBar backgroundColor="#001323" />
      <View style={styles.mainBackground}>
        <HomeHeader getSearchMovies={getSearchMovies} />
        {queryMovies?.length || trendingMovies?.length ? (
          <VideoContainer
            trendingMovies={
              queryMovies?.length > 0 ? queryMovies : trendingMovies
            }
          />
        ) : (
          <Text>No Movie Results</Text>
        )}
        {/* <View style={styles.loginScreen}>
        <View style={{marginBottom: 25}}>
          <Image source={Logo} />
          <Text style={styles.logoText}>MovieDB</Text>
        </View>
      </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',

    backgroundColor: '#001323',
  },
  header: {
    paddingVertical: 15,
    width: '100%',
    backgroundColor: '#012848',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    flexDirection: 'row',
    elevation: 14,
    justifyContent: 'space-around',
  },
  logoText: {
    fontSize: 25,

    marginLeft: 15,
    fontWeight: '800',
    color: '#04ff8b',
  },
  searchHolder: {
    width: '60%',
    backgroundColor: '#04ff8b',
    borderRadius: 5,
  },
  searchBar: {
    paddingVertical: 8,
    width: '95%',
    textAlign: 'left',
    color: 'black',
    marginLeft: 7,
  },
});

export default Home;
