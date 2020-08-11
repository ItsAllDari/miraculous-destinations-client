import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
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
      .then(res => setLocation(res.data.location))
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
  // list.items.map(item => (
  //   <li key={item._id}>
  //     <Link to={`/lists/${props.match.params.id}/items/${item._id}`}>{item.name}</Link>
  //   </li>
  // ))
  // const itemsJsx = list.items.map(item => (
  //   <li key={item._id}>
  //     <div className="list-row">
  //     </div>
  //     <div className="list-row">
  //       <Link to={`/lists/${props.match.params.id}/items/${item._id}`}>{item.name}</Link>
  //     </div>
  //   </li>
  // ))
  return (
    <div className="location-style">
      <h4>{location.city}</h4>
      <p>{location.state}</p>
      <p>{location.country}</p>
      <br />
      <div>
        <button className="button btn btn-danger" onClick={destroy}>Delete Location</button>
        <Link to={`/locations/${props.match.params.id}/edit`}>
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
