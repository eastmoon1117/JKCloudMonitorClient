import * as React from 'react';

export default class CheckParam extends React.Component {

    static checkPhoneEmail = (str) => {
        let re = /^1\d{10}/;
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (re.test(str)) {
            return true;
        } else {
            return reg.test(str)
        }
    };
}
