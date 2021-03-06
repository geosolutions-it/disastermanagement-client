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
    ANALYSIS_DATA_LOADED,
    SET_DIM_IDX
} = require('../actions/disaster');

function disaster(state = {dim: {dim1: 0, dim2: 1}}, action) {
    switch (action.type) {
        case DATA_LOADING:
            return assign({}, state, {
                loading: true
            });
        case DATA_LOADED: {
            return action.cleanState ? assign({}, { loading: false, error: null}, action.data) : assign({}, { loading: false, error: null, dim: state.dim, dimIdx: state.dimIdx, riskAnalysis: state.riskAnalysis}, action.data);
        }
        case ANALYSIS_DATA_LOADED: {
            return assign({}, state, { loading: false, error: null, riskAnalysis: action.data});
        }
        case TOGGLE_DIM: {
            const newDim = state.dim && {dim1: state.dim.dim2, dim2: state.dim.dim1} || {dim1: 1, dim2: 0};
            return assign({}, state, {dim: newDim, dimIdx: 0});
        }
        case SET_DIM_IDX: {
            return assign({}, state, {dimIdx: action.idx});
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
