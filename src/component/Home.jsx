import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import '../styles/home.less';
import Form from "antd/es/form/Form";
import {TabBar} from 'antd-mobile';
import AccountInfoView from "./AccountInfoView";
import LTKInfoView from "./LTKInfo";
import LTKMarketView from "./LTKMarket";
import SettingsView from "./Settings";

@inject('store')
@observer
export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'blueTab',
            hidden: false,
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div style={{position: 'fixed', height: '100%', width: '100%', top: 0}}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}>
                    <TabBar.Item
                        icon={{uri: 'http://lc-c5b7sta0.cn-n1.lcfile.com/43a8f202e250f8d9ce6d.png'}}
                        selectedIcon={{uri: 'http://lc-c5b7sta0.cn-n1.lcfile.com/80042c95b350ec4b1ff1.png'}}

                        title="行情"
                        key="行情"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}>
                        <LTKMarketView/>
                    </TabBar.Item>
                    <TabBar.Item
                        title="账号"
                        key="账号"
                        icon={{uri: 'http://lc-c5b7sta0.cn-n1.lcfile.com/497c7652eb9564a88263.png'}}
                        selectedIcon={{uri: 'http://lc-c5b7sta0.cn-n1.lcfile.com/fd114680431249c85797.png'}}
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}>
                        <AccountInfoView/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{uri: 'http://lc-c5b7sta0.cn-n1.lcfile.com/c37d1633f67f81912540.png'}}
                        selectedIcon={{uri: 'http://lc-c5b7sta0.cn-n1.lcfile.com/97d7c007de4ccf96a0b2.png'}}
                        title="链克"
                        key="链克"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}>
                        <LTKInfoView/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{uri: 'http://lc-c5b7sta0.cn-n1.lcfile.com/8afbee9ee7dd6e96d7ad.png'}}
                        selectedIcon={{uri: 'http://lc-c5b7sta0.cn-n1.lcfile.com/df9edaeda52ca3b94c79.png'}}
                        title="我的"
                        key="我的"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}>
                        <SettingsView/>
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

HomeView = Form.create()(HomeView);