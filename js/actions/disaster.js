/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const axios = require('../../MapStore2/web/client/libs/ajax');

const DATA_LOADING = 'DATA_LOADING';
const DATA_LOADED = 'DATA_LOADED';
const DATA_ERROR = 'DATA_ERROR';
const ANALYSIS_DATA_LOADED = 'ANALYSIS_DATA_LOADED';
const TOGGLE_DIM = 'TOGGLE_DIM';

function toggleDim() {
    return {
        type: TOGGLE_DIM
    };
}
function dataLoading() {
    return {
        type: DATA_LOADING
    };
}
function dataLoaded(data) {
    return {
        type: DATA_LOADED,
        data
    };
}
function analysisDataLoaded(data) {
    return {
        type: ANALYSIS_DATA_LOADED,
        data
    };
}
function dataError(error) {
    return {
        type: DATA_ERROR,
        error
    };
}
function getData(url) {
    return (dispatch) => {
        dispatch(dataLoading());
        return axios.get(url).then((response) => {
            let state = response.data;
            if (typeof state !== "object") {
                try {
                    state = JSON.parse(state);
                } catch(e) {
                    dispatch(dataError(e.message));
                }
            }
            dispatch(dataLoaded(state));
        }).catch((e) => {
            dispatch(dataError(e));
        });
    };
}
function getAnalysisData(url) {
    return (dispatch) => {
        dispatch(dataLoading());
        return axios.get(url).then((response) => {
            let state = response.data;
            if (typeof state !== "object") {
                try {
                    state = JSON.parse(state);
                } catch(e) {
                    dispatch(dataError(e.message));
                }
            }
            dispatch(analysisDataLoaded(state));
        }).catch((e) => {
            dispatch(dataError(e));
        });
    };

}
module.exports = {
    DATA_LOADING,
    DATA_LOADED,
    DATA_ERROR,
    ANALYSIS_DATA_LOADED,
    TOGGLE_DIM,
    dataError,
    dataLoaded,
    dataLoading,
    getData,
    getAnalysisData,
    toggleDim
};
