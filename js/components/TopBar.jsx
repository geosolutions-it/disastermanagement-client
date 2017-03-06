/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const Navigation = require('./Navigation');
const DownloadBtn = require('./DownloadBtn');
const RiskSelector = require('./RiskSelector');

const {navItems, riskItems} = require('../mockupData.json');

const TopBar = React.createClass({
    propTypes: {
        title: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            title: "Gouruf"
        };
    },
    render() {
        const {title} = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="pull-right">
                        <DownloadBtn/>
                    </div>
                    <Navigation items={navItems}/>
                </div>
                <div className="container text-center">
                    <h2>
                    {title}
                    </h2>
                    <RiskSelector riskItems={riskItems}/>
                </div>
            </div>);
    }
});

module.exports = TopBar;
