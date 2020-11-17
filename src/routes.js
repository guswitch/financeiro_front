import React from 'react';
import {BrowserRouter,Switch,Redirect,Route} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPass from './pages/ForgetPassword';
// import Profile from './pages/Profile';
import { isAuthenticated } from './services/auth';
import Home from './pages/Home';

const PrivateRoute = ({component: Component, ...rest}) => (
    // Verificando se o usúario está autenticado
    <Route 
    {...rest}
        render={props => 
            isAuthenticated() ? (
            <Component {...props}/>
            ) : (
            <Redirect to={{ pathname: "/auth", state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/auth' component={Login}/>
            <Route path='/signup' component={Register}/>
            <Route path='/forgetpassword' component={ForgetPass}/>
            <PrivateRoute path='/home' component={Home}/>
            {/* <PrivateRoute path='/profile' component={(Profile)}/> */}
        </Switch>
    </BrowserRouter>
)

export default Routes;