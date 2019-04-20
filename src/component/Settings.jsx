import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {List, WhiteSpace, Button, NavBar} from 'antd-mobile';
import '../styles/settings.less';
import Form from "antd/es/form/Form";
import store from "store";
import {Modal, Toast} from "antd-mobile/lib/index";
import history from "../router/history";

import userIcon from '../image/icon_user_default.png'
import CheckParam from "../utils/CheckParam";
import NetUtils from "../utils/NetUtils";

const alert = Modal.alert;
const prompt = Modal.prompt;

@inject('store')
@observer
export default class SettingsView extends Component {

    constructor(props) {
        super(props);
        let username = "";
        let bind_email = '';
        if (!(store.get('user_name') === undefined)) {
            username = store.get('user_name').name
        }
        if (!(store.get('bind_email') === undefined)) {
            bind_email = store.get('bind_email').name
        }

        this.state = {
            username: username,
            bind_email: bind_email
        }
    }

    bindEmailDialog = () => {
        prompt(
            '绑定邮箱',
            '',
            (email) =>
                this.bindEmail(email),
            'default',
            this.state.bind_email,
            ['请输入邮箱'],
        )
    };

    bindEmail = (email) => {
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (!reg.test(email)) {
            Toast.info('请输入正确的邮箱号');
            return;
        }

        let data = new Map();
        data.set('bind_email', email);

        NetUtils.postWithUserAuth("cloudmonitor/api/v1/user/bind_email", data)
            .then((jsonData) => {
                store.set('bind_email', {name: email});
                this.setState({bind_email: email});
                Toast.info('绑定成功');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    logOutDialog = () => {
        alert('提示', '确定要退出吗?', [
            {text: '取消', onPress: null},
            {text: '确认', onPress: this.logOutDispose},
        ])
    };

    logOutDispose = () => {
        store.set('user_id', undefined);
        store.set('user_token', undefined);
        store.set('bind_email', undefined);
        history.push('/')
    };

    aboutUs = () => {
        history.push('/about')
    };

    help = () => {
        history.push('/help')
    };

    tipping = () => {
        history.push('/tipping')
    };

    render() {
        return (
            <div className='settingsView'>
                <NavBar
                    mode="light"
                    leftContent=""
                    rightContent={[]}
                >个人中心</NavBar>

                <div>
                    <WhiteSpace/>

                    <List.Item>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <img src={userIcon} style={{height: 60, width: 60, justifyContent: 'center'}}
                                 alt="user_icon"/>
                            <div style={{marginLeft: 16, alignSelf: 'center'}}>账号：{this.state.username}</div>
                        </div>
                    </List.Item>
                    <WhiteSpace/>

                    <List.Item
                        extra=""
                        arrow="horizontal"
                        onClick={this.bindEmailDialog}
                    >
                        <div style={{marginTop: 2}}>绑定邮箱</div>
                        <List.Item.Brief style={{fontSize: 10, marginBottom: 10}}>
                            {'已绑至: ' + this.state.bind_email}
                        </List.Item.Brief>
                    </List.Item>
                    <WhiteSpace/>

                    <List.Item
                        extra=""
                        arrow="horizontal"
                        onClick={this.help}
                    >
                        <div style={{marginTop: 2}}>帮助中心</div>
                        <List.Item.Brief style={{fontSize: 10, marginBottom: 10}}>
                            更多帮助看这里
                        </List.Item.Brief>
                    </List.Item>
                    <WhiteSpace/>
                    <List.Item
                        extra=""
                        arrow="horizontal"
                        onClick={this.tipping}
                    >
                        <div style={{marginTop: 2}}>打赏我们</div>
                        <List.Item.Brief style={{fontSize: 10, marginBottom: 10}}>
                            有了你们的支持，才有动力更好地服务
                        </List.Item.Brief>
                    </List.Item>
                    <WhiteSpace/>

                    <List.Item
                        extra=""
                        arrow="horizontal"
                        onClick={this.aboutUs}
                    >
                        <div style={{marginTop: 2}}>关于我们</div>
                        <List.Item.Brief style={{fontSize: 10, marginBottom: 10}}>
                            极客Go的默默贡献者
                        </List.Item.Brief>
                    </List.Item>
                    <WhiteSpace/>
                    <Button type="ghost" onClick={this.logOutDialog} className='logout'>退出登录</Button>

                    <div style={{height: 20}}/>

                </div>
            </div>
        )
    }
}

SettingsView = Form.create()(SettingsView);