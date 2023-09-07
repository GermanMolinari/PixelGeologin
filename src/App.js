import React from 'react';
import './assetss/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
function App(){
    return(
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path = "/" exact render = {props => (<Login{... props} />)}></Route>
                    <Route path = "/dashboard" exact render = {props => (<Dashboard{... props} />)}></Route>
                </Switch>
            </Router>

        </React.Fragment>
    );
}

export default App;