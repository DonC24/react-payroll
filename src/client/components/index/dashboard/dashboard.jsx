import React from 'react';
import {Col,Row, Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Employees from "./employees";
import mainStyles from "../../..//style.scss";

class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            errorMessage: "",
            currentuser: null,
            employees: []
        };
    }

    getCurrentUser = () => {
        console.log("getting currentuser");
        let reactThis = this;
        fetch('/get_user_info')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // return JSON.stringify(res);
                this.setState({currentuser : res});
            })
            .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        console.log("component did mount");
        this.getCurrentUser();
    }

    render() {
        console.log("in dashboard");
        let errorMessage = null;
        if (this.state.errorMessage !== ""){
            errorMessage = (<Col xs={12} className={mainStyles.formError}><p>{this.state.errorMessage}</p></Col>);
        }

        let main = "";
        if(this.state.currentuser){
            if(this.state.currentuser.admin === true){
                console.log(this.state.currentuser.company_id)
                let company_id = parseInt(this.state.currentuser.company_id);
                main = <Employees companyId={company_id} />
            }
        }


        return (
            <Row>
                <Col>
                    <h2>Dashboard</h2>
                    {main}
                </Col>
            </Row>
        )
    }
}

Dashboard.propTypes ={
    history: PropTypes.object
};

export default Dashboard;