/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {connect} = require('react-redux');

const Overview = connect(({disaster = {}}) => ({riskItems: disaster.overview || [] }) )(require('../components/Overview'));

const DataContainer = React.createClass({
    propTypes: {
        getData: React.PropTypes.func,
        showHazard: React.PropTypes.bool,
        className: React.PropTypes.string,
        hazardType: React.PropTypes.shape({
            mnemonic: React.PropTypes.string,
            description: React.PropTypes.string,
            analysisTypes: React.PropTypes.arrayOf(React.PropTypes.shape({
                name: React.PropTypes.string,
                title: React.PropTypes.string,
                href: React.PropTypes.string
                }))
        })
    },
    getDefaultProps() {
        return {
            showHazard: false,
            getData: () => {},
            className: "col-sm-7"
        };
    },
    renderHazard() {
        return (<div className={this.props.className}>
                <div className="analysis-header">
                <ul className="nav nav-tabs navbar-right">
                    <li role="presentation" className="active"><a>Loss Impact</a>
                    <div className="arrow"></div>
                    </li>
                    <li role="presentation" className=""><a>Impact</a></li>
                </ul>
                <h2 className="page-header">
                    Titolo
                </h2>
                </div>
            </div>);
    },
    render() {
        const {showHazard} = this.props;
        return (
            <div className="container">
                <div className="row">
                    {showHazard ? this.renderHazard() : (<Overview className={this.props.className} getData={this.loadData}/>)}
                </div>
            </div>);
    }
});

module.exports = connect(({disaster = {}}) => ({showHazard: disaster.hazardType && disaster.hazardType.mnemonic ? true : false}) )(DataContainer);
