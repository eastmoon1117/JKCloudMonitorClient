import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {List, InputItem, WhiteSpace, Button, NavBar, Icon, View} from 'antd-mobile';
import '../styles/register.less';
import {Toast} from "antd-mobile/lib/index";
import Form from "antd/es/form/Form";
import history from "../router/history";
import store from "store";
import NetUtils from "../utils/NetUtils";
import CheckParam from "../utils/CheckParam";

@inject('store')
@observer
export default class RegisterView extends Component {

    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
    }

    goBack = () => {
        console.log("back");
        history.goBack()
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
                if (value.repassword === undefined) {
                    Toast.info('请再输入密码');
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

                    if (value.password !== value.repassword) {
                        Toast.info('两次密码不一致');
                        return;
                    }

                    let data = new Map();
                    data.set('username', value.username);
                    data.set('password', value.password);

                    NetUtils.postWithAppAuth("cloudmonitor/api/v1/user/register", data)
                        .then((jsonData) => {
                            console.log(jsonData);
                            store.set('user_id', {name: jsonData.user_id});
                            store.set('user_name', {name: jsonData.username});
                            store.set('user_token', {name: jsonData.token});
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
            <View className='registerView'>
                <View className="navBar">
                    <NavBar
                        mode="dark"
                        rightContent={[]}
                        leftContent={
                            <Button type="ghost" onClick={this.goBack} style={{height: 40, width: 30, marginLeft: -15}}>
                                <Icon type="left" color='#FFFFFF'/>
                            </Button>
                        }
                        style={{backgroundColor: '#008CFF'}}
                    >极客Go监工</NavBar>
                </View>

                <List className="inputView">
                    <InputItem
                        {...getFieldProps('username')}
                        type="text"
                        placeholder="手机号/邮箱"
                    >用户名</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type="password"
                        placeholder="请输入密码"
                    >密码</InputItem>
                    <InputItem
                        {...getFieldProps('repassword')}
                        type="password"
                        placeholder="请输入确认密码"
                    >确认密码</InputItem>
                </List>
                <WhiteSpace/>
                <Button type="default" onClick={this.submit} className='btn'>注册</Button>
            </View>
        )
    }
}
RegisterView = Form.create()(RegisterView);