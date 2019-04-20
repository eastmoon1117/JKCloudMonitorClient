import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import Form from "antd/es/form/Form";
import store from "store";
import history from "../router/history";

@inject('store')
@observer
export default class SplashView extends Component {

    componentDidMount() {
        this.props.store.fetchToken();
        if (store.get('user_id') === undefined) {
            history.push('/login')
            //history.push('/home')
        } else {
            history.push('/home')
        }
    }

    render() {
        return (
            <div style={{position: 'fixed', height: '100%', width: '100%', top: 0}}>
            </div>
        );
    }
}

SplashView = Form.create()(SplashView);