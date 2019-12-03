import React from 'react';
import {Col,Row, Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import mainStyles from "../../..//style.scss";

var Moment = require('moment');

class Employees extends React.Component {
    constructor(){
        super();
        this.state = {
            errorMessage: "",
            employees: null
        };
    }

    getAllUsers = () => {
        console.log("getting all employees");
        let compId = parseInt(this.props.companyId)
        fetch('/get_all_users/'+ compId)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // return JSON.stringify(res);
                this.setState({employees : res});
            })
            .catch(error => console.error('Error:', error));
    }

    mapfunc(array) {
        return array.map(anemployee => {

            let formatteddate = Moment(anemployee.birthdate).utc().format("DD MMM YYYY");

            return(
                <tr>
                    <td>{`${anemployee.id}`}</td>
                    <td>{`${anemployee.username}`}</td>
                    <td>{`${anemployee.name}`}</td>
                    <td>{`${anemployee.email}`}</td>
                    <td>{`${anemployee.nationality}`}</td>
                    <td>{`${anemployee.ethnic}`}</td>
                    <td>{`${formatteddate}`}</td>
                    <td>{`${anemployee.admin}`}</td>
                    <td><a href="#">View employee details</a></td>
                    <td><a href="#">Edit employee details</a></td>
                    <td><a href="#">Delete employee</a></td>
                </tr>
            )
        })
    }

    componentDidMount() {
        console.log("employees componentDidMount");
        console.log(this.props.companyId)
        if(this.props.companyId){
            this.getAllUsers();
        }
    }

    render() {
        console.log("in employees");
        let errorMessage = null;
        if (this.state.errorMessage !== ""){
            errorMessage = (<Col xs={12} className={mainStyles.formError}><p>{this.state.errorMessage}</p></Col>);
        }

        let empinfo = "";
        if(this.state.employees){
            let allstaff = this.state.employees;
            empinfo = this.mapfunc(allstaff);
        }

        return (
            <Row>
                <Col>
                    <h2>Employees</h2>
                    <Link to="/contracts">Create new contract </Link>
                    <Link to="/payroll">Create new payroll</Link>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">NRIC/FIN</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Nationality</th>
                                <th scope="col">Ethnicity</th>
                                <th scope="col">Birthdate</th>
                                <th scope="col">Admin</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {empinfo}
                        </tbody>
                    </table>
                </Col>
            </Row>
        )
    }
}

Employees.propTypes ={
    history: PropTypes.object
};

export default Employees;