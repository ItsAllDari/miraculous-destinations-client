import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Spinner from 'react-bootstrap/Spinner'
// import ItemCreate from './ItemCreate'
import messages from './../AutoDismissAlert/messages'
const Location = (props) => {
  const [location, setLocation] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props
  useEffect(() => {
    axios({
      url: `${apiUrl}/locations/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${props.user.token}`
      }
    })
      .then(res => setLocation(res.data))
      // .catch(console.error)
      .then(() => msgAlert({
        heading: 'Showing selected city',
        message: messages.showLocationSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setLocation({ city: '', state: '', country: '' })
        msgAlert({
          heading: 'Failed to show city ' + error.message,
          message: messages.showLocationFailure,
          variant: 'danger'
        })
      })
  }, [])
  const destroy = () => {
    axios({
      url: `${apiUrl}/locations/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      // .catch(console.error)
      .then(() => msgAlert({
        heading: 'Location Deleted',
        message: messages.deleteLocationSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setLocation({ city: '', state: '', country: '' })
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deleteLocationFailure,
          variant: 'danger'
        })
      })
  }
  if (!location) {
    return <p>Loading...</p>
  }
  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/locations/', state: { msg: 'Location succesfully deleted!' }
      }} />
    )
  }

  return (
    <div className="location-style">
      <h4>The Forecast of {location.city}, {location.state}</h4>
      <Spinner animation="grow" variant="success" /><p>Temperature: 75℉ </p>
      <p>Description: Looks like it will be a beautiful and sunny day, be sure to enjoy it! 😄 </p>
      <img src="https://image.flaticon.com/icons/svg/890/890347.svg" alt="sunny"/>
      <br />
      <br />
      <div>
        <button className="button btn btn-danger" onClick={destroy}>Delete Location</button>
        <Link to={`/locations/${location.id}/edit`}>
          <button className="button btn btn-warning">Edit Location</button>
        </Link>
      </div>
      <div>
        <Link to='/locations/'>Back to all locations</Link>
      </div>
    </div>
  )
}
export default Location
