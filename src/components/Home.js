import React, { useState, useEffect } from 'react'
import classes from './styles/home.module.css'
import img from '../assets/images/star_wars_logo.3cf64e07.png'

import { useDispatch, useSelector } from 'react-redux'
import {
  getCharacters,
  getMovies,
  getSingleMovie,
} from '../redux/actions/filmActions'
import Loader from 'react-loader-spinner'
import OpenCrawl from './OpenCrawl'
import MovieSelection from './MovieSelection'
import CharacterListing from './CharacterListing'

function Home() {
  const dispatch = useDispatch()
  const { films, film } = useSelector(state => state.film)
  const [loading, setLoading] = useState(false)

  // set Url to fetch single movie
  const handleUrl = selectedTitle => {
    setLoading(true)
    const selectedFilm = films.find(film => film.title === selectedTitle)
    dispatch(getSingleMovie(selectedFilm.url, () => {}))
    selectedFilm.characters.map((character, index) =>
      dispatch(
        getCharacters(character, () => {
          if (index === selectedFilm.characters.length - 1) {
            setLoading(false)
          }
        })
      )
    )
  }

  useEffect(() => {
    setLoading(true)
    dispatch(getMovies(() => setLoading(false)))
  }, [dispatch])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className="col-md-12">
          <div className="d-flex w-100 justify-content-center align-items-center pt-3">
            <img className="main-logo" src={img} alt="star wars" />
          </div>
        </div>

        <MovieSelection films={films} handleUrl={handleUrl} loading={loading} />
        {loading ? (
          <Loader type="Circles" color="#d3d30f" height={100} width={100} />
        ) : (
          <div className="text-center">
            <OpenCrawl film={film} />
          </div>
        )}
      </div>
      <CharacterListing loading={loading} film={film} />
    </div>
  )
}

export default Home
