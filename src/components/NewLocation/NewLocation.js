import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import LocationForm from './../Shared/LocationForm'
import messages from './../AutoDismissAlert/messages'

const LocationCreate = (props) => {
  const [location, setLocation] = useState({ city: '', state: '', country: '' })
  const [createdLocationId, setCreatedLocationId] = useState(null)
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedLocation = Object.assign({}, location, updatedField)
    setLocation(editedLocation)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = props
    axios({
      url: `${apiUrl}/locations/`,
      method: 'POST',
      headers: {
        'Authorization': `Token ${props.user.token}`
      },
      data: { location }
    })
      // .then(res => console.log(res))
      .then(res => setCreatedLocationId(res.data.id))
      .then(() => msgAlert({
        heading: 'Create list success',
        message: messages.createLocationSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setLocation({ city: '', state: '', country: '' })
        msgAlert({
          heading: 'Create location failed: ' + error.message,
          message: messages.createLocationFailure,
          variant: 'danger'
        })
      })
  }

  if (createdLocationId) {
    return <Redirect to={`/locations/${createdLocationId}`} />
  }

  return (
    <div>
      <LocationForm
        location={location}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/locations/'
      />
    </div>
  )
}

export default LocationCreate
