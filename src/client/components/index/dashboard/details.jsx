import React from 'react';
import {Col,Row, Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import mainStyles from "../../..//style.scss";

var Moment = require('moment');

class Details extends React.Component {
    constructor(){
        super();
        this.state = {
            errorMessage: "",
            contract: null,
            payroll: null
        };
    }

    mapPay = (array) => {
        return array.map(payroll => {

            let payrollMonth = Moment(payroll.month).utc().format("MMM YYYY");
            let companyrate = payroll.companyrate * 100;
            let employeerate = payroll.employeerate *100;

            return(
                <tr>
                    <td>{`${payrollMonth}`}</td>
                    <td>{`${payroll.allowance}`}</td>
                    <td>{`${payroll.grosssalary}`}</td>
                    <td>{`${payroll.ethnicamt}`}</td>
                    <td>{`${companyrate}`}</td>
                    <td>{`${payroll.companycpf}`}</td>
                    <td>{`${employeerate}`}</td>
                    <td>{`${payroll.employeecpf}`}</td>
                    <td>{`${payroll.totalcpf}`}</td>
                    <td>{`${payroll.totalded}`}</td>
                    <td>{`${payroll.netsalary}`}</td>
                </tr>
            )
        })
    }

    getContract = () => {
        console.log("getting contract details");
        let userId = parseInt(this.props.currentuser.id)
        fetch('/contracts/'+ userId)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                // return JSON.stringify(res);
                if(res === false){
                    this.setState({contract : res});
                } else {
                    this.setState({contract : res});
                    return fetch('/payroll/' + userId) //get payroll if there is a contract
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log("getting payroll info")
                console.log(response);
                // return JSON.stringify(res);
                this.setState({payroll : response});
            })
            .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        console.log("details componentDidMount");
        console.log(this.props.currentuser)
        if(this.props.currentuser){
            this.getContract();
        }
    }

    render() {
        console.log("in details");
        let errorMessage = null;
        if (this.state.errorMessage !== ""){
            errorMessage = (<Col xs={12} className={mainStyles.formError}><p>{this.state.errorMessage}</p></Col>);
        }

        let currentuser = this.props.currentuser;
        let formatteddate = Moment(currentuser.birthdate).utc().format("DD MMM YYYY");

        let empinfo = "";
        if(this.state.contract === false || this.state.contract === null){
            empinfo = <p>There are no contract details to display</p>
        } else {

            let contractDetails = this.state.contract;
            empinfo = <tr>
                    <td>{`${contractDetails.basicsalary}`}</td>
                    <td>{`${contractDetails.basichours}`}</td>
                    <td>{`${contractDetails.hourlyrate}`}</td>
                    <td>{`${contractDetails.daysperwk}`}</td>
                </tr>;
        }
        let payHeaders=""
        let payDeets = ""
        if(this.state.payroll === false || this.state.payroll === null){
            payDeets = <p>There are no payroll details to display</p>
        } else {
            payHeaders = <tr>
                                <th scope="col">Payroll Month</th>
                                <th scope="col">Allowance</th>
                                <th scope="col">Gross Salary</th>
                                <th scope="col">Ethnic Amount</th>
                                <th scope="col">Employer Rate (%)</th>
                                <th scope="col">Employer CPF</th>
                                <th scope="col">Employee Rate (%)</th>
                                <th scope="col">Employee CPF</th>
                                <th scope="col">Total CPF Contributions</th>
                                <th scope="col">Total Deductions</th>
                                <th scope="col">Net Salary</th>
                            </tr>
            payDeets = this.mapPay(this.state.payroll);
        }

        return (
            <Row>
                <Col>
                    <h2>{this.props.currentuser.name}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">User Id</th>
                                <th scope="col">NRIC/FIN</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Nationality</th>
                                <th scope="col">Ethnicity</th>
                                <th scope="col">Birthdate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{`${currentuser.id}`}</td>
                                <td>{`${currentuser.username}`}</td>
                                <td>{`${currentuser.name}`}</td>
                                <td>{`${currentuser.email}`}</td>
                                <td>{`${currentuser.nationality}`}</td>
                                <td>{`${currentuser.ethnic}`}</td>
                                <td>{`${formatteddate}`}</td>
                            </tr>
                            <tr>
                                <th scope="col">Basic Salary</th>
                                <th scope="col">Basic Hours</th>
                                <th scope="col">Hourly Rate</th>
                                <th scope="col">Working Days Per Week</th>
                            </tr>
                            {empinfo}
                            {payHeaders}
                            {payDeets}
                        </tbody>
                    </table>
                </Col>
            </Row>
        )
    }
}

Details.propTypes ={
    history: PropTypes.object
};

export default Details;