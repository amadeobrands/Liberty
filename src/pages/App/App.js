import React, { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { Switch, Route, Redirect } from 'react-router-dom'

import LoginPage from '../Login/LoginPage'
import DashboardPage from '../Dashboard/DashboardPage'
import portisLogin from '../Portis/portis'

import {
  useUserState,
  checkAuth,
  useUserDispatch
} from '../../context/UserContext'
import { LoginProvider } from '../Login/LoginContext'
import { func } from 'prop-types';

function App (props) {
  const { status: userStatus } = useUserState()
  const userDispatch = useUserDispatch()

  useEffect(() => {
    if (userStatus === 'INIT') {
      checkAuth(userDispatch)
    }
  })

  return (
    <HashRouter>
      <Switch>
        <PrivateRoute exact path='/' component={DashboardRoute} />
        <PublicRoute exact path='/login' component={LoginRoute} />
        <PublicRoute exact path='/test_portis' component={portisLogin} />
      </Switch>
    </HashRouter>
  )
}

function LoginRoute () {
  return (
    <LoginProvider>
      <LoginPage />
    </LoginProvider>
  )
}

function DashboardRoute () {
  return <DashboardPage />
}

function PortisRoute(){
  return <portisLogin/>
}

function PrivateRoute ({ component, ...rest }) {
  const { isAuthenticated } = useUserState()
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          React.createElement(component, props)
        ) : (
          //I changed, login to test_portis so i can test this. 
          <Redirect
            to={{ pathname: '/test_portis', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

function PublicRoute ({ component, ...rest }) {
  const { isAuthenticated } = useUserState()

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  )
}

export default App
