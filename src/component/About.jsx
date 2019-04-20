import React, {Component} from 'react';
import {Text, WhiteSpace, View, Button, Icon, NavBar} from 'antd-mobile';
import history from "../router/history";

export default class About extends Component {

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
                    >关于我们</NavBar>
                </View>

                <View className='aboutView'>
                    <View className='about' style={{margin:10}}>
                        <WhiteSpace/>
                        <Text style={{margin:10}}>我们是极客Go的开发者</Text>
                        <WhiteSpace/>
                        <Text style={{margin:10}}>我们相信拥有极客精神，并开发一些小产品，是可以给自己带来财富，也可以为这个社会带来一点点小进步！</Text>
                    </View>
                </View>
            </View>
        )
    }
}