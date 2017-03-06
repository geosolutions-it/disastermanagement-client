/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {connect} = require('react-redux');

const Localized = require('../../MapStore2/web/client/components/I18N/Localized');
const TopBar = require('../components/TopBar');

const Home = React.createClass({
    propTypes: {
        params: React.PropTypes.object,
        locale: React.PropTypes.string,
        messages: React.PropTypes.object
    },
    componentWillMount() {
        console.log(this.props.params.splat);
    },
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.params.splat !== this.props.params.splat);
    },
    render() {
        const {messages, locale} = this.props;
        return (
            <Localized messages={messages} locale={locale}>
               <TopBar/>
            </Localized>
        );
    }
});

module.exports = connect((state) => {
    return {
        error: state.loadingError || (state.locale && state.locale.localeError) || null,
        locale: state.locale && state.locale.current,
        messages: state.locale && state.locale.messages || {}
    };
})(Home);
