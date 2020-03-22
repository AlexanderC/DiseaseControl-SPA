import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export function ProtectedRoute(props: RouteProps) {
  const [isLoggedIn, setLoggedIn] = React.useState(
    localStorage.getItem('currentUser') !== null
  );

  React.useEffect(function () {
    const onStorageChange = () => setLoggedIn(
      localStorage.getItem('currentUser') !== null
    )
    // this will monitor any storage changes
    // if `currentUser` is removed user will be looged out
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, [])

  return isLoggedIn
    ? <Route {...props} />
    : <Redirect to='/login' />
}