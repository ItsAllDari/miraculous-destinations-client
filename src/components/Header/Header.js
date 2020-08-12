import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'

const authenticatedOptions = (

  <Dropdown className="dropdown">
    <Dropdown.Toggle variant="success" id="dropdown-menu">
        Options
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#change-password">Change Password</Dropdown.Item>
      <Dropdown.Item href="#sign-out">Sign Out</Dropdown.Item>
      <Dropdown.Item href="#locations">View Cities</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link to="/"></Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="success" variant="dark" expand="md">
    <Navbar.Brand href="#">
      <img src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/09/travel-logo-design.jpg" alt="Travel Logo"/>Miraculous Destinations
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
