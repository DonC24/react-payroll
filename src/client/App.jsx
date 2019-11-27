import React from 'react';
import { hot } from 'react-hot-loader';

import { Route, Link } from "react-router-dom";

import Signup from './components/user/signup/signup';

import Counter from './components/counter/counter';
import Form from './components/form/form';

import { sha256 } from 'js-sha256';
const SALT = "This is a payroll";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'hello',
    };
  }

  render() {
    return (

        <div>
            <nav>
                <h1>React Router</h1>
                <Link to="/bananas">Bananas</Link>
                <Link to="/oranges">Oranges</Link>
            </nav>
            <main>
                <Route path="/" render={props => (
                    <Navigation authed={this.state.authed} checkUser={this.checkUser} username={this.state.username} {...props}/>
                )}/>
                <Container>
                    <Route path="/login/" render={props => (this.state.authed ? <Redirect to='/' /> : <Login {...props}/>)}/>
                    <Route path="/signup/" render={props => (this.state.authed ? <Redirect to='/' /> : <Signup {...props}/>)}/>
                </Container>
            </main>
        </div>

    );
  }
}

export default hot(module)(App);