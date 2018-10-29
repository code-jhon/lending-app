import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../navigation/navigation.css'

import Applications from '../applications/applications'
import Loans from '../loans/loans'
import Payments from '../payments/payments'

function CustomLinkExample() {
  return (
    <Router>
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Lending-App</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <ItemLink activeOnlyWhenExact={true} to="/" label="Home" />
            <ItemLink activeOnlyWhenExact={true} to="/applications" label="Applications" />
            <ItemLink activeOnlyWhenExact={false} to="/loans" label="Loans" />
            <ItemLink activeOnlyWhenExact={false} to="/payments" label="Payments" />
            <ItemLink activeOnlyWhenExact={false} to="/about" label="About" />
          </Nav>
        </Navbar>
        <Route exact path="/" component={Home} />
        <Route exact path="/applications" component={Applications} />
        <Route exact path="/loans" component={Loans} />
        <Route exact path="/payments" component={Payments} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

function ItemLink({ label, to, activeOnlyWhenExact }) {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <NavItem className={match ? "active" : ""}>
          <Link to={to}>{label}</Link>
        </NavItem>
      )}
    />
  );
}

function Home() {
  return (
    <div>
      <h2>home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>@javilaortiz</h2>
    </div>
  );
}

export default CustomLinkExample;
