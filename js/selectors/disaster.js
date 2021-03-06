const {createSelector} = require('reselect');
const {last, head, isNull} = require('lodash');

const navItemsSel = ({disaster = {}}) => disaster.navItems || [];
const riskItemsSel = ({disaster = {}}) => disaster.overview || [];
const hazardTypeSel = ({disaster = {}}) => disaster.hazardType || {};
const analysisTypeSel = ({disaster = {}}) => disaster.analysisType || {};
const riskAnalysisDataSel = ({disaster = {}}) => disaster.riskAnalysis && disaster.riskAnalysis.riskAnalysisData || {};
const dimSelector = ({disaster = {}}) => ({dim: disaster.dim || {dim1: 0, dim2: 1}, dimIdx: disaster.dimIdx || 0});
const contextSel = ({disaster = {}}) => disaster.context && !isNull(disaster.context) && disaster.context || '';
const topBarSelector = createSelector([navItemsSel, riskItemsSel, hazardTypeSel, contextSel],
     (navItems, riskItems, hazardType, context) => ({
        navItems,
        title: (last(navItems) || {label: ''}).label,
        overviewHref: (last(navItems) || {href: ''}).href,
        riskItems,
        activeRisk: hazardType.mnemonic || "Overview",
        context
    }));
const dataContainerSelector = createSelector([riskItemsSel, hazardTypeSel, analysisTypeSel, riskAnalysisDataSel, dimSelector],
    ( riskItems, hazardType, analysisType, riskAnalysisData, dim) => ({
        showHazard: hazardType.mnemonic ? true : false,
        hazardTitle: hazardType.mnemonic ? head(riskItems.filter((hz) => hz.mnemonic === hazardType.mnemonic)).title || '' : '',
        hazardType,
        analysisType,
        riskAnalysisData,
        dim: dim.dim,
        dimIdx: dim.dimIdx
    }));
const drillUpSelector = createSelector([navItemsSel, contextSel],
     (navItems, context) => ({
        disabled: navItems.length < 2,
        label: navItems.length > 1 ? (navItems[navItems.length - 2]).label : '',
        href: navItems.length > 1 ? (navItems[navItems.length - 2]).href : '',
        geom: navItems.length > 1 ? (navItems[navItems.length - 2]).geom : '',
        context
    }));
const switchDimSelector = createSelector([riskAnalysisDataSel, dimSelector],
    (riskAnalysisData, dim) => ({
    dimName: riskAnalysisData.data && riskAnalysisData.data.dimensions && riskAnalysisData.data.dimensions[dim.dim.dim2].name
    }));
module.exports = {
    drillUpSelector,
    topBarSelector,
    dataContainerSelector,
    switchDimSelector
};

