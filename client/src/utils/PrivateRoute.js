import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (localStorage.getItem('jwtToken')
      ? (<Component {...props} />) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location },
        }}
        />
      ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any),
};

PrivateRoute.defaultProps = {
  location: null,
};

export default PrivateRoute;
