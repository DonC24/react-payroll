import React from 'react';
import PropTypes from 'prop-types';
import PayrollForm from './payroll-form';
import {Col, Row} from "react-bootstrap";

class Payroll extends React.Component {
    render() {
        return (
            <Row>
                <Col lg={4}>
                    <h2>Payroll</h2>
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