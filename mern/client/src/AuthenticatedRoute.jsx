import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthenticatedRoute = ({children}) => {
  if (localStorage.getItem('token')) {
    return children;
  }
  return <Navigate to="/" replace />;
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.any, // Add the missing prop type validation
};

export default AuthenticatedRoute;