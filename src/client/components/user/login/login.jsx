import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";
import {Link} from "react-router-dom";
import {Col, Form, Row} from 'react-bootstrap';
import LoginForm from './login-form';


class Login extends React.Component {
    render() {
        return (
            <Row>
                <Col lg={4}>
                    <h2>Login</h2>
                </Col>
                <Col lg={{span:6, offset:1}}>
                    <LoginForm history={this.props.history}/>
                </Col>
            </Row>
        )
    }
}

Login.propTypes ={
    history: PropTypes.object
};
export default Login;