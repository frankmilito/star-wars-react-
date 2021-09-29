import React from 'react'

function MovieSelection(props) {
  const { films, handleUrl, loading } = props
  return (
    <div>
      <p>Select A Movie</p>
      <select
        name="movies"
        id=""
        disabled={loading}
        onChange={e => handleUrl(e.target.value)}
      >
        <option value="">Select</option>
        {films && films.length > 0
          ? films.map(film => (
              <option key={film.title} value={film.title}>
                {' '}
                {film.title}
              </option>
            ))
          : 'None'}
      </select>
    </div>
  )
}

export default MovieSelection
