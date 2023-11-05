import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/notFound';
import Login from '../pages/login';
import Admin from '../panels/admin/index';
import Director from '../panels/director';
import Manager from '../panels/manager';

function RouterComponent() {
  const data = JSON.parse(window.localStorage.getItem('AuthDataUser'));
  const role = {
    isAdmin: data?.role == 'Admin',
    isManager: data?.role == 'manager',
    isDirector: data?.role == 'director',
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Login />}
      />
      <Route
        exact
        path="/admin/*"
        element={role.isAdmin ? <Admin /> : <NotFound />}
      />
      <Route
        exact
        path="/manager/*"
        element={role.isManager ? <Manager /> : <NotFound />}
      />
      <Route
        exact
        path="/director/*"
        element={role.isDirector ? <Director /> : <NotFound />}
      />
      <Route
        exact
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default RouterComponent;
