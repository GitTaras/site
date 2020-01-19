import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './utils/PrivateRoute';
import 'react-toastify/dist/ReactToastify.min.css';

import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import LaunchContest from './pages/LaunchContest/LaunchContest';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateContest from './pages/CreateContest/CreateContest';
import CreateEntry from './pages/CreateEntry/CreateEntry';
import FullInfoCard from './pages/FullInfoCard/FullInfoCard';
import Payment from './pages/Payment/Payment';
import EditContest from './pages/EditContest/EditContest';
import EditAccount from './pages/EditAccount/EditAccount';
import Account from './pages/Account/Account';
import Home from './pages/Home/Home';
import DashboardHoc from './components/HOC/DashboardHoc/DashboardHoc';
import PrivateHoc from './components/HOC/PrivateHoc/PrivateHoc';
import ContestHoc from './components/HOC/ContestHoc/ContestHoc';
import NotFound from './pages/NotFound/NotFound';
import styles from './App.module.sass';


const App = () => (
  <BrowserRouter>
    <div className={styles.container}>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/contest/create/:type" component={PrivateHoc(CreateContest)} />
        <PrivateRoute path="/contest/payment/:uuidGroup" component={PrivateHoc(Payment)} />
        <PrivateRoute path="/contest/edit/:id" component={ContestHoc(EditContest)} />
        <PrivateRoute path="/contest/:id" component={ContestHoc(FullInfoCard)} />
        <PrivateRoute path="/contest" component={PrivateHoc(LaunchContest)} />
        <PrivateRoute path="/dashboard/account/edit" component={DashboardHoc(EditAccount)} />
        <PrivateRoute path="/dashboard/account" component={DashboardHoc(Account)} />
        <PrivateRoute path="/dashboard" component={DashboardHoc(Dashboard)} />
        <PrivateRoute path="/entry/create/:id" component={DashboardHoc(CreateEntry)} />

        <Route path="/not_found" component={NotFound}/>
        <Route path="/" component={Home} />
      </Switch>
      <ToastContainer />
    </div>
  </BrowserRouter>
);

export default App;
