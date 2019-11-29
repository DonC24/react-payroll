import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";
import {Link} from "react-router-dom";
import {Col, Form, Row} from 'react-bootstrap';


class LoginForm extends React.Component {
    constructor(){
        super();
        this.state = {
            formInputs: {
                username: "",
                password: "",
            },
            errorMessage: ""
        };
    }
    updateUsername = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.username = e.target.value;
        this.setState({formInputs: formInputs});
    };
    updatePassword = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.password = e.target.value;
        this.setState({formInputs: formInputs});
    };
    submit = (e) => {
        e.preventDefault();
        let formInputs = this.state.formInputs;
        let validated = true;
        Object.keys(formInputs).forEach(function (item) {
            if (formInputs[item] === "")
                validated = false;
        });

        if (validated) {
            this.loginUser(formInputs);
        } else {
            this.setState({errorMessage: "Please fill in username and password"})
        }
    };

    loginUser = (data) => {
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => {
            window.location.reload(true);
            return res.json()
        })
            .then(res => {
                if (res) {

                    this.props.history.push('/');

                } else {
                    this.setState({errorMessage: "Incorrect username/password"})
                }
            })
            .catch(error => console.error('Error:', error));
    };
    render() {
        let errorMessage = null;
        if (this.state.errorMessage !== ""){
            errorMessage = (<Col xs={12} className={mainStyles.formError}><p>{this.state.errorMessage}</p></Col>);
        }
        return (
            <Form className={mainStyles.loginForm}>
                <Row>
                    <Col>
                        <Form.Group>
                            <label>Username</label>
                            <Form.Control type="text" value={this.state.formInputs.username} onChange={this.updateUsername}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <label>Password</label>
                            <Form.Control type="password" value={this.state.formInputs.password} onChange={this.updatePassword}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col xs={8} lg={6}>
                        <p>Don't have an account?  <Link to="/signup/">Create one now!</Link></p>
                    </Col>
                    <Col xs={4} lg={6}>
                        <button type="submit" onClick={this.submit} className={mainStyles.btn}>Login</button>
                    </Col>
                    {errorMessage}
                </Row>
            </Form>
        )
    }
}

LoginForm.propTypes ={
    history: PropTypes.object
};
export default LoginForm;