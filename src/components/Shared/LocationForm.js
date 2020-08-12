import React from 'react'
import { Link } from 'react-router-dom'

const LocationForm = ({ props, location, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>City</label>
      <input
        placeholder="Example: Boston"
        value={location.city}
        name="city"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>State</label>
      <input
        placeholder="Example: MA"
        value={location.state}
        name="state"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Country</label>
      <input
        placeholder="Example: USA"
        value={location.country}
        name="country"
        onChange={handleChange}
      />
    </div>
    <br />
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default LocationForm
