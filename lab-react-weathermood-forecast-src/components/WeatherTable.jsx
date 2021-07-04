//weatherTable.jsx

import React from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Col,
} from 'reactstrap';


import './WeatherTable.css'

export default class WeatherTable extends React.Component {
    static propTypes = {
        masking: PropTypes.bool,
        groups: PropTypes.array,
        descriptions: PropTypes.array,
        temps: PropTypes.array,
        unit: PropTypes.string
    };

    constructor(props) {
        super(props);

    }

    render() {

        let foreCastObjList = this.props.foreCastObjList;
        console.log("foreCastObjList",foreCastObjList);
        let days = ['Sun:', 'Mon:', 'Tues:', 'Wed:', 'Thrus:', 'Fri:', 'Sat:'];
        if (!foreCastObjList[1]) return <div />;//console.log("--");
        return ( 
            <div className={`weather-table ${this.props.masking
                ? 'masking'
                : ''}`}>
                <Row className="text-center">
                  <Col>
                      {days[foreCastObjList[1].dates.getDay()]}
                      {foreCastObjList[1].temp.toFixed(0)}&ordm;{(this.props.unit === 'metric') ? 'C' : 'F'}
                      <i className={`owf owf-${foreCastObjList[1].codes} owf-lg`}></i>
                  </Col>
                  <Col>
                      {days[foreCastObjList[3].dates.getDay()]}
                      {foreCastObjList[3].temp.toFixed(0)}&ordm;{(this.props.unit === 'metric') ? 'C' : 'F'}
                      <i className={`owf owf-${foreCastObjList[3].codes} owf-lg`}></i>
                  </Col>
                  <Col className="hide_mb">
                      {days[foreCastObjList[5].dates.getDay()]}
                      {foreCastObjList[5].temp.toFixed(0)}&ordm;{(this.props.unit === 'metric') ? 'C' : 'F'}
                      <i className={`owf owf-${foreCastObjList[5].codes} owf-lg`}></i>
                  </Col>
                  <Col className="hide_mb">
                      {days[foreCastObjList[6].dates.getDay()]}
                      {foreCastObjList[6].temp.toFixed(0)}&ordm;{(this.props.unit === 'metric') ? 'C' : 'F'}
                      <i className={`owf owf-${foreCastObjList[6].codes} owf-lg`}></i>
                  </Col>
                </Row>
            </div>
        );
    }


    
}