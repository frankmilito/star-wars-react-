import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'

function Table(props) {
  const { currentState: genderState } = props
  const characterList = useSelector(state => state.film.characters)
  const [totalHeight, setTotalHeight] = useState()
  const [currentState, setCurrentState] = useState([])
  const [direction, setDirection] = useState(true)

  const formatHeight = height => {
    if (height === 'unknown') {
      return height
    }

    const centimeter = `${height}cm`
    let inches = (parseInt(height, 10) * 0.393701).toFixed(0)
    const feet = Math.floor(inches / 12)
    inches %= 12

    return `${centimeter} (${feet}ft /${inches}inches)`
  }

  const getHeight = () => {
    if (currentState) {
      let sum = 0
      for (let i = 0; i < currentState.length; i++) {
        sum += Number(currentState[i].data.height)
      }
      return sum
    }
  }
  useEffect(() => {
    genderState && setCurrentState(genderState)
  }, [genderState])

  useEffect(() => {
    let sum = getHeight()
    sum && setTotalHeight(sum)
  }, [currentState])

  const compareBy = (key, ascending) => {
    const reverse = ascending ? 1 : -1

    if (key === 'height') {
      if (ascending) {
        return (a, b) => b.data[key] - a.data[key]
      }
      return (a, b) => a.data[key] - b.data[key]
    }

    return (a, b) => {
      if (a.data[key] < b.data[key]) return -1 * reverse
      if (a.data[key] > b.data[key]) return 1 * reverse
      return 0
    }
  }

  const sortBy = key => {
    const listCopy = [...currentState]
    listCopy.sort(compareBy(key, direction))
    setCurrentState(listCopy)
  }
  useEffect(() => {
    setCurrentState(characterList)
  }, [characterList])
  return (
    <div>
      {props.loading ? (
        <div className="d-flex w-100 justify-content-center align-items-center">
          {' '}
          <Loader type="Circles" color="#000" height={20} width={20} />
        </div>
      ) : (
        <table className="table thead-dark w-75 mx-auto table-dark">
          <thead className="thead-dark">
            <tr style={{ cursor: 'pointer' }}>
              <th
                scope="col"
                onClick={() => {
                  sortBy('name')
                  setDirection(!direction)
                }}
              >
                Name
              </th>
              <th
                scope="col"
                onClick={() => {
                  sortBy('gender')
                  setDirection(!direction)
                }}
              >
                Gender
              </th>
              <th
                scope="col"
                onClick={() => {
                  sortBy('height')
                  setDirection(!direction)
                }}
              >
                Height
              </th>
            </tr>
          </thead>
          {currentState && currentState.length > 0 ? (
            currentState.map(character => {
              const { name, gender, height } = character.data
              return (
                <>
                  <tbody>
                    <tr>
                      <td>{name}</td>
                      <td>
                        {gender === 'female'
                          ? 'F'
                          : gender === 'male'
                          ? 'M'
                          : gender}
                      </td>
                      <td>{formatHeight(height)}</td>
                    </tr>
                  </tbody>
                </>
              )
            })
          ) : (
            <>
              <tr className="font-weight-bold">No Content</tr>
            </>
          )}
          <tfoot>
            <tr>
              {currentState.length > 0 ? (
                <>
                  <th>Total Characters: {currentState.length}</th>
                  <th></th>
                  <th>Total Height: {formatHeight(totalHeight)}</th>
                </>
              ) : (
                ''
              )}
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  )
}

export default Table
