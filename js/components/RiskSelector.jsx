/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const RiskSelector = React.createClass({
    propTypes: {
        riskItems: React.PropTypes.arrayOf(React.PropTypes.shape({
          label: React.PropTypes.string.isRequired,
          herf: React.PropTypes.string,
          active: React.PropTypes.bool,
          icon: React.PropTypes.string
        })),
        goTo: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            goTo: () => {}
        };
    },
    render() {
        return (
            <ul className="hazard-types-list horizontal list-unstyled" role="tablist">
                <li className="overview text-center ">
                    <a href="http://thinkhazard.org/report/65657-chad-barl-el-gazal-salal">
                        <i className="fa hazard-icon icon-overview"></i><br/>Overview
                    </a>
                </li>
                <li className="text-center ">
                    <a href="http://thinkhazard.org/report/65657-chad-barl-el-gazal-salal/FL">
                        <i className="fa hazard-icon icon-fl"></i><br/>River flood
                    </a>
                </li>
                <li className="VLO text-center active">
                    <a href="http://thinkhazard.org/report/65657-chad-barl-el-gazal-salal/EQ">
                        <i className="fa hazard-icon icon-eq"></i><br/>Earthquake
                        <div className="arrow"></div>
                    </a>
                </li>
                <li className="MED text-center ">

                        <i className="fa hazard-icon icon-dg"></i><br/>Water scarcity
                </li>
                <li className="no-data text-center ">
                    <a>
                        <i className="fa hazard-icon icon-cy"></i><br/>Cyclone
                    </a>
                </li>
                <li className="no-data text-center ">
                    <a>
                        <i className="fa hazard-icon icon-cf"></i><br/>Coastal flood
                    </a>
                </li>
                <li className="no-data text-center ">
                    <a>
                        <i className="fa hazard-icon icon-ts"></i><br/>Tsunami
                    </a>
                </li>
                <li className="VLO text-center ">
                    <a href="http://thinkhazard.org/report/65657-chad-barl-el-gazal-salal/VA">
                        <i className="fa hazard-icon icon-va"></i><br/>Volcano
                    </a>
                </li>
                <li className="no-data text-center ">
                    <a>
                        <i className="fa hazard-icon icon-ls"></i><br/>Landslide
                    </a>
                </li>
            </ul> );
    }
});

module.exports = RiskSelector;
