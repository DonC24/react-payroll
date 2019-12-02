import React from 'react';
import PropTypes from 'prop-types';
import ContractForm from './contract-form';
import {Col, Row} from "react-bootstrap";

class Payroll extends React.Component {
    render() {
        return (
            <Row>
                <Col lg={4}>
                    <h2>Contract</h2>
                </Col>
                <Col lg={{span:6, offset:1}}>
                    <PayrollForm history={this.props.history}/>
                </Col>
            </Row>

        );
    }
}
Payroll.propTypes ={
    history: PropTypes.object
};
export default Payroll;