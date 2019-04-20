import React, {Component} from 'react';
import {Text, WhiteSpace, View, Button, Icon, NavBar} from 'antd-mobile';
import history from "../router/history";


import account_qr from '../image/ltk_walle.jpg'
import zhifubao from '../image/zhifubao.jpg'

export default class Tipping extends Component {

    goBack = () => {
        console.log("back");
        history.goBack()
    };

    render() {
        return (
            <View>
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
                    >打赏我们</NavBar>
                </View>

                <View className='aboutView'>
                    <View className='about' style={{margin:10}}>
                        <WhiteSpace/>
                        <img src={account_qr} style={{height: 200, width: 200, justifyContent: 'center'}} alt="operation"/>

                        <WhiteSpace/>

                        <Text style={{margin:10, alignSelf: 'center'}}>0xe1d790842ec85c6f36dabbaf0a80e78637b2c14e</Text>
                        <WhiteSpace/>

                        <Text style={{margin:10, alignSelf: 'center'}}>通过链克钱包转账打赏给我们哦！</Text>
                        <WhiteSpace/>

                        <img src={zhifubao} style={{height: 250, width: 200, justifyContent: 'center'}} alt="operation"/>
                        <WhiteSpace/>

                        <Text style={{margin:10, alignSelf: 'center'}}>也可以通过支付宝打赏给我们哦！</Text>
                        <WhiteSpace/>
                    </View>
                </View>
            </View>
        )
    }
}