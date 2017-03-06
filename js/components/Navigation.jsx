/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');

const Navigation = React.createClass({
    propTypes: {
        items: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            label: React.PropTypes.string.isRequired,
            href: React.PropTypes.string,
            active: React.PropTypes.bool
        })),
        goTo: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            items: [],
            goTo: ()=> {}
        };
    },
    renderItem() {
        const {items, goTo} = this.props;
        return items.map((el, idx) => (
            <button key={idx} className={`btn btn-default ${el.active ? 'disabled' : ''}`} onClick={() => goTo(el.href)}>{el.label}</button>));
    },
    render() {
        return (
        <div className="breadcrumb">
            <div className="btn-group btn-group-xs">
                <button className="btn btn-default"><i className="icon-pin"></i></button>
                {this.renderItem()}
            </div>
        </div>);
    }
});

module.exports = Navigation;
