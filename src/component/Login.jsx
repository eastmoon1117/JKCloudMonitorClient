import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {List, InputItem, WhiteSpace, Button, NavBar} from 'antd-mobile';
import '../styles/login.less';
import Form from "antd/es/form/Form";
import history from "../router/history";
import {Modal, Toast} from "antd-mobile/lib/index";
import store from "store";
import NetUtils from "../utils/NetUtils";
import CheckParam from "../utils/CheckParam";

const alert = Modal.alert;

@inject('store')
@observer
export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        let username = "";
        if (!(store.get('user_name') === undefined)) {
            username = store.get('user_name').name
        }
        this.state = {
            username: username,
        }
    }

    goRegister = () => {
        history.push('/register')
    };

    findPwdDialog = () => {
        alert('提示', '请关注公众号 "JkerGo"， 并发送注册时的账号. 例如(找回密码:15088888888)', [
            {text: '我知道了', onPress: null},
        ])
    };

    submit = () => {
        this.props.form.validateFields((error, value) => {
                if (error !== undefined) {
                    console.error(error);
                }
                if (value.username === undefined) {
                    Toast.info('请输入手机号/邮箱');
                    return;
                }
                if (value.password === undefined) {
                    Toast.info('请输入密码');
                    return;
                }
                if (value !== undefined) {
                    if (CheckParam.checkPhoneEmail(value.username) === false) {
                        Toast.info('请输入正确的手机号/邮箱');
                        return;
                    }
                    if (value.password.length < 8) {
                        Toast.info('密码不能小于8位数');
                        return;
                    }

                    let data = new Map();
                    data.set('username', value.username);
                    data.set('password', value.password);

                    NetUtils.postWithAppAuth("cloudmonitor/api/v1/user/login", data)
                        .then((jsonData) => {
                            console.log(jsonData);
                            store.set('user_id', {name: jsonData.user_id});
                            store.set('user_name', {name: jsonData.username});
                            store.set('user_token', {name: jsonData.token});
                            store.set('bind_email', {name: jsonData.bind_email});
                            Toast.info('登录成功');
                            history.push('/home')
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        );
    };

    render() {
        // const {store} = this.props;
        const {getFieldProps} = this.props.form;

        return (
            <div className='loginView'>
                <NavBar
                    mode="dark"
                    leftContent=""
                    rightContent={[]}
                    style={{backgroundColor: '#008CFF'}}
                >极客Go监工</NavBar>

                <List className="inputView">
                    <InputItem
                        {...getFieldProps('username',{
                            initialValue: this.state.username}
                        )}
                        type="text"
                        placeholder="手机号/邮箱"
                        clear
                    >用户名</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type="password"
                        placeholder="请输入密码"
                        clear
                    >密码</InputItem>
                </List>

                <WhiteSpace/>

                <Button type="default" onClick={this.submit} className='btn'>登录</Button>

                <WhiteSpace/>

                <div className='others'>
                    <Button type="ghost" className='register' onClick={this.goRegister.bind(this)}>注册</Button>
                    <Button type="ghost" className='findPwd' onClick={this.findPwdDialog}>找回密码</Button>
                </div>
            </div>
        )
    }
}

LoginView = Form.create()(LoginView);