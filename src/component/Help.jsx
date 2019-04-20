import React, {Component} from 'react';
import {Text, WhiteSpace, View, Button, Icon, NavBar} from 'antd-mobile';
import history from "../router/history";

export default class Help extends Component {

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
                    >帮助中心</NavBar>
                </View>

                <View className='helpView'>
                    <View className='help' style={{margin:10}}>
                        <WhiteSpace/>
                        <Text style={{margin:10}}>1. 行情页面：查看实时链克价格，每日挖矿情况</Text>
                        <WhiteSpace/>
                        <Text style={{margin:10}}>2. 账号页面：添加账号，查看每个账号下的玩客云情况</Text>
                        <WhiteSpace/>
                        <Text style={{margin:10}}>3. 链克页面：一键提币，查看近期和全部的挖矿情况</Text>
                        <WhiteSpace/>
                        <Text style={{margin:10}}>4. 我的页面：绑定邮箱提醒，打赏给我们</Text>
                        <WhiteSpace/>
                    </View>
                </View>
            </View>
        )
    }
}