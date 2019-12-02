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
                employee: null,
                basicsalary: null,
                basichours: null,
                daysperwk: null,
                // hourlyrate: null
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

        if (validated) {
            this.createContract(formInputs);
        }else {
            this.setState({errorMessage})
        }

    };
/*    updateUsername = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.username = e.target.value;
        this.setState({formInputs: formInputs});
    };
    updateName = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.name = e.target.value;
        this.setState({formInputs: formInputs});
    };*/

    updateBasicSalary = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.basicsalary = e.target.value;
        this.setState({formInputs: formInputs});
    };
    updateBasicHours = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.basichours = e.target.value;
        this.setState({formInputs: formInputs});
    };
    updateDaysPerWk = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.daysperwk = e.target.value;
        this.setState({formInputs: formInputs});
    };
    updateHourlyRate = (e) => {
        console.log("hourly rate on change")
        console.log(e);
        let formInputs = this.state.formInputs;
        formInputs.hourlyrate = e.target.value;
        this.setState({formInputs: formInputs});
    };
    updateEmployee = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.employee = e.target.value;
        this.setState({formInputs: formInputs});
    };

    getEmployees = () => {
        console.log("getting currentuser");
        let dropdown = document.getElementById('selectcols');
        dropdown.length = 0;

        let defaultOption = document.createElement('option');
        defaultOption.text = 'Select Employee';
        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;
        fetch('/get_user_info')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // return JSON.stringify(res);
                let compId = parseInt(res.company_id)
                return fetch('/get_all_users/' + compId);
            })
            .then(response => {
                    if (response.status !== 200) {
                        console.warn('Looks like there was a problem. Status Code: ' +
                          response.status);
                        return;
                    }

                    response.json().then(function(data) {
                        let option;
                        console.log(data);
                        for (let i = 0; i < data.length; i++) {
                            option = document.createElement('option');
                            option.text = data[i].name + " " + data[i].username;
                            option.value = data[i].id;
                            dropdown.add(option);
                        }
                    });
                }
            )
            .catch(error => console.error('Error:', error));
    }

    componentDidMount(){
        this.getEmployees();
    }

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
                    this.setState({errorMessage: "There was an error"})
                }
            })
            .catch(error => {console.error('Error: ', error)});
    };

    render() {
        let errorMessage = null;
        if (this.state.errorMessage !== ""){
            errorMessage = (<Col xs={12} className={mainStyles.formError}><p>{this.state.errorMessage}</p></Col>);
        }

        let hrlyRate = ((12 * parseInt(this.state.formInputs.basicsalary)) / (52 * parseFloat(this.state.formInputs.daysperwk) * parseFloat(this.state.formInputs.basichours)));
        // cannot setstate here. not sure how to setstate for hourly rate.
        console.log("hrly Rate: " + hrlyRate);

        return (
            <Form className={mainStyles.signupForm}>

                <Row>
                    <Form.Group as={Col}>
                      <Form.Label>Employee </Form.Label>
                      <Form.Control as="select" id="selectcols" value={this.state.formInputs.employee} onChange={this.updateEmployee}>

                      </Form.Control>
                    </Form.Group>
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
                            <Form.Control type="number" step="0.1" min="0" value={this.state.formInputs.basichours} onChange={this.updateBasicHours}></Form.Control>
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
                            <Form.Control type="number" value={hrlyRate} onChange={this.updateHourlyRate} readOnly></Form.Control>
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