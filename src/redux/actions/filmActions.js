import Axios from 'axios'
import Swal from 'sweetalert2'
import {
  CHARACTER_LIST,
  GET_MOVIES_SUCCESS,
  GET_SINGLE_MOVIE,
} from './constants'

export const getMovies = cb => async dispatch => {
  //   dispatch(moviesStart())
  try {
    const { data } = await Axios.get('https://swapi.dev/api/films')
    if (data.results) {
      dispatch({
        type: GET_MOVIES_SUCCESS,
        payload: data.results,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occured fetching movies',
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error,
    })
  } finally {
    cb()
  }
}

export const getSingleMovie = (url, cb) => async dispatch => {
  try {
    const { data } = await Axios.get(url)
    if (data.title) {
      dispatch({
        type: GET_SINGLE_MOVIE,
        payload: data,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error occurred',
        text: 'Could not load movies',
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: error,
    })
  } finally {
    cb()
  }
}

export const getCharacters = (url, cb) => async dispatch => {
  try {
    const data = await Axios.get(url)
    console.log(data)
    if (data) {
      dispatch({
        type: CHARACTER_LIST,
        payload: data,
      })
    }
    // const data = await Axios.all(
    //   url.map(character => Axios.get(character))
    // ).then(
    //   Axios.spread(function (...res) {
    //     // all requests are now complete
    //     console.log(data)
    //     dispatch({
    //       type: CHARACTER_LIST,
    //       payload: res,
    //     })

    //   })
    // )
    // const data = await Axios.get(url)
    // if (data) {
    //   dispatch({
    //     type: CHARACTER_LIST,
    //     payload: data,
    //   })
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error occurred',
    //     text: 'Could not load characters',
    //   })
    // }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error occurred',
      text: error,
    })
  } finally {
    cb()
  }
}
