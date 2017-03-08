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
            href: React.PropTypes.string
        })),
        getData: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            items: [],
            getData: ()=> {}
        };
    },
    renderItem() {
        const {items, getData} = this.props;
        const length = items.length;
        return items.map((el, idx) => {
            const classes = `btn btn-default ${length - 1 === idx ? 'disabled' : ''}`;
            return (
            <button key={idx} className={classes} onClick={() => getData(el.href)}>{el.label}</button>);
        });
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
