/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {connect} = require('react-redux');
const {loadMapConfig} = require('../actions/disaster');
const MapViewer = connect(() => ({}), {
    loadMapConfig: loadMapConfig.bind(null, "static/js/config.json", false, "/risks/geom/loc/AF/")
})(require('../../MapStore2/web/client/containers/MapViewer'));

const {drillUpSelector} = require('../selectors/disaster');
const {zoom} = require('../actions/disaster');

const DrillUpBtn = connect(drillUpSelector, {zoomOut: zoom})(require('../components/DrillUpBtn'));

const MapContainer = (props) => (
        <div className="col-sm-5">
            <div style={{ height: 400, display: 'block'}}>
                <MapViewer plugins={props.plugins} params={{mapType: "leaflet"}}/>
            </div>
            <div style={{ position: 'relative', top: 35, left: -17}}>
                <DrillUpBtn/>
            </div>
        </div>
);

module.exports = MapContainer;
