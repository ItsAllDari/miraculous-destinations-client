import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import LocationForm from './../Shared/LocationForm'
import messages from './../AutoDismissAlert/messages'

const LocationEdit = props => {
  const [location, setLocation] = useState({
    city: '',
    state: '',
    country: ''
  })
  const [updated, setUpdated] = useState(false)
  const { msgAlert } = props
  //  functions like a componentDidMount
  useEffect(() => {
    axios({
      url: `${apiUrl}/locations/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${props.user.token}`
      }
    })
      .then(res => setLocation(res.data.location))
      .catch(console.error)
  }, [])
  const handleChange = event => {
    event.persist()
    setLocation(prevLocation => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedLocation = Object.assign({}, prevLocation, updatedField)
      return editedLocation
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/locations/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${props.user.token}`
      },
      data: { location }
    })
      .then(() => setUpdated(true))
      // .catch(console.error)
      .then(() => msgAlert({
        heading: 'Edited Location',
        message: messages.editLocationSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setLocation({ city: '', state: '', country: '' })
        msgAlert({
          heading: 'Failed to update ' + error.message,
          message: messages.editLocationFailure,
          variant: 'danger'
        })
      })
  }
  if (updated) {
    return <Redirect to={`/locations/${props.match.params.id}`} />
  }
  return (
    <div>
      <LocationForm
        list={location}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/locations/${props.match.params.id}`}
      />
    </div>
  )
}
export default LocationEdit
