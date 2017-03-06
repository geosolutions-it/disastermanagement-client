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
          iconClass: React.PropTypes.string
        })),
        goTo: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            goTo: () => {}
        };
    },
    getItems() {
        const {riskItems} = this.props;
        return riskItems.map((item, idx) => {
            const {active, label, iconClass, href} = item;
            return (
            <li key={idx} className={`${href ? '' : 'no-data'} text-center ${active ? 'active' : ''}`}>
                <a href={href}>
                    <i className={`fa hazard-icon ${iconClass}`}></i><br/>
                    {label}
                    {active ? (<div className="arrow"></div>) : null}
                </a>
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
