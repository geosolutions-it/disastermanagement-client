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

const TopBar = React.createClass({
    propTypes: {
        navItems: React.PropTypes.array,
        riskItems: React.PropTypes.array,
        getData: React.PropTypes.func,
        activeRisk: React.PropTypes.string,
        overviewHref: React.PropTypes.string,
        title: React.PropTypes.string.isRequired
    },
    getDefaultProps() {
        return {
            navItems: [],
            riskItems: [],
            getData: () => {},
            title: ''
        };
    },
    render() {
        const {navItems, riskItems, title, overviewHref, activeRisk, getData} = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="pull-right">
                        <DownloadBtn/>
                    </div>
                    <Navigation items={navItems} getData={getData}/>
                </div>
                <div className="container text-center">
                    <h2>
                    {title}
                    </h2>
                    <RiskSelector riskItems={riskItems} overviewHref={overviewHref} activeRisk={activeRisk} getData={getData}/>
                </div>
            </div>);
    }
});

module.exports = TopBar;
