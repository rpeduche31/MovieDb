/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, FlatList, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useMovies from '../../hooks/useMovies';
import useLogin from '../../hooks/useLogin';

import VideoBox from '../Home/components/VideoBox';

const HomeHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.logoText}>MovieDB Watchlist</Text>
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

const WatchListing = props => {
  const navigation = useNavigation();
  const {getWatchLists} = useMovies();
  const {getAccountDetails} = useLogin();
  const [trendingMovies, setTrendingMovies] = useState([]);

  const getTrendingMovies = async () => {
    const accountId = await getAccountDetails();
    const newLists = await getWatchLists(accountId?.data?.id);

    setTrendingMovies(newLists?.results);
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#001323" />
      <View style={styles.mainBackground}>
        <HomeHeader />
        {trendingMovies?.length ? (
          <VideoContainer trendingMovies={trendingMovies} />
        ) : (
          <Text>No Movie Results</Text>
        )}
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
  },
  searchBar: {
    backgroundColor: '#04ff8b',
    paddingVertical: 8,
    width: '100%',
    textAlign: 'left',
    color: 'black',
    borderRadius: 5,
  },
});

export default WatchListing;
