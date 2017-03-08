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
const {getData} = require('../actions/disaster');
const {topBarSelector} = require('../selectors/disaster');
const TopBar = connect(topBarSelector)(require('../components/TopBar'));
const DataContainer = require('../containers/DataContainer');

const Home = React.createClass({
    propTypes: {
        params: React.PropTypes.object,
        locale: React.PropTypes.string,
        messages: React.PropTypes.object,
        getData: React.PropTypes.func
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
               <div>
                    <TopBar getData={this.loadData}/>
                    <DataContainer getData={this.loadData}/>
                </div>
            </Localized>
        );
    },
    loadData(href) {
        this.props.getData(`http://disasterrisk-af.geo-solutions.it${href}`);
    }
});

module.exports = connect((state) => {
    return {
        error: state.loadingError || (state.locale && state.locale.localeError) || null,
        locale: state.locale && state.locale.current,
        messages: state.locale && state.locale.messages || {}
    };
}, {getData})(Home);
