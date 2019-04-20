import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {View, NavBar} from 'antd-mobile';
import '../styles/ltk_market.less';
import Form from "antd/es/form/Form";
import NetUtils from "../utils/NetUtils";

@inject('store')
@observer
export default class LTKMarketView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topN_bandwidth: null,
            topN_disk: null,
            topN_wkb: null,
            wkb_num: null,
            block_num: null,
            average_onlinetime: null,
            average_bandwidth: null,
            average_disk: null,
            eth_price: 0,
            usdt_price: 0
        }
    }

    componentDidMount() {
        NetUtils.postWithAppAuth("cloudmonitor/api/v1/lkt/market_info", null)
            .then((jsonData) => {
                //console.log(jsonData);
                this.setState({
                    topN_bandwidth: jsonData.data.topN_bandwidth,
                    topN_disk: jsonData.data.topN_disk,
                    topN_wkb: jsonData.data.topN_wkb,
                    wkb_num: jsonData.data.wkb_num,
                    block_num: jsonData.data.block_num,
                    average_onlinetime: jsonData.data.average_onlinetime,
                    average_bandwidth: jsonData.data.average_bandwidth,
                    average_disk: jsonData.data.average_disk,
                });
            })
            .catch((err) => {
                console.log(err);
            });

        // setInterval(() => {
            NetUtils.postWithAppAuth("cloudmonitor/api/v1/ltk/price_info", null)
                .then((jsonData) => {
                    //console.log(jsonData);
                    this.setState({
                        eth_price: jsonData.eth,
                        usdt_price: jsonData.usdt,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
       // }
        // , 10000)
    }

    topWkb = (topN_wkb) => {
        const top = (index, phone, num) => (
            <div key={index + phone + num} style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 10}}>
                <div style={{flex: 0, color: '#333', fontSize: '16px', textAlign: 'center'}}>{index + '.'}</div>
                <div
                    style={{flex: 0, color: '#999', fontSize: '16px', textAlign: 'center', marginLeft: 6}}>{phone}</div>
                <div style={{
                    flex: 1,
                    color: '#333',
                    fontSize: '16px',
                    textAlign: 'center',
                    justifyContent: 'flex-end'
                }}>{parseFloat(num).toFixed(2) + '（个）'}</div>
            </div>
        );
        let items = [];
        if (topN_wkb != null) {
            for (let i = 0; i < topN_wkb.length; i++) {
                if (topN_wkb[i].phone === "") {
                    topN_wkb[i].phone = "135*********"
                }
                items.push(top(i + 1, topN_wkb[i].phone, topN_wkb[i].wkb));
            }
        }
        return items
    };

    topDisk = (topN_disk) => {
        const top = (index, phone, disk) => (
            <div key={index + phone + disk} style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 10}}>
                <div style={{flex: 0, color: '#333', fontSize: '16px', textAlign: 'center'}}>{index + '.'}</div>
                <div
                    style={{flex: 0, color: '#999', fontSize: '16px', textAlign: 'center', marginLeft: 6}}>{phone}</div>
                <div style={{
                    flex: 1,
                    color: '#333',
                    fontSize: '16px',
                    textAlign: 'center',
                    justifyContent: 'flex-end'
                }}>{disk + '（GB）'}</div>
            </div>
        );
        let items = [];
        if (topN_disk != null) {
            for (let i = 0; i < topN_disk.length; i++) {
                if (topN_disk[i].phone === "") {
                    topN_disk[i].phone = "135*********"
                }
                items.push(top(i + 1, topN_disk[i].phone, topN_disk[i].disk));
            }
        }
        return items
    };

    topBandwidth = (topN_bandwidth) => {
        const top = (index, phone, bandwidth) => (
            <div key={index + phone + bandwidth}
                 style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 10}}>
                <div style={{flex: 0, color: '#333', fontSize: '16px', textAlign: 'center'}}>{index + '.'}</div>
                <div
                    style={{flex: 0, color: '#999', fontSize: '16px', textAlign: 'center', marginLeft: 6}}>{phone}</div>
                <div style={{
                    flex: 1,
                    color: '#333',
                    fontSize: '16px',
                    textAlign: 'center',
                    justifyContent: 'flex-end'
                }}>{bandwidth + '（Mbps）'}</div>
            </div>
        );
        let items = [];
        if (topN_bandwidth != null) {
            for (let i = 0; i < topN_bandwidth.length; i++) {
                if (topN_bandwidth[i].phone === "") {
                    topN_bandwidth[i].phone = "135*********"
                }
                items.push(top(i + 1, topN_bandwidth[i].phone, topN_bandwidth[i].bandwidth));
            }
        }
        return items
    };

    render() {
        return (
            <View className='ltkMarket'>
                <View className="navBar">
                    <NavBar
                        mode="light"
                        leftContent=""
                        rightContent={[]}
                    >行情</NavBar>
                </View>

                <div className="title">
                    <div style={{color: '#008CFF', fontSize: '16px', fontWeight: 'bold'}}>链克BBX交易所实时价格</div>

                    <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: '16px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <div style={{
                                color: '#333',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>{this.state.eth_price}</div>
                            <div style={{
                                color: '#999',
                                fontSize: '10px',
                                textAlign: 'center',
                                marginTop: '10px'
                            }}>{'LTK/ETH'}</div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <div style={{
                                color: '#333',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>{this.state.usdt_price}</div>
                            <div style={{
                                color: '#999',
                                fontSize: '10px',
                                textAlign: 'center',
                                marginTop: '10px'
                            }}>{'LTK/USDT'}</div>
                        </div>
                    </div>
                </div>

                <div className="title">
                    <div style={{color: '#008CFF', fontSize: '16px', fontWeight: 'bold'}}>链克区块链累计情况</div>

                    <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: '16px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <div style={{
                                color: '#333',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>{this.state.wkb_num}</div>
                            <div style={{
                                color: '#999',
                                fontSize: '10px',
                                textAlign: 'center',
                                marginTop: '10px'
                            }}>{'链克产量'}</div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <div style={{
                                color: '#333',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>{this.state.block_num}</div>
                            <div style={{
                                color: '#999',
                                fontSize: '10px',
                                textAlign: 'center',
                                marginTop: '10px'
                            }}>{'链克高度'}</div>
                        </div>
                    </div>
                </div>

                <div className="title">
                    <div style={{color: '#008CFF', fontSize: '16px', fontWeight: 'bold'}}>资源共享人均表现</div>

                    <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: '16px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <div style={{
                                color: '#333',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>{this.state.average_onlinetime}</div>
                            <div style={{
                                color: '#999',
                                fontSize: '10px',
                                textAlign: 'center',
                                marginTop: '10px'
                            }}>{'人均在线(小时)'}</div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <div style={{
                                color: '#333',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>{this.state.average_bandwidth}</div>
                            <div style={{
                                color: '#999',
                                fontSize: '10px',
                                textAlign: 'center',
                                marginTop: '10px'
                            }}>{'人均上行带宽(Mbps)'}</div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <div style={{
                                color: '#333',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>{this.state.average_disk}</div>
                            <div style={{
                                color: '#999',
                                fontSize: '10px',
                                textAlign: 'center',
                                marginTop: '10px'
                            }}>{'人均存储(GB)'}</div>
                        </div>
                    </div>
                </div>

                <div className="title">
                    <div style={{color: '#008CFF', fontSize: '16px', fontWeight: 'bold', marginBottom: 10}}>链克榜Top5
                    </div>

                    {this.topWkb(this.state.topN_wkb)}
                </div>

                <div className="title">
                    <div style={{color: '#008CFF', fontSize: '16px', fontWeight: 'bold', marginBottom: 10}}>上行带宽榜Top5
                    </div>

                    {this.topBandwidth(this.state.topN_bandwidth)}
                </div>

                <div className="title">
                    <div style={{color: '#008CFF', fontSize: '16px', fontWeight: 'bold', marginBottom: 10}}>存储榜Top5
                    </div>

                    {this.topDisk(this.state.topN_disk)}
                </div>

                <div style={{height: 20}}/>
            </View>
        )
    }
}

LTKMarketView = Form.create()(LTKMarketView);
