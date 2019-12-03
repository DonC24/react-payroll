import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";
import {Link} from "react-router-dom";
import {Form} from 'react-bootstrap';
import {Col, Row} from "react-bootstrap";

class PayrollForm extends React.Component {
    _isMounted = false;

    constructor(){
        super();
        this.state = {
            formInputs: {
                employee: null,
                allowance: null,
                grosssalary: null,
                ethnicfund: "",
                ethnicamt: null,
                companyrate: null,
                companycpf: null,
                employeerate: null,
                employeecpf: null,
                month: null,
                totalcpf: null,
                totalded: null,
                netsalary: null
            },
            errorMessage: "",
            empinfo: null,
            contract: null,
        }
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
            this.createPayroll(formInputs);
        }else {
            this.setState({errorMessage})
        }

    };

    updateBasicSalary = () => {
        let basicsalary = parseInt(this.state.contract.basicsalary);
        document.getElementById("basicsal").setAttribute("value", basicsalary);
    };
    updateAllowance = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.allowance = e.target.value;
        this.setState({formInputs: formInputs}, this.calcGross);
    };
    updateMonth = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.month = e.target.value;
        this.setState({formInputs: formInputs});
    };
    updateHourlyRate = (e) => {
        console.log("hourly rate on change")
        console.log(e);
        let formInputs = this.state.formInputs;
        formInputs.hourlyrate = e.target.value;
        this.setState({formInputs: formInputs});
    };

    ethnicFund = () => {
        let ethnic = this.state.empinfo.ethnic;
        let gross = this.state.formInputs.grosssalary;
        let formInputs = this.state.formInputs;
        switch(ethnic){
            case "Chinese": {
                if(gross <= 5000){
                    formInputs.ethnicfund = "CDCA";
                    formInputs.ethnicamt = 1.50;
                    this.setState({formInputs: formInputs}, this.calcCPF);
                } else {
                    formInputs.ethnicfund = "CDCA";
                    formInputs.ethnicamt = 3.00;
                    this.setState({formInputs: formInputs}, this.calcCPF);
                }
                break;
            }
            case "Indian": {
                if(gross <= 2500){
                    formInputs.ethnicfund = "SINDA";
                    formInputs.ethnicamt = 5.00;
                    this.setState({formInputs: formInputs}, this.calcCPF);
                } else {
                    formInputs.ethnicfund = "SINDA";
                    formInputs.ethnicamt = 7.00;
                    this.setState({formInputs: formInputs}, this.calcCPF);
                }
                break;
            }
            case "Malay": {
                if(gross <= 6000){
                    formInputs.ethnicfund = "MBMF";
                    formInputs.ethnicamt = 19.50;
                    this.setState({formInputs: formInputs}, this.calcCPF);
                } else {
                    formInputs.ethnicfund = "MBMF";
                    formInputs.ethnicamt = 24.00;
                    this.setState({formInputs: formInputs}, this.calcCPF);
                }
                break;
            }
            case "Other": {
                if(gross <= 4000){
                    formInputs.ethnicfund = "ECF";
                    formInputs.ethnicamt = 9.00;
                    this.setState({formInputs: formInputs}, this.calcCPF);
                } else {
                    formInputs.ethnicfund = "ECF";
                    formInputs.ethnicamt = 12.00;
                    this.setState({formInputs: formInputs}, this.calcCPF);
                }
                break;
            }
            default: {

                formInputs.ethnicfund = "NA";
                formInputs.ethnicamt = 0.00;
                this.setState({formInputs: formInputs}, this.calcCPF);

                break;
            }
        }
    }

    calculateAge = () => {
        let birthday = this.state.empinfo.birthdate;
        // console.log("birthday: "+ birthday);
        birthday = Date.parse(birthday)
        let now = new Date
        var ageDifMs = now - birthday;
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    calcCPF = () => {
        let age = this.calculateAge();
        console.log("age: " + age);
        let gross = parseFloat(this.state.formInputs.grosssalary);
        let sg = this.state.empinfo.nationality;
        let formInputs = this.state.formInputs;
        if(sg === "Singaporean" || sg == "Singaporean PR"){
            if(age <= 55){
                let companyrate = (17/100);
                let employeerate = (20/100);
                let companycpf = Math.round(gross * companyrate);
                let employeecpf = Math.round(gross * employeerate);

                formInputs.companyrate = companyrate;
                formInputs.companycpf = companycpf;
                formInputs.employeerate = employeerate;
                formInputs.employeecpf = employeecpf;
                this.setState({formInputs: formInputs}, this.calcTotals);
            } else if(age > 55 && age <= 60) {
                let companyrate = (13/100);
                let employeerate = (13/100);
                let companycpf = Math.round(gross * companyrate);
                let employeecpf = Math.round(gross * employeerate);

                formInputs.companyrate = companyrate;
                formInputs.companycpf = companycpf;
                formInputs.employeerate = employeerate;
                formInputs.employeecpf = employeecpf;
                this.setState({formInputs: formInputs}, this.calcTotals);
            } else if(age > 60 && age <= 65) {
                let companyrate = (9/100);
                let employeerate = (7.5/100);
                let companycpf = Math.round(gross * companyrate);
                let employeecpf = Math.round(gross * employeerate);

                formInputs.companyrate = companyrate;
                formInputs.companycpf = companycpf;
                formInputs.employeerate = employeerate;
                formInputs.employeecpf = employeecpf;
                this.setState({formInputs: formInputs}, this.calcTotals);
            } else if(age > 65) {
                let companyrate = (7.5/100);
                let employeerate = (5/100);
                let companycpf = Math.round(gross * companyrate);
                let employeecpf = Math.round(gross * employeerate);

                formInputs.companyrate = companyrate;
                formInputs.companycpf = companycpf;
                formInputs.employeerate = employeerate;
                formInputs.employeecpf = employeecpf;
                this.setState({formInputs: formInputs}, this.calcTotals);
            }
        } else {
            let companyrate = 0;
            let employeerate = 0;
            let companycpf = 0;
            let employeecpf = 0;

            formInputs.companyrate = companyrate;
            formInputs.companycpf = companycpf;
            formInputs.employeerate = employeerate;
            formInputs.employeecpf = employeecpf;
            this.setState({formInputs: formInputs}, this.calcTotals);
        }

    }

    calcGross = () => {
        console.log("calculating gross");
        let basicSal = parseInt(this.state.contract.basicsalary);
        console.log(basicSal)
        let allowance = parseFloat(this.state.formInputs.allowance);
        let gross = basicSal + allowance;
        let formInputs = this.state.formInputs;
        formInputs.grosssalary = gross;
        this.setState({formInputs: formInputs}, this.ethnicFund);
    }



    getContract = (userId) => {
        console.log("in get contract " + userId);
        let reactThis = this;
        fetch('/contracts/' + userId)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                // return JSON.stringify(res);
                this.setState({contract : res});
                return fetch('/user/' + userId)
            })
            .then(response => response.json())
            .then(response => {
                console.log("getting user info")
                console.log(response);
                // return JSON.stringify(res);
                this.setState({empinfo : response}, this.updateBasicSalary);
            })
            .catch(error => console.error('Error:', error));
    }


    updateEmployee = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.employee = e.target.value;
        let userId = e.target.value;
        this.setState({formInputs: formInputs}, this.getContract(userId));

    };

    calcTotals = () => {
        let formInputs = this.state.formInputs;

        let companycpf = this.state.formInputs.companycpf;
        let employeecpf = this.state.formInputs.employeecpf;
        let ethnicamt = this.state.formInputs.ethnicamt;
        let gross = this.state.formInputs.grosssalary;

        let totalcpf = companycpf + employeecpf;
        let totalded = totalcpf + ethnicamt;

        formInputs.totalcpf = totalcpf;
        formInputs.totalded = totalded;
        formInputs.netsalary = (gross - totalded);
        this.setState({formInputs: formInputs});

    };

    handleAMonthChange = (e) => {
        let formInputs = this.state.formInputs;
        formInputs.month = e.target.value;
        console.log(e.target.value)
        this.setState({formInputs: formInputs});
    }

    getEmployees = () => {
        console.log("getting currentuser");
        let dropdown = document.getElementById('usercols');
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

    setMaxDate = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }

        today = yyyy+'-'+mm+'-'+dd;
        document.getElementById("datefield").setAttribute("max", today);
    };

    componentDidMount(){
        this._isMounted = true;

        if (this._isMounted) {
            this.getEmployees();
            this.setMaxDate();
            let formInputs = this.state.formInputs;
            formInputs.date = new Date();
            this.setState({formInputs: formInputs});
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    createPayroll = (data) => {
        console.log("in create payroll");
        console.log(data);
        fetch('/payroll', {
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
        console.log("in payroll form");
        let errorMessage = null;
        if (this.state.errorMessage !== ""){
            errorMessage = (<Col xs={12} className={mainStyles.formError}><p>{this.state.errorMessage}</p></Col>);
        }

        return (
            <Form className={mainStyles.signupForm}>

                <Row>
                    <Form.Group as={Col}>
                      <Form.Label>Employee </Form.Label>
                      <Form.Control as="select" id="usercols" value={this.state.formInputs.employee} onChange={this.updateEmployee}>

                      </Form.Control>
                    </Form.Group>
                </Row>


                <Row>
                    <Form.Group as={Col}>
                      <Form.Label>Month of Payroll </Form.Label>
                      <Form.Control type="date" id="datefield" value={this.state.formInputs.month} onChange={this.updateMonth} max="2018-12-30">
                      </Form.Control>
                    </Form.Group>
                </Row>

                <Row>
                    <Col >
                        <Form.Group>
                            <label>Basic Salary </label>
                            <Form.Control type="number" min="0" id="basicsal" readOnly></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Allowance </label>
                            <Form.Control type="number" placeholder="500" step="0.1" min="0" value={this.state.formInputs.allowance} onChange={this.updateAllowance}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Gross Salary </label>
                            <Form.Control type="number" step="0.1" min="0" value={this.state.formInputs.grosssalary} readOnly></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Ethnic Fund </label>
                            <Form.Control type="text" value={this.state.formInputs.ethnicfund} readOnly></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Ethnic Fund Amount </label>
                            <Form.Control type="number" step="0.1" min="0" value={this.state.formInputs.ethnicamt} readOnly></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <h4>CPF Contributions</h4>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Employer Rate (%) </label>
                            <Form.Control type="number" step="0.1" min="0" value={this.state.formInputs.companyrate} readOnly></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Employer CPF Contributions</label>
                            <Form.Control type="number" value={this.state.formInputs.companycpf} readOnly></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Employee Rate (%) </label>
                            <Form.Control type="number" value={this.state.formInputs.employeerate} readOnly></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Employee CPF Contributions</label>
                            <Form.Control type="number" step="0.1" min="0" value={this.state.formInputs.employeecpf} readOnly></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Total CPF Contributions </label>
                            <Form.Control type="number" value={this.state.formInputs.totalcpf} readOnly></Form.Control>
                        </Form.Group>
                    </Col>

                </Row>
                <hr />
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Total Deductions </label>
                            <Form.Control type="number" value={this.state.formInputs.totalded} readOnly></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <label>Net Salary </label>
                            <Form.Control type="number" value={this.state.formInputs.netsalary} readOnly></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col xs={4} lg={6}>
                        <button type="submit" onClick={this.submit} className={mainStyles.btn}>Create Payroll</button>
                    </Col>
                    {errorMessage}
                </Row>
            </Form>

        );
    }
}
PayrollForm.propTypes ={
    history: PropTypes.object
};
export default PayrollForm;