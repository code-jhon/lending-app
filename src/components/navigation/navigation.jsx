import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../navigation/navigation.css'
import Sound from 'react-sound'
import soundFile from '../../';

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
    <div className="bg-image">
    </div>
  );
}

function About() {
  return (
    <div className="bg-about">
        <section className="intro">
        A long time ago, in a galaxy far,<br/> far away....
        </section>

        <Sound 
        url="./assets/Star_Wars_original_opening_crawl_1977.mp3"
        playStatus={Sound.status.PLAYING}
        playFromPosition={300 /* in milliseconds */}
        autoLoad={true}/>

        <div id="board">
          <div id="content">
            <p id="title">Lending-app</p>
            <p id="subtitle">THE CODER'S MENACE</p>
            <p>The turmoil has engulfed the Developing Republic. The competition of commercial frameworks to peripheral navigation systems is in dispute. Hoping to solve the problem with a loan application to small and medium entrepreneurs, the greedy Federation of LendingFront has decided to open a call to list new coders in their ranks.</p><br/>
            <p>While the Congress of the Republic debates incessantly whether or not to tax the family basket, Lord Commander Milton Lenis has sent a Jedi Knight (still a Padawan), hoping to return justice in the galaxy, training with this delivery , using technologies like ReactJS, Python and eager to support progress for future entrepreneurs ...</p><br />
            <p>This app was developed by <Link to="https://twitter.com/javilaortiz">@javilaortiz</Link></p><br />
          </div>
        </div>
    </div>
  );
}

export default CustomLinkExample;
