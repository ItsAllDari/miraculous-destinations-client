import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { newLocation } from '../../api/location'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class NewLocation extends Component {
  constructor () {
    super()

    this.state = {
      city: '',
      state: '',
      country: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onNewLocation = event => {
    event.preventDefault()

    const { msgAlert, history, setLocation } = this.props

    newLocation(this.state)
      .then(res => setLocation(res.data.user))
      .then(() => msgAlert({
        heading: 'New Location Added',
        message: messages.newLocationSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ city: '', state: '', country: '' })
        msgAlert({
          heading: 'New location failed with error: ' + error.message,
          message: messages.newLocationFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { city, state, country } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>New Location</h3>
          <Form onSubmit={this.onNewLocation}>
            <Form.Group controlId="city">
              <Form.Label>City Name</Form.Label>
              <Form.Control
                required
                type="city"
                name="city"
                value={city}
                placeholder="Enter city name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                required
                name="state"
                value={state}
                type="state"
                placeholder="State"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                name="country"
                value={country}
                type="country"
                placeholder="Country"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(NewLocation)
