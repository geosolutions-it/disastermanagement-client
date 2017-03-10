/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {connect} = require('react-redux');
const {BarChart, Bar, XAxis, Cell, Tooltip} = require('recharts');
const {dataContainerSelector} = require('../selectors/disaster');
const {getAnalysisData, toggleDim} = require('../actions/disaster');
const Overview = connect(({disaster = {}}) => ({riskItems: disaster.overview || [] }) )(require('../components/Overview'));

const DataContainer = React.createClass({
    propTypes: {
        getData: React.PropTypes.func,
        getAnalysis: React.PropTypes.func,
        toggleDim: React.PropTypes.func,
        showHazard: React.PropTypes.bool,
        className: React.PropTypes.string,
        hazardTitle: React.PropTypes.string,
        analysisType: React.PropTypes.object,
        riskAnalysisData: React.PropTypes.object,
        dim: React.PropTypes.number,
        hazardType: React.PropTypes.shape({
            mnemonic: React.PropTypes.string,
            description: React.PropTypes.string,
            analysisTypes: React.PropTypes.arrayOf(React.PropTypes.shape({
                name: React.PropTypes.string,
                title: React.PropTypes.string,
                href: React.PropTypes.string
                }))
        })
    },
    getDefaultProps() {
        return {
            showHazard: false,
            getData: () => {},
            getAnalysis: () => {},
            className: "col-sm-7",
            dim: 0
        };
    },
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    getChartData(data, val) {
        const {dim} = this.props;
        const nameIdx = dim === 0 ? 1 : 0;
        return data.filter((d) => d[nameIdx] === val ).map((v) => {return {"name": v[dim], "value": parseInt(v[2], 10)}; });
    },
    renderAnalysisData() {
        const {dim, toggleDim: tDim} = this.props;
        const secDim = dim === 0 ? 1 : 0;
        const {hazardSet, data} = this.props.riskAnalysisData;
        return (<div><h4>{hazardSet.title}</h4><br/>
                    {hazardSet.purpose}
                    <br/>
                    <h4 style={{color: 'blue', cursor: 'pointer'}} onClick={tDim}>{`Switch to ${data.dimensions[secDim].name}`}</h4>
                    <ul>
                    {data.dimensions[dim].values.map((val) => {
                        const chartData = this.getChartData(data.values, val);
                        if (chartData.length === 0 ) {
                            return undefined;
                        }
                        return (<li key={val} style={{marginBottom: 20}}>
                            {`${data.dimensions[dim].name} ${val}`}
                            <BarChart width={500} height={200} data={chartData}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="name"/>
                                <Tooltip/>
                                <Bar dataKey="value">
                                {
                                    chartData.map((entry, index) => {
                                        return (
                                            <Cell cursor="pointer" fill={this.getRandomColor()} key={`cell-${index}`}/>);
                                    })
                                }
                                </Bar>
                            </BarChart>
                            </li>
                            );
                    }).filter((el) => el)}
                    </ul>
                    </div>);
    },
    renderRiskAnalysis() {
        const {analysisType = {}, getAnalysis} = this.props;
        return analysisType.riskAnalysis.map((rs, idx) => {
            const {title, fa_icon: faIcon, abstract} = rs.hazardSet;
            return (
                <li key={idx} style={{marginBottom: 20}}>
                    <h4 style={{cursor: 'pointer'}}onClick={()=> getAnalysis(rs.href)}>{title}</h4>
                    {<i clasName={faIcon}></i>}
                    <br/>
                    {abstract}
                </li>
                );
        });
    },
    renderAnalysisTab() {
        const {hazardType = {}, analysisType = {}, getData} = this.props;
        return (hazardType.analysisTypes || []).map((type) => {
            const {href, name, title} = type;
            const active = name === analysisType.name;
            return (<li key={name} className={`text-center ${active ? 'active' : ''}`} onClick={() => getData(href)}>
                    <span>{title}</span>
                    {active ? (<div className="arrow"/>) : null}
                    </li>);
        });
    },
    renderHazard() {
        const {analysisType = {}, hazardTitle, riskAnalysisData} = this.props;
        return (<div className={this.props.className}>
                <div className="analysis-header">
                <h2 className="page-header">{hazardTitle}</h2>
                <ul className="analysis-tab horizontal list-unstyled pull-right">
                {this.renderAnalysisTab()}
                </ul>

                </div>
                    {riskAnalysisData.name ? this.renderAnalysisData() : (<div>
                        <h3>{analysisType.title}</h3>
                        <ul>
                        {this.renderRiskAnalysis()}
                    </ul></div>)}
            </div>);
    },
    render() {
        const {showHazard, getData} = this.props;
        return showHazard ? this.renderHazard() : (<Overview className={this.props.className} getData={getData}/>);
    }
});

module.exports = connect(dataContainerSelector, {getAnalysis: getAnalysisData, toggleDim})(DataContainer);
