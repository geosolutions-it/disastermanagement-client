/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const assign = require('object-assign');
const {
    DATA_LOADING,
    DATA_LOADED,
    DATA_ERROR,
    TOGGLE_DIM,
    ANALYSIS_DATA_LOADED
} = require('../actions/disaster');

function disaster(state = {}, action) {
    switch (action.type) {
        case DATA_LOADING:
            return assign({}, state, {
                loading: true
            });
        case DATA_LOADED: {
            return assign({}, { loading: false, error: null}, action.data);
        }
        case ANALYSIS_DATA_LOADED: {
            return assign({}, state, { loading: false, error: null, riskAnalysisData: action.data.riskAnalysisData});
        }
        case TOGGLE_DIM: {
            const dim = state.dim === 1 ? 0 : 1;
            return assign({}, state, { dim});
        }
        case DATA_ERROR:
            return assign({}, state, {
                error: action.error,
                loading: false
            });
        default:
            return state;
    }
}

module.exports = disaster;
