import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from './signup-form';
import {Col, Row} from "react-bootstrap";

class Signup extends React.Component {
    render() {
        return (
            <Row>
                <Col lg={4}>
                    <h2>Sign Up</h2>
                </Col>
                <Col lg={{span:6, offset:1}}>
                    <SignupForm history={this.props.history}/>
                </Col>
            </Row>

        );
    }
}
Signup.propTypes ={
    history: PropTypes.object
};
export default Signup;