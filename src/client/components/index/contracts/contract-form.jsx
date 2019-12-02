import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";
import {Link} from "react-router-dom";
import {Form} from 'react-bootstrap';
import {Col, Row} from "react-bootstrap";

class ContractForm extends React.Component {
    constructor(){
        super();
        this.state = {
            formInputs: {
                username: "",
                name: "",
                basicsalary: null,
                basichrs: "",
                daysperwk: null

            },
            errorMessage: ""
        };
    }

    submit = (e) => {
        // e.preventDefault();
        let formInputs = this.state.formInputs;
        console.log(formInputs);
        let validated = true;
        let errorMessage = "";
        Object.keys(formInputs).forEach(function (item) {
            if (formInputs[item] === "" || formInputs[item] === null) {
                validated = false;
                errorMessage = "Please fill in all fields"
            }
        });

    };
    updateUsername = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.username = e.target.value;
        this.setState({formInputs: formInputs});
    };
    updateName = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.name = e.target.value;
        this.setState({formInputs: formInputs});
    };
    updateBasicSalary = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.basicsalary = e.target.value;
        this.setState({formInputs: formInputs});
    };
    updateBasicHrs = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.basichrs = e.target.value;
        this.setState({formInputs: formInputs});
    };
    updateDaysPerWk = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.daysperwk = e.target.value;
        this.setState({formInputs: formInputs});
    };

    createContract = (data) => {
        console.log("in create contract");
        console.log(data);
        fetch('/contract', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    this.props.history.push('/')
                }else{
                    this.setState({errorMessage: "This NRIC/FIN is already in use"})
                }
            })
            .catch(error => {console.error('Error: ', error)});
    };

    render() {
        let errorMessage = null;
        if (this.state.errorMessage !== ""){
            errorMessage = (<Col xs={12} className={mainStyles.formError}><p>{this.state.errorMessage}</p></Col>);
        }

        let hrlyRate = ((12 * parseInt(this.state.formInputs.basicsalary)) / (52 * parseFloat(this.state.formInputs.daysperwk) * parseFloat(this.state.formInputs.basichrs)));
        console.log("hrly Rate: " + hrlyRate);

        return (
            <Form className={mainStyles.signupForm}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Username </label>
                            <Form.Control type="text" placeholder="NRIC/FIN number" value={this.state.formInputs.username} onChange={this.updateUsername}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Name (as per IC/Passport) </label>
                            <Form.Control type="text" value={this.state.formInputs.name} onChange={this.updateName}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <Form.Group>
                            <label>Basic Salary </label>
                            <Form.Control type="number" min="0" value={this.state.formInputs.basicsalary} onChange={this.updateBasicSalary}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Basic Hours </label>
                            <Form.Control type="number" step="0.1" min="0" value={this.state.formInputs.basichrs} onChange={this.updateBasicHrs}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Form.Group as={Col}>
                      <Form.Label>Working Days per Week </Form.Label>
                      <Form.Control as="select" value={this.state.formInputs.daysperwk} onChange={this.updateDaysPerWk}>
                        <option>Choose...</option>
                        <option value="5">5 Days</option>
                        <option value="5.5">5.5 Days</option>
                        <option value="6">6 Days</option>
                      </Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Hourly Rate </label>
                            <Form.Control type="number" value={hrlyRate} readOnly></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col xs={4} lg={6}>
                        <button type="submit" onClick={this.submit} className={mainStyles.btn}>Create Contract</button>
                    </Col>
                    {errorMessage}
                </Row>
            </Form>

        );
    }
}
ContractForm.propTypes ={
    history: PropTypes.object
};
export default ContractForm;