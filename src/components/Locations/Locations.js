import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'
// import CheckMark from './CheckMark'

import messages from './../AutoDismissAlert/messages'

const Locations = (props) => {
  const [locations, setLocations] = useState([])

  const { msgAlert } = props
  // console.log(props)
  useEffect(() => {
    axios({
      url: `${apiUrl}/locations/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${props.user.token}`
      }
    })
      // .then(res => {
      //   console.log(res)
      //   return res
      // })
      .then(res => setLocations(res.data))
      // .catch(console.error)

      .then(() => msgAlert({
        heading: 'Showing all locations',
        message: messages.showLocationsSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setLocations({ city: '', state: '', country: '' })
        msgAlert({
          heading: 'Failed to show all locations ' + error.message,
          message: messages.showLocationsFailure,
          variant: 'danger'
        })
      })
  }, [])

  const locationsJsx = locations.map(location => (
    <li key={location._id}>
      <Link to={`/locations/${location._id}`}>{location.city}</Link>
    </li>
  ))

  return (
    <div className="location-style">
      <h4 className="location-font">My Locations</h4>
      <div className="center">
        <div className="location-display">
          {locationsJsx}
        </div>
      </div>
      <Link to={'/new-location'}>
        <button className="button btn btn-success" >Add City</button>
      </Link>
    </div>
  )
}

export default Locations
