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
          title: React.PropTypes.string.isRequired,
          mnemonic: React.PropTypes.string.isRequired,
          herf: React.PropTypes.string,
          riskAnalysis: React.PropTypes.number
        })),
        overviewHref: React.PropTypes.string,
        activeRisk: React.PropTypes.string,
        getData: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            getData: () => {}
        };
    },
    getItems() {
        const {riskItems, activeRisk, getData, overviewHref} = this.props;
        const items = [{
                    "mnemonic": "Overview",
                    "title": "Overview",
                    "riskAnalysis": 1,
                    "href": overviewHref
            }, ...riskItems];
        return items.map((item, idx) => {
            const {title, href, riskAnalysis, mnemonic} = item;
            const active = activeRisk === mnemonic;
            return (
            <li key={idx} className={`${riskAnalysis > 0 ? '' : 'no-data'} text-center  ${active ? 'active' : ''}`} onClick={active ? () => {} : () => getData(href)}>
                    <i className={`fa hazard-icon icon-${mnemonic.toLowerCase()}`}></i><br/>
                    {title}
                    {active ? (<div className="arrow"></div>) : null}
            </li>);
        });
    },
    render() {
        return (
            <ul className="hazard-types-list horizontal list-unstyled" role="tablist">
            {this.getItems()}
            </ul> );
    }
});

module.exports = RiskSelector;
