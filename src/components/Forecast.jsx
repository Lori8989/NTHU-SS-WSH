import React from 'react';
import {getForecast} from 'api/open-weather-map.js';

import './weather.css';

export default class Forecast extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            masking: false
        };

        // TODO
        //this.handleFormQuery = this.handleFormQuery.bind(this);
        //this.showPosition = this.showPosition.bind(this);
    }

    render() {
        return (
            <div className={`forecast weather-bg ${this.state.group}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                    <h1 className='text-center'>Forecast (unit: {this.props.unit})</h1>
                </div>
            </div>
        );
    }
}
