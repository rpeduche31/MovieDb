/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import useMovies from '../../hooks/useMovies';
import useLogin from '../../hooks/useLogin';

import Back from '../../assets/images/back.png';

const LoginScreen = props => {
  const navigation = props.navigation;
  const movieData = props?.route?.params?.movieData;
  const [renderView, setRenderView] = useState(false);
  const [queryMovieData, setQueryMovieData] = useState(false);
  const [queryMovieReview, setQueryMovieReview] = useState(false);
  const [isBelongToWatchList, setIsBelongToWatchlist] = useState(false);
  const [activeRating, setActiveRating] = useState(false);
  const [movieInputRating, setMovieInputRating] = useState('');
  const [errorRating, setErrorRating] = useState('');
  const [filteredRateOfMovie, setFilteredRateOfMovie] = useState('');

  const {
    getMovieReviews,
    getMovieDetails,
    addToWatchList,
    getWatchLists,
    rateMovie,
    getAllMovieRated,
    deleteRating,
  } = useMovies();
  const {getAccountDetails} = useLogin();

  const getMovieData = async id => {
    const details = await getMovieDetails(id);
    const review = await getMovieReviews(id);
    setQueryMovieData(details);
    setQueryMovieReview(review);
  };

  useEffect(() => {
    getMovieData(movieData?.id);
    handleGetWatchLists(true);

    return function Cleanup() {
      handleGetWatchLists();
    };
  }, [movieData?.id]);

  const handleAddToWatchList = async () => {
    const accountId = await getAccountDetails();
    const returnAddToWatchList = await addToWatchList(
      accountId?.data?.id,
      movieData?.id,
    );
    returnAddToWatchList?.success && setIsBelongToWatchlist(true);
  };

  const handleGetWatchLists = async start => {
    const accountId = await (start && getAccountDetails());
    const newLists = await (start && getWatchLists(accountId?.data?.id));
    const newRatedMovies = await (start &&
      getAllMovieRated(accountId?.data?.id));

    const rateOfMovieRated = newRatedMovies?.results.filter(
      rate => rate.id === movieData?.id,
    );
    rateOfMovieRated?.length > 0 &&
      setFilteredRateOfMovie(rateOfMovieRated[0]?.rating);

    const checkIfBelongToWatchlists = newLists?.results.filter(
      data => data.id === movieData?.id,
    );
    checkIfBelongToWatchlists?.length > 0 && setIsBelongToWatchlist(true);
    setTimeout(() => {
      setRenderView(true);
    }, 1500);
  };

  const handleSubmitRating = async action => {
    if (Number(movieInputRating) <= 10 && Number(movieInputRating) > 0.5) {
      await rateMovie(movieData?.id, movieInputRating, action);
      setFilteredRateOfMovie(movieInputRating);
      setActiveRating(false);
    } else {
      setErrorRating('Rating should be greater than 0.5 and less than 10');
    }
  };
  const handleInputRating = text => {
    setErrorRating('');
    const newValue = text.replace(/[^0-9.]/g, '');

    setMovieInputRating(newValue);
  };

  const handleDeleteRating = async () => {
    const returnDeleteRating = await deleteRating(movieData?.id);

    returnDeleteRating?.success && setFilteredRateOfMovie('');
  };

  return (
    <View style={styles.mainBackground}>
      {movieData?.backdrop_path && (
        <ImageBackground
          style={{height: '100%', width: '100%'}}
          blurRadius={18}
          onLoad={() => setRenderView(true)}
          source={{
            uri: `https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`,
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#09348482',
            }}>
            <TouchableOpacity
              style={{position: 'absolute', top: 15, left: 5, zIndex: 10}}
              onPress={() => navigation.pop()}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                }}
                source={Back}
              />
            </TouchableOpacity>
            <ScrollView style={{flex: 1, paddingHorizontal: 10}}>
              {queryMovieData && (
                <>
                  <View
                    style={{
                      marginTop: 75,
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        height: '100%',
                        width: '45%',
                      }}>
                      <Image
                        style={{
                          paddingVertical: 115,
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: `https://image.tmdb.org/t/p/original${movieData?.poster_path}`,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: '50%',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: '700',
                          marginBottom: 10,
                        }}>
                        {queryMovieData.title}
                      </Text>

                      <Text style={styles.movieTextInfo}>
                        {queryMovieData?.release_date?.substring(0, 4)}
                      </Text>
                      {queryMovieData?.genres?.slice(0, 3).map(genre => (
                        <Text key={genre.id} style={styles.movieTextInfo}>
                          {genre.name}
                        </Text>
                      ))}
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '600',
                          marginBottom: 2,
                        }}>
                        {Math.trunc(queryMovieData?.runtime / 60)} hr and{' '}
                        {queryMovieData?.runtime % 60} mins.
                      </Text>
                    </View>
                  </View>
                  <View style={{marginTop: 30}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'white', fontWeight: '700'}}>
                        OVERVIEW
                      </Text>
                      {renderView ? (
                        <TouchableOpacity
                          disabled={isBelongToWatchList}
                          onPress={handleAddToWatchList}
                          style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: '700',
                              borderColor: 'white',
                              borderWidth: 1,
                              paddingVertical: 2,
                              paddingHorizontal: 8,
                            }}>
                            {isBelongToWatchList
                              ? 'WATCHLIST'
                              : 'Add to WATCHLIST'}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <ActivityIndicator size="small" />
                      )}
                    </View>
                    <Text style={{color: 'white', marginTop: 20}}>
                      {queryMovieData?.overview}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      marginTop: 25,
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: '600',
                        }}>
                        Rating:{'    '}
                      </Text>
                      <Text
                        style={{
                          borderColor: 'white',
                          borderWidth: 1,
                          fontSize: 30,
                          fontWeight: '700',
                          color: 'white',
                          paddingHorizontal: 10,
                          textAlign: 'center',
                        }}>
                        {queryMovieData.vote_average}
                      </Text>
                    </View>

                    {filteredRateOfMovie ? (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                          }}>
                          <Text style={{color: 'white'}}>Your rate: </Text>
                          <Text
                            style={{
                              borderColor: 'white',
                              borderWidth: 1,
                              fontSize: 30,
                              fontWeight: '700',
                              color: 'white',
                              paddingHorizontal: 10,
                              textAlign: 'center',
                            }}>
                            {filteredRateOfMovie}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={handleDeleteRating}
                          style={{
                            marginTop: 5,
                            borderColor: 'white',
                            borderWidth: 1,
                            borderRadius: 10,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: 'white',
                              paddingHorizontal: 1,
                              paddingVertical: 3,
                            }}>
                            Delete Rating
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : activeRating ? (
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                          }}>
                          <View style={{borderWidth: 1, borderColor: 'white'}}>
                            <TextInput
                              value={movieInputRating}
                              onChangeText={handleInputRating}
                              keyboardType={'number-pad'}
                              style={{
                                height: 30,
                                width: 120,
                                color: 'white',
                                marginLeft: 10,
                              }}
                            />
                          </View>
                          <TouchableOpacity
                            onPress={handleSubmitRating}
                            style={{
                              borderWidth: 1,
                              borderColor: 'white',
                              borderRadius: 8,
                              marginTop: 5,
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                textAlign: 'center',
                                paddingVertical: 3,
                              }}>
                              Submit Rating
                            </Text>
                          </TouchableOpacity>
                          {errorRating.length > 0 && (
                            <Text
                              style={{
                                color: 'red',
                                position: 'absolute',
                                top: 70,
                              }}>
                              {errorRating}
                            </Text>
                          )}
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            setActiveRating(false);
                            setErrorRating('');
                            setMovieInputRating('');
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: '900',
                              fontSize: 18,
                              marginLeft: 5,
                            }}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setActiveRating(true);
                          setMovieInputRating('');
                        }}
                        style={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: '700',
                            borderColor: 'white',
                            borderWidth: 1,
                            paddingVertical: 2,
                            paddingHorizontal: 8,
                          }}>
                          Rate Movie
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '700',
                        marginTop: 45,
                        marginBottom: 15,
                      }}>
                      REVIEWS
                    </Text>
                    {queryMovieReview?.results?.length > 0 ? (
                      queryMovieReview?.results.map((reviews, i) => {
                        return (
                          <>
                            <Text
                              key={i}
                              style={{
                                color: '#04ff8b',
                                fontWeight: '700',
                                marginBottom: 5,
                              }}>
                              {reviews?.author} :{' '}
                            </Text>
                            <Text key={i + 1} style={{color: 'white'}}>
                              {reviews?.content}{' '}
                            </Text>

                            <Text
                              key={i + 2}
                              style={{
                                marginVertical: 25,
                                color: 'white',
                                alignItems: 'center',
                              }}>
                              {'------------'}
                            </Text>
                          </>
                        );
                      })
                    ) : (
                      <Text style={{color: 'white'}}>No Movie Reviews</Text>
                    )}
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </ImageBackground>
      )}
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
  movieTextInfo: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 2,
  },
});

export default LoginScreen;
