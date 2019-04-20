import React, {Component} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import routers from '../router/router';
import NotFound from './NotFound';
import {Provider} from 'mobx-react'
import history from '../router/history';
import DevTools from 'mobx-react-devtools'
import SplashView from "./SplashView";

class App extends Component {
    render() {
        return (
            <Provider {...this.props}>
                <Router history={history}>
                    <div>
                        <SplashView/>
                        <Switch>
                            {routers.map((route, i) => {
                                return <Route key={i} exact path={route.path} component={route.component}/>
                            })}
                            <Route component={NotFound}/>
                        </Switch>
                        {/*<DevTools/>*/}
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;
