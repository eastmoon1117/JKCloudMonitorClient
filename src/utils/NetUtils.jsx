import * as React from 'react';
import store from "store";
import JsonUtils from '../utils/JsonUtils'
import {Toast} from "antd-mobile/lib/index";

let SUCCESS = 1; //成功
let FAILURE = 0; //失败
let HOST = "https://jkergo.com";
//let HOST = "http://192.168.31.73:5000";

export default class NetUtils extends React.Component {

    static postWithUserAuth(method, data) {
        return new Promise(function (resolve, reject) {
            NetUtils.fetchData("user_auth", method, data, resolve, reject)
        })
    }

    static postWithAppAuth(method, data) {
        return new Promise(function (resolve, reject) {
            NetUtils.fetchData("app_auth", method, data, resolve, reject)
        })
    }

    static fetchData(auth, method, data, resolve, reject) {
        let token = "";
        if (auth === "user_auth") {
            if (store.get('user_token') !== undefined) {
                token = store.get('user_token').name
            }
        } else if(auth === "app_auth") {
            if (store.get('app_token') !== undefined) {
                token = store.get('app_token').name
            }
        }

        let fetchOptions = {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": token
            },
            body: JsonUtils.mapToJson(data)
        };

        let url = HOST + '/' + method;

        NetUtils.timeoutFetch(fetch(url, fetchOptions))
            .then((response) => response.json())
            .then((jsonData) => {
                if (jsonData.code === SUCCESS) {
                    resolve(jsonData.data);
                } else if (jsonData.code === FAILURE) {
                    Toast.info(jsonData.message);
                    reject("返回数据错误")
                }
            })
            .catch((error) => {
                reject(error);
            });
    }

    /**
     * 对fetch的超时处理，超时时间为10s
     */
    static timeoutFetch(fetch_promise, timeout = 20000) {
        let timeout_fn = null;

        //这是一个可以被reject的promise
        let timeout_promise = new Promise(function (resolve, reject) {
            timeout_fn = function () {
                reject('服务器请求超时');
            };
        });

        //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        let abortable_promise = Promise.race([
            fetch_promise,
            timeout_promise
        ]);

        setTimeout(function () {
            timeout_fn();
        }, timeout);

        return abortable_promise;
    }
}
