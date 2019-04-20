import {observable, action} from 'mobx';
import {Toast} from 'antd-mobile';
import store from 'store'
import NetUtils from "../utils/NetUtils";

class AppStore {

    @observable total = 0; //数据量

    @action fetchToken() {
        let data = new Map();
        data.set('app_key', '39d3cb299ae484335h28e176f023adse5');
        data.set('app_secret', 'q36f1c65cech5e4d8054e9p8d8f75bfe1d');

        NetUtils.postWithUserAuth("cloudmonitor/api/v1/auth/app_auth", data)
            .then((jsonData) => {
                store.set('app_token', {name: jsonData.token})
            })
            .catch((err) => {
                console.log(err);
            });
    }

    @action apiLogin(username, password) {

        let data = new Map();
        data.set('username', username);
        data.set('password', password);

        NetUtils.postWithUserAuth("cloudmonitor/api/v1/user/login", data)
            .then((jsonData) => {
                console.log(jsonData);
                store.set('user_id', {name: jsonData.user_id});
                store.set('user_name', {name: jsonData.user_name});
                store.set('user_token', {name: jsonData.token});
                Toast.info('登录成功');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    @action fetchRegister() {


    }
}

export default AppStore;
