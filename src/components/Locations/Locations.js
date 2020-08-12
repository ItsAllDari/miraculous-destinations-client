import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'

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
    <li key={location.id}>
      <Link to={`/locations/${location.id}`}>{location.city}, {location.state}</Link>
    </li>
  ))

  return (
    <div className="location-style">
      <h4 className="location-font">My Locations</h4>
      <div className="center">
        <div className="location-display">
          <Spinner animation="border" variant="success" />  <Spinner animation="border" variant="success" />   <Spinner animation="border" variant="success" /> <Spinner animation="border" variant="success" /> <Spinner animation="border" variant="success" /> <Spinner animation="border" variant="success" /> <Spinner animation="border" variant="success" /> <Spinner animation="border" variant="success" />
          <Card style={{ width: '18rem', background: 'green' }}>
            <Card.Img variant="top" src="https://raw.githubusercontent.com/divyanshu013/react-animated-weather/HEAD/react-animated-weather.gif" />
            <Card.Body>
              <Card.Title>{locationsJsx}</Card.Title>
              <Card.Text>
                Click on any of your locations to see the forecast of the day or add a new city to the list.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Link to={'/new-location'}>
        <button className="button btn btn-success" >Add City</button>
      </Link>
    </div>
  )
}

export default Locations
