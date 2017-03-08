/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {connect} = require('react-redux');
const {dataContainerSelector} = require('../selectors/disaster');
const Overview = connect(({disaster = {}}) => ({riskItems: disaster.overview || [] }) )(require('../components/Overview'));

const DataContainer = React.createClass({
    propTypes: {
        getData: React.PropTypes.func,
        showHazard: React.PropTypes.bool,
        className: React.PropTypes.string,
        hazardTitle: React.PropTypes.string,
        analysisType: React.PropTypes.object,
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
    renderRiskAnalysis() {
        const {analysisType = {}} = this.props;
        return analysisType.riskAnalysis.map((rs, idx) => {
            return (
                <li key={idx} style={{marginBottom: 20}}>
                    {rs.name}
                    <ul><li>
                    <h4>{rs.hazardSet.title}</h4>
                    {rs.hazardSet.abstract}
                    </li>
                    </ul>
                </li>
                );
        });
    },
    renderAnalysisTab() {
        const {hazardType = {}, analysisType = {}, getData} = this.props;
        return (hazardType.analysisTypes || []).map((type) => {
            const {href, name, title} = type;
            const active = name === analysisType.name;
            return (<li key={name} className={`text-center ${active ? 'active' : ''}`} onClick={active ? () => {} : () => getData(href)}>
                <span>{title}</span>
                    {active ? (<div className="arrow"/>) : null}
                    </li>);
        });
    },
    renderHazard() {
        const {hazardType = {}, analysisType = {}, hazardTitle} = this.props;
        return (<div className={this.props.className}>
                <div className="analysis-header">
                <h2 className="page-header">{hazardTitle}</h2>
                <ul className="analysis-tab horizontal list-unstyled pull-right">
                {this.renderAnalysisTab()}
                </ul>

                </div>
                <div>
                    <h3>{analysisType.title}</h3>
                    <ul>
                    {this.renderRiskAnalysis()}
                    </ul>
                </div>
            </div>);
    },
    render() {
        const {showHazard, getData} = this.props;
        return (
            <div className="container">
                <div className="row">
                    {showHazard ? this.renderHazard() : (<Overview className={this.props.className} getData={getData}/>)}
                </div>
            </div>);
    }
});

module.exports = connect(dataContainerSelector)(DataContainer);
