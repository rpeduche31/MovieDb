import {useState} from 'react';
import axios from 'axios';
import {apiCall, apiKey} from '../api';
import {GET_REQUEST_TOKEN, GET_SESSION_ID} from '../utils/asyncStorage';

const useMovies = () => {
  const [error, setError] = useState('');

  const [isLoading, setLoading] = useState();

  const cancelRequest = thrown => {
    if (axios.isCancel(thrown)) {
      console.log('Request canceled', thrown.message);
    } else {
      console.log(thrown);
    }
  };

  const getTrending = async () => {
    setLoading(true);
    try {
      const {data} = await apiCall.get(`trending/movie/day?api_key=${apiKey}`);

      setLoading(false);
      return data;
    } catch (err) {
      cancelRequest(err);
      let {response} = err;
      console.log(err);
      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  const searchMovies = async keyword => {
    setLoading(true);
    try {
      const {data} = await apiCall.get(
        `search/movie?api_key=${apiKey}&language=en-US&query=${keyword}&include_adult=false`,
      );
      setLoading(false);
      return data;
    } catch (err) {
      cancelRequest(err);

      let {response} = err;
      console.log(err);
      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  const getMovieReviews = async movie_id => {
    setLoading(true);
    try {
      const {data} = await apiCall.get(
        `movie/${movie_id}/reviews?api_key=${apiKey}&language=en-US`,
      );
      setLoading(false);
      return data;
    } catch (err) {
      cancelRequest(err);

      let {response} = err;
      console.log(err);
      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  const getMovieDetails = async movie_id => {
    setLoading(true);
    try {
      const {data} = await apiCall.get(
        `movie/${movie_id}?api_key=${apiKey}&language=en-US`,
      );
      setLoading(false);
      return data;
    } catch (err) {
      cancelRequest(err);

      let {response} = err;
      console.log(err);
      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  const addToWatchList = async (account_id, media_id) => {
    setLoading(true);
    const newId = await GET_SESSION_ID();
    try {
      const {
        data,
      } = await apiCall.post(
        `account/${account_id}/watchlist?api_key=${apiKey}&session_id=${newId}`,
        {media_type: 'movie', media_id, watchlist: true},
      );

      setLoading(false);
      return data;
    } catch (err) {
      cancelRequest(err);

      let {response} = err;
      console.log(err);
      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  const getWatchLists = async account_id => {
    setLoading(true);
    const newId = await GET_SESSION_ID();
    try {
      const {data} = await apiCall.get(
        `account/${account_id}/watchlist/movies?api_key=${apiKey}&language=en-US&session_id=${newId}&sort_by=created_at.asc`,
      );

      setLoading(false);
      return data;
    } catch (err) {
      cancelRequest(err);

      let {response} = err;
      console.log(err);
      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  const rateMovie = async (movieId, value) => {
    setLoading(true);
    const newId = await GET_SESSION_ID();

    try {
      const {
        data,
      } = await apiCall.post(
        `movie/${movieId}/rating?api_key=${apiKey}&session_id=${newId}`,
        {value},
      );
      setLoading(false);
      return data;
    } catch (err) {
      cancelRequest(err);

      let {response} = err;
      console.log(err);
      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  const deleteRating = async movieId => {
    setLoading(true);
    const newId = await GET_SESSION_ID();

    try {
      const {data} = await apiCall.delete(
        `movie/${movieId}/rating?api_key=${apiKey}&session_id=${newId}`,
      );
      setLoading(false);
      return data;
    } catch (err) {
      cancelRequest(err);

      let {response} = err;
      console.log(err);
      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  const getAllMovieRated = async account_id => {
    setLoading(true);
    const newId = await GET_SESSION_ID();

    try {
      const {data} = await apiCall.get(
        `account/${account_id}/rated/movies?api_key=${apiKey}&language=en-US&session_id=${newId}&sort_by=created_at.asc`,
      );
      setLoading(false);

      return data;
    } catch (err) {
      cancelRequest(err);

      let {response} = err;
      console.log(err);
      setLoading(false);
      setError(response.data.message || response.response || 'Network error');
      return false;
    }
  };

  return {
    getAllMovieRated,
    rateMovie,
    getWatchLists,
    addToWatchList,
    getMovieDetails,
    getMovieReviews,
    searchMovies,
    getTrending,
    error,
    isLoading,
    deleteRating,
  };
};

export default useMovies;
