import React, {Component} from 'react';

import {ListView, NavBar, Text, View, Modal, Accordion, ActivityIndicator} from 'antd-mobile';

import '../styles/account.less';
import Form from "antd/es/form/Form";
import store from "store";

import settingImg from '../image/setting.png'
import payImg from '../image/pay.png'
import NetUtils from "../utils/NetUtils";
import {Toast} from "antd-mobile/lib/index";
import history from "../router/history";
import CheckParam from "../utils/CheckParam";

const prompt = Modal.prompt;
const alert = Modal.alert;

export default class AccountInfoView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emptyData: false,
            dataSource: null,
            totalIncome: null,
            onlineNum: null,
            offlineNum: null,
            aveIncome: null,
        };
    }

    addAccount = (account, password) => {
        if (CheckParam.checkPhoneEmail(account) === false) {
            Toast.info('请输入正确的账号');
            return;
        }
        if (password === undefined || password === "") {
            Toast.info('请输入密码');
            return;
        }
        let data = new Map();
        data.set('username', account);
        data.set('password', password);

        NetUtils.postWithUserAuth("cloudmonitor/api/v1/account/add", data)
            .then((jsonData) => {
                Toast.info('添加成功');
                history.replace("/")
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getCoin = (accountId, drawWkb) => {
        if (store.get('user_id') === undefined) {
            return;
        }

        let userId = store.get('user_id').name;

        let data = new Map();
        data.set('account_id', accountId);
        data.set('user_id', userId);
        data.set('draw_wkb', drawWkb);

        NetUtils.postWithUserAuth("cloudmonitor/api/v1/device/draw_ltk", data)
            .then((jsonData) => {
                Toast.info('提取成功');
                history.replace("/")
            })
            .catch((err) => {
                console.log(err);
            });
    };

    addAccountDialog = () => {
        prompt(
            '添加账号',
            '',
            (account, password) =>
                this.addAccount(account, password),
            'login-password',
            null,
            ['请输入账号', '请输入密码'],
        )
    };

    getCoinDialog = (accountId, drawWkb) => {
        alert('提取链克', '确定要提取链克到钱包吗?', [
            {text: '暂不提取', onPress: null},
            {text: '确认提取', onPress: this.getCoin.bind(this, accountId, drawWkb)},
        ])
    };

    deleteAccount = (accountId) => {
        if (store.get('user_id') === undefined) {
            return;
        }

        let userId = store.get('user_id').name;

        let data = new Map();
        data.set('account_id', accountId);
        data.set('user_id', userId);

        NetUtils.postWithUserAuth("cloudmonitor/api/v1/account/remove", data)
            .then((jsonData) => {
                Toast.info('删除成功');
                history.replace("/")
            })
            .catch((err) => {
                console.log(err);
            });
    };

    deleteAccountDialog = (accountId) => {
        alert('提示', '确定要删除账号吗?', [
            {text: '取消', onPress: null},
            {text: '确认', onPress: this.deleteAccount.bind(this, accountId)},
        ])
    };

    operationDialog = (accountId) => {
        alert('操作', <div/>, [
            {text: '删除设备', onPress: this.deleteAccountDialog.bind(this, accountId)},
            {text: '强制刷新', onPress: () => console.log('强制刷新被点击了')},
            {text: '取消', opPress: null},
        ])
    };

    componentDidMount() {
        if (store.get('user_id') === undefined) {
            return
        }
        let data = new Map();
        data.set('user_id', store.get('user_id').name);

        NetUtils.postWithUserAuth("cloudmonitor/api/v1/device/get_device_list", data)
            .then((jsonData) => {
                console.log(jsonData);
                if (jsonData.device_list === null || jsonData.device_list === undefined) {
                    this.setState({emptyData: true});
                    return;
                }
                this.setState({
                    dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(jsonData.device_list),
                });
                this.setState({
                    totalIncome: jsonData.total_income,
                    onlineNum: jsonData.online_num,
                    offlineNum: jsonData.offline_num,
                    aveIncome: (parseFloat(jsonData.total_income) / jsonData.online_num).toFixed(3),
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    statusBtn = (dataRow) => {
        if (dataRow.status === 'online') {
            return <Text type="ghost" style={{
                marginRight: '10px',
                borderRadius: '6px',
                padding: '2px',
                color: '#ffffff',
                backgroundColor: '#008CFF',
                fontSize: '10px'
            }}>{dataRow.status}</Text>
        }
        return <Text type="ghost" style={{
            marginRight: '10px',
            borderRadius: '6px',
            padding: '2px',
            color: '#ffffff',
            backgroundColor: '#999999',
            fontSize: '10px'
        }}>{dataRow.status}</Text>
    };

    renderList() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );

        const itemHead = (dataRow) => (
            <div style={{display: 'flex', flexDirection: 'row', flex: 1}}>
                <div style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'column'}}>
                    <div style={{fontSize: '13px', color: '#333'}}>{dataRow.username}</div>
                </div>
                <div style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                    <div style={{fontSize: '11px', color: '#666'}}>{
                        '昨收: ' +
                        parseFloat(dataRow.last_day_income).toFixed(2) +
                        ' | 可提: ' +
                        parseFloat(dataRow.extract_coin).toFixed(2)
                    }</div>
                </div>
                <div style={{flex: 0, justifyContent: 'flex-end'}}>
                    {this.statusBtn(dataRow)}
                </div>
            </div>
        );
        const itemInfo = (dataRow) => (
            <div>
                <div style={{backgroundColor: '#e5e5e5', height: 0.5}}/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: 10,
                    marginLeft: 16,
                    marginRight: 16
                }}>
                    <div style={{fontSize: '12px'}}> {'设备：'}</div>
                    <div style={{color: '#999', fontSize: '12px'}}> {dataRow.device_name}</div>
                    <div style={{marginLeft: 16, fontSize: '12px'}}>{'SN：'}</div>
                    <div style={{color: '#999', fontSize: '12px'}}> {dataRow.device_sn}</div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: 6,
                    marginLeft: 16,
                    marginRight: 16
                }}>
                    <div style={{fontSize: '12px'}}> {'可提：'}</div>
                    <div style={{color: '#999', fontSize: '12px', textAlign: 'center'}}> {dataRow.extract_coin}</div>
                    <div style={{marginLeft: 16, fontSize: '12px'}}> {'版本：'}</div>
                    <div style={{color: '#999', fontSize: '12px'}}>{dataRow.system_version}</div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: 6,
                    marginLeft: 16,
                    marginRight: 16
                }}>
                    <div style={{fontSize: '12px'}}> {'昨收：'}</div>
                    <div style={{
                        color: '#999',
                        fontSize: '12px',
                        textAlign: 'center'
                    }}> {dataRow.last_day_income}</div>
                    <div style={{marginLeft: 16, fontSize: '12px'}}> {'总收：'}</div>
                    <div style={{color: '#999', fontSize: '12px'}}>{dataRow.totalIncome}</div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: 6,
                    marginLeft: 16,
                    marginRight: 16
                }}>
                    <div style={{fontSize: '12px'}}> {'IP地址：'}</div>
                    <div style={{color: '#999', fontSize: '12px', textAlign: 'center'}}> {dataRow.ip}</div>
                    <div style={{marginLeft: 16, fontSize: '12px'}}> {'内网IP：'}</div>
                    <div style={{color: '#999', fontSize: '12px'}}>{dataRow.lan_ip}</div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: 6,
                    marginLeft: 16,
                    marginRight: 16
                }}>
                    <div style={{fontSize: '12px'}}> {'磁盘总容量：'}</div>
                    <div style={{color: '#999', fontSize: '12px', textAlign: 'center'}}> {dataRow.usb_capacity}</div>
                    <div style={{marginLeft: 16, fontSize: '12px'}}> {'磁盘已使用：'}</div>
                    <div style={{color: '#999', fontSize: '12px'}}>{dataRow.usb_used}</div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: 12,
                    marginLeft: 16,
                    marginRight: 16
                }}>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <div style={{fontSize: '10px', color: '#999'}}> {'更新时间：'}</div>
                        <div style={{color: '#999', fontSize: '10px', textAlign: 'center'}}> {dataRow.update_time}</div>
                    </div>
                    <div onClick={this.getCoinDialog.bind(this, dataRow.account_id, dataRow.extract_coin)}
                         style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <img src={payImg} style={{height: 14, width: 14, marginLeft: 12}} alt="get_coin"/>
                        <div style={{marginLeft: 3, fontSize: '14px'}}> {'提币'}</div>
                    </div>
                    <div onClick={this.operationDialog.bind(this, dataRow.account_id)}
                         style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <img src={settingImg} style={{height: 14, width: 14, marginLeft: 12}} alt="operation"/>
                        <div style={{marginLeft: 3, fontSize: '14px'}}> {'操作'}</div>
                    </div>
                </div>
                <div style={{height: 10}}/>
            </div>
        );
        const row = (dataRow) => {
            return (
                <div className="placeholder">
                    <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header={itemHead(dataRow)} className="item">
                            {itemInfo(dataRow)}
                        </Accordion.Panel>
                    </Accordion>
                </div>
            )
        };
        if (!this.state.dataSource) {
            if (this.state.emptyData) {
                return (
                    <View className="loading-view">
                        <Text className="account-loading-text">暂无账号</Text>
                        <Text className="account-empty-text">点击右上角添加</Text>
                    </View>
                )
            } else {
                return (
                    <View className="loading-view">
                        <ActivityIndicator className="account-loading-text" text="正在加载" />
                        {/*<Text className="account-loading-text">加载中...</Text>*/}
                    </View>
                )
            }
        } else {
            return (
                <View className="accountInfo">
                    <div className="total-info">
                        <div>{'昨收: '}</div>
                        <div style={{color: '#008CFF', marginLeft: 2}}>{this.state.totalIncome}</div>
                        <div>{', 平均: '}</div>
                        <div style={{color: '#008CFF', marginLeft: 2}}>{this.state.aveIncome}</div>
                        <div>{', 在线: '}</div>
                        <div style={{color: '#008CFF', marginLeft: 2}}>{this.state.onlineNum}</div>
                        <div>{', 离线: '}</div>
                        <div style={{color: '#008CFF', marginLeft: 2}}>{this.state.offlineNum}</div>
                    </div>

                    <ListView
                        style={{
                            height: document.documentElement.clientHeight - 140,
                            overflow: 'auto',
                        }}
                        renderSeparator={separator}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{padding: 20, textAlign: 'center'}}>
                            {'--------- 我是有底线的 ---------'}
                        </div>)}
                        renderRow={row}
                        pageSize={10}
                        scrollRenderAheadDistance={500}
                        onEndReachedThreshold={10}/>
                </View>
            )
        }
    }

    render() {
        return (
            <View className="accountView">
                <View className="navBar">
                    <NavBar
                        mode="light"
                        leftContent=""
                        rightContent={
                            <Text type="ghost" className='addAccount' onClick={this.addAccountDialog} style={{
                                borderRadius: '6px',
                                padding: '5px',
                                color: '#ffffff',
                                backgroundColor: '#008CFF',
                                fontSize: '12px'
                            }}>添加账号</Text>
                        }
                    >账号</NavBar>
                </View>
                {this.renderList()}
            </View>
        )
    }
}

AccountInfoView = Form.create()(AccountInfoView);