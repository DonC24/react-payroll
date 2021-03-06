import React from 'react';
import { hot } from 'react-hot-loader';

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import Signup from './components/user/signup/signup';
import Login from './components/user/login/login';
import Dashboard from './components/index/dashboard/dashboard';
import Contract from './components/index/contracts/contract';
import Payroll from './components/index/payroll/payroll';

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

    signOut = () => {
        fetch('/signout', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                document.cookie = 'session='+sha256(SALT)+'; path=/';
                document.cookie = 'user_id=0 ; path=/';
                this.props.checkUser();
                this.props.history.push('/');
            })
            .catch(error => console.error('Error:', error));
    };

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
                    <h1>Payroll React Router</h1>
                    <Link to="/signup">Sign Up </Link>
                    <Link to="/login">Login </Link>
                    <button onClick={this.signOut}>Logout </button>
                    <Link to="/">Home </Link>
                </nav>
                <Container>
                    <Switch>
                        <Route exact path="/" render={props => (this.state.authed ? <Dashboard {...props} /> : <Redirect to='/' />)}/>
                        <Route path="/signup" render={props => (this.state.authed ? <Redirect to='/' /> : <Signup {...props}/>)}/>
                        <Route path="/login" render={props => (this.state.authed ? <Redirect to='/' /> : <Login {...props}/>)}/>
                        <Route path="/contracts" render={props => (this.state.authed ? <Contract {...props} /> : <Redirect to='/' />)}/>
                        <Route path="/payroll" render={props => (this.state.authed ? <Payroll {...props} /> : <Redirect to='/' />)}/>
                    </Switch>
                </Container>
            </Router>

    );
  }
}

export default hot(module)(App);