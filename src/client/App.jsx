import React from 'react';
import { hot } from 'react-hot-loader';

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import Signup from './components/user/signup/signup';
import Login from './components/user/login/login';
import Dashboard from './components/index/dashboard/dashboard';

import { sha256 } from 'js-sha256';
const SALT = "This is a payroll";

import {Container} from 'react-bootstrap';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
                authed : false,
                userId : null,
                username: null,
                currentuser: null
        };
    }

    componentDidMount() {
        console.log("APP mounted");
        this.checkUser();
    }



    checkUser = () => {
        let cookies = {};
        document.cookie.split("; ").forEach( value => {
            let val = value.split("=");
            cookies[val[0]] = val[1];
        });
        if(cookies.session === sha256(cookies.user_id + "logged_in" + SALT)){
            this.setState({
                authed: true,
                userId: parseInt(cookies.user_id),
                username: cookies.user_name
            });
        }else {
            this.setState({
                authed: false
            });
        }
    }

  render() {
    console.log('state', this.state.authed);
    return (

            <Router>
                <nav>
                    <h1>React Router</h1>
                    <Link to="/signup">Sign Up </Link>
                    <Link to="/login">Login</Link>
                </nav>
                <Container>
                    <Switch>
                        <Route exact path="/" render={props => (this.state.authed ? <Dashboard {...props} /> : <Redirect to='/' />)}/>
                        <Route path="/signup" render={props => (this.state.authed ? <Redirect to='/' /> : <Signup {...props}/>)}/>
                        <Route path="/login" render={props => (this.state.authed ? <Redirect to='/' /> : <Login {...props}/>)}/>

                    </Switch>
                </Container>
            </Router>

    );
  }
}

export default hot(module)(App);