import React from 'react';
import PropTypes from 'prop-types';
import ContractForm from './contract-form';
import {Col, Row} from "react-bootstrap";

class Contract extends React.Component {
    render() {
        return (
            <Row>
                <Col lg={4}>
                    <h2>Contract</h2>
                </Col>
                <Col lg={{span:6, offset:1}}>
                    <ContractForm history={this.props.history}/>
                </Col>
            </Row>

        );
    }
}
Contract.propTypes ={
    history: PropTypes.object
};
export default Contract;