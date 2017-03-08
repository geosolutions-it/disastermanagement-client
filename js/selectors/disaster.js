const {createSelector} = require('reselect');
const {last} = require('lodash');

const navItemsSel = ({disaster = {}}) => disaster.navItems || [];
const riskItemsSel = ({disaster = {}}) => disaster.overview || [];
const hazardTypeSel = ({disaster = {}}) => disaster.hazardType || {};

const topBarSelector = createSelector([navItemsSel, riskItemsSel, hazardTypeSel],
     (navItems, riskItems, hazardType) => ({
        navItems,
        title: (last(navItems) || {label: ''}).label,
        overviewHref: (last(navItems) || {href: ''}).href,
        riskItems,
        activeRisk: hazardType.mnemonic || "Overview"
    }));

module.exports = {
    topBarSelector
};

