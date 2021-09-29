import React, { useState, useEffect } from 'react'
import classes from './styles/characterListing.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Table from './Table'

function CharacterListing(props) {
  const { title } = props.film
  const characterList = useSelector(state => state.film.characters)
  const [totalHeight, setTotalHeight] = useState()
  const [currentState, setCurrentState] = useState([])
  const handleChange = e => {
    let gender = e.target.value
    let updatedMovies = characterList.filter(
      character => character.data.gender === gender
    )
    setCurrentState(updatedMovies)
  }

  useEffect(() => {
    setCurrentState(characterList)
  }, [characterList, totalHeight])

  return (
    <div className={classes.container}>
      <div className="w-75 mx-auto d-flex justify-content-between py-3">
        <h2>Character Listing {title ? '(' + title + ')' : ''}</h2>
        <select onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <Table currentState={currentState} loading={props.loading} />
    </div>
  )
}

export default CharacterListing
// import React, { useState, useEffect } from 'react'
// import classes from './styles/characterListing.module.css'
// import { useSelector, useDispatch } from 'react-redux'

// function CharacterListing(props) {
//   const characterList = useSelector(state => state.film.characters)
//   const [totalHeight, setTotalHeight] = useState()
//   const [currentState, setCurrentState] = useState([])
//   const [entityList, setEntityListing] = useState([])
//   const [direction, setDirection] = useState(true)
//   const handleChange = e => {
//     let currentMovies = e.target.value
//     let updatedMovies = characterList.filter(
//       character => character.data.gender === currentMovies
//     )
//     setCurrentState(updatedMovies)
//   }

//   const formatHeight = height => {
//     if (height === 'unknown') {
//       return height
//     }

//     const centimeter = `${height}cm`
//     let inches = (parseInt(height, 10) * 0.393701).toFixed(0)
//     const feet = Math.floor(inches / 12)
//     inches %= 12

//     return `${centimeter} (${feet}ft /${inches}inches)`
//   }

//   const getHeight = () => {
//     // if (currentState && currentState.length > 0) {
//     //   const characterHeight = currentState.map(
//     //     character => character.data.height
//     //   )
//     //   characterHeight.reduce((a, b) => setTotalHeight(a + b))
//     // }
//     if (currentState) {
//       let sum = 0
//       for (let i = 0; i < currentState.length; i++) {
//         sum += Number(currentState[i].data.height)
//       }
//       return sum
//     }
//   }

//   useEffect(() => {
//     let sum = getHeight()
//     sum && setTotalHeight(sum)
//   }, [currentState])
//   // useEffect(() => {
//   //   if (characterList && characterList.length > 0) {
//   //     setCurrentState(characterList)
//   //     console.log(currentState)
//   //   }
//   //   return () => {
//   //     setCurrentState([])
//   //   }
//   // }, [characterList])

//   const compareBy = (key, ascending) => {
//     const reverse = ascending ? 1 : -1

//     if (key === 'height') {
//       if (ascending) {
//         return (a, b) => b.data[key] - a.data[key]
//       }
//       return (a, b) => a.data[key] - b.data[key]
//     }

//     return (a, b) => {
//       if (a.data[key] < b.data[key]) return -1 * reverse
//       if (a.data[key] > b.data[key]) return 1 * reverse
//       return 0
//     }
//   }

//   const sortBy = key => {
//     const listCopy = [...currentState]
//     listCopy.sort(compareBy(key, direction))
//     setCurrentState(listCopy)
//   }
//   useEffect(() => {
//     setCurrentState(characterList)
//   }, [characterList, totalHeight])

//   return (
//     <div className={classes.container}>
//       <div className="w-75 mx-auto d-flex justify-content-between py-3">
//         <h2 className="text-dark">Character Listing</h2>
//         <select onChange={handleChange}>
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>
//       </div>
//       <table class="table thead-dark w-75 mx-auto table-striped table-dark">
//         <thead className="thead-dark">
//           <tr style={{ cursor: 'pointer' }}>
//             <th
//               scope="col"
//               onClick={() => {
//                 sortBy('name')
//                 setDirection(!direction)
//               }}
//             >
//               Name
//             </th>
//             <th
//               scope="col"
//               onClick={() => {
//                 sortBy('gender')
//                 setDirection(!direction)
//               }}
//             >
//               Gender
//             </th>
//             <th
//               scope="col"
//               onClick={() => {
//                 sortBy('height')
//                 setDirection(!direction)
//               }}
//             >
//               Height
//             </th>
//           </tr>
//         </thead>
//         {currentState && currentState.length > 0
//           ? currentState.map(character => {
//               const { name, gender, height } = character.data
//               return (
//                 <>
//                   <tbody>
//                     <tr>
//                       <td>{name}</td>
//                       <td>
//                         {gender === 'female'
//                           ? 'F'
//                           : gender === 'male'
//                           ? 'M'
//                           : gender}
//                       </td>
//                       <td>{formatHeight(height)}</td>
//                     </tr>
//                   </tbody>
//                 </>
//               )
//             })
//           : 'No content'}
//         <tfoot>
//           <tr>
//             {currentState.length > 0 ? (
//               <>
//                 <th>Total Characters: {currentState.length}</th>
//                 <th></th>
//                 <th>Total Height: {formatHeight(totalHeight)}</th>
//               </>
//             ) : (
//               ''
//             )}
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   )
// }

// export default CharacterListing
