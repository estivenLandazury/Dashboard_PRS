import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Components/login'
import Admin from './Components/Admin'
import Home from './Components/Home'
import Chart from './Components/Charts'

import Register from './Components/register'
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from "react-redux"
import Store from "./Components/Redux/store"



ReactDOM.render(
    <Provider store={Store}>

        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/homes" component={App} />
                <Route exact path="/home" component={App} />
                <Route exact path="/charts" component={App} />
                <Route exact path="/Report" component={App} />




                <Route exact path="/login" component={Login} />
                <Route exact path="/Register" component={Register} />



            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
