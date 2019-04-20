import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {NavBar, View, Text} from 'antd-mobile';
import '../styles/ltk_info.less';
import Form from "antd/es/form/Form";
import store from "store";

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import NetUtils from "../utils/NetUtils";
import {Modal, Toast} from "antd-mobile/lib/index";
import history from "../router/history";

const alert = Modal.alert;

@inject('store')
@observer
export default class LTKInfoView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emptyData: false,
            lastIncome: null,
            lastAverage: null,
            currentMonthIncome: null,
            totalIncome: null,
            totalOutcome: null,
            remainderCoin: null,
            sevenDaysDate: [],
            sevenDaysIncome: [],
            chartMin: 0,
            chartMax: 0
        };
    }

    componentDidUpdate() {
        if (this.state.emptyData === false) {
            this.showChart()
        }
    }

    showChart() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('main'));

        // 绘制图表
        myChart.setOption({
            title: {},
            tooltip: {},
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.state.sevenDaysDate,
                //坐标轴颜色
                axisLine: {
                    lineStyle: {},
                },
                //x轴文字旋转
                axisLabel: {
                    rotate: 30,
                    interval: 0,
                    textStyle: {
                        color: '#666',
                        fontSize: 12,
                        fontFamily: '微软雅黑'
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    rotate: 0,
                    margin: 10,
                    show: true,
                    formatter: '{value}',
                    textStyle: {
                        color: '#666',
                        fontSize: 12,
                        fontFamily: '微软雅黑'
                    }
                },
                axisTick: {
                    show: true,//是否显示坐标轴刻度
                },
                min: this.state.chartMin,
                max: this.state.chartMax,
                splitNumber: 10
            },
            series: [{
                name: '收入',
                type: 'line',
                itemStyle: {
                    normal: {
                        label: {show: true},
                        color: "#008CFF" //图标颜色
                    }

                },
                lineStyle: {
                    normal: {
                        width: 2,  //连线粗细
                        color: "#008CFF"  //连线颜色
                    }
                },
                smooth: true,//折线图是趋缓的
                data: this.state.sevenDaysIncome
            }]
        });
    }

    getCoin = () => {
        if (store.get('user_id') === undefined) {
            return;
        }

        let userId = store.get('user_id').name;

        let data = new Map();
        data.set('user_id', userId);

        NetUtils.postWithUserAuth("cloudmonitor/api/v1/device/draw_ltk_all", data)
            .then((jsonData) => {
                Toast.info('提取成功');
                history.replace("/")
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getCoinDialog = () => {
        alert('提取链克', '确定要提取所有账号的链克到钱包吗?', [
            {text: '暂不提取', onPress: null},
            {text: '确认提取', onPress: this.getCoin.bind(this)},
        ])
    };

    componentDidMount() {
        if (store.get('user_id') === undefined) {
            return
        }
        let data = new Map();
        data.set('user_id', store.get('user_id').name);

        NetUtils.postWithUserAuth("cloudmonitor/api/v1/device/get_days_income", data)
            .then((jsonData) => {
                //console.log(jsonData);
                if (jsonData.last_income === null || jsonData.last_income === undefined) {
                    this.setState({emptyData: true});
                    return;
                }
                this.setState({
                    lastIncome: jsonData.last_income,
                    lastAverage: jsonData.last_average,
                    currentMonthIncome: jsonData.current_month_income,
                    totalIncome: jsonData.total_income,
                    totalOutcome: jsonData.total_outcome,
                    remainderCoin: jsonData.remainder_coin,
                    sevenDaysDate: jsonData.seven_days_date,
                    sevenDaysIncome: jsonData.seven_days_income,
                    chartMin: jsonData.chart_min,
                    chartMax: jsonData.chart_max
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderList() {
        if (this.state.emptyData) {
            return (
                <View className="loading-view">
                    <Text className="ltk-loading-text">暂无账号</Text>
                    <Text className="ltk-empty-text">请先添加账号</Text>
                </View>
            )
        } else {
            return (
                <div>
                    <div className="title">
                        <div style={{color: '#008CFF', fontSize: '16px', fontWeight: 'bold'}}>近期产量统计</div>

                        <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: '16px'}}>
                            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                                <div style={{
                                    color: '#333',
                                    fontSize: '18px',
                                    textAlign: 'center'
                                }}>{this.state.lastIncome}</div>
                                <div style={{
                                    color: '#999',
                                    fontSize: '10px',
                                    textAlign: 'center',
                                    marginTop: '8px'
                                }}>{'昨日总产量'}</div>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                                <div style={{
                                    color: '#333',
                                    fontSize: '18px',
                                    textAlign: 'center'
                                }}>{this.state.lastAverage}</div>
                                <div style={{
                                    color: '#999',
                                    fontSize: '10px',
                                    textAlign: 'center',
                                    marginTop: '8px'
                                }}>{'昨日平均'}</div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                                <div style={{
                                    color: '#333',
                                    fontSize: '18px',
                                    textAlign: 'center'
                                }}>{this.state.currentMonthIncome}</div>
                                <div style={{
                                    color: '#999',
                                    fontSize: '10px',
                                    textAlign: 'center',
                                    marginTop: '8px'
                                }}>{'本月总产量'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="title">
                        <div style={{color: '#008CFF', fontSize: '16px', fontWeight: 'bold'}}>总产量统计</div>

                        <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: '16px'}}>
                            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                                <div style={{
                                    color: '#333',
                                    fontSize: '18px',
                                    textAlign: 'center'
                                }}>{this.state.totalIncome}</div>
                                <div style={{
                                    color: '#999',
                                    fontSize: '10px',
                                    textAlign: 'center',
                                    marginTop: '8px'
                                }}>{'总产量'}</div>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                                <div style={{
                                    color: '#333',
                                    fontSize: '18px',
                                    textAlign: 'center'
                                }}>{this.state.totalOutcome}</div>
                                <div style={{
                                    color: '#999',
                                    fontSize: '10px',
                                    textAlign: 'center',
                                    marginTop: '8px'
                                }}>{'已提链克'}</div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                                <div style={{
                                    color: '#333',
                                    fontSize: '18px',
                                    textAlign: 'center'
                                }}>{this.state.remainderCoin}</div>
                                <div style={{
                                    color: '#999',
                                    fontSize: '10px',
                                    textAlign: 'center',
                                    marginTop: '8px'
                                }}>{'可提链克'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="title">
                        <div style={{color: '#008CFF', fontSize: '16px', fontWeight: 'bold'}}>近7天产量趋势</div>

                        <div id="main" style={{height: 300, marginTop: -30}}/>
                    </div>

                    <div style={{height: 20}}/>
                </div>
            )
        }
    }

    render() {
        return (
            <div className='ltkInfo'>
                <NavBar
                    mode="light"
                    leftContent=""
                    rightContent={
                        <Text type="ghost" className='addAccount' onClick={this.getCoinDialog.bind(this)} style={{
                            borderRadius: '6px',
                            padding: '5px',
                            color: '#ffffff',
                            backgroundColor: '#008CFF',
                            fontSize: '12px'
                        }}>一键提币</Text>
                    }
                >链克</NavBar>
                {this.renderList()}
            </div>
        )
    }
}

LTKInfoView = Form.create()(LTKInfoView);