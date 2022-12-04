/* eslint-disable react/prop-types */
import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';
import links from 'links';
import {
  CoreLayout,
  MainPage,
  SignIn,
  SignUp,
  UserProfile,
  Product,
  Products,
} from 'containers';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'fire';

export const routes = {
  public: {
    signIn: {
      path: links.signIn,
      component: SignIn,
    },
    register: {
      path: links.signUp,
      component: SignUp,
    },
    main: {
      path: links.main,
      component: MainPage,
    },
  },
  private: {
    profile: {
      path: links.profile,
      component: UserProfile,
    },
    goods: {
      path: links.goods,
      component: Products,
      children: {
        good: {
          path: '/:goodId',
          component: Product,
        },
      },
    },
    productAdditionForm: {
      path: links.productAdditionForm,
      component: Product,
    },
  },
};

const PrivateRoute = ({ component: Component }) => {
  const [user] = useAuthState(auth);

  if (user) {
    return <Component />;
  }

  return <Navigate to={ links.signIn } />;
};

const getPublicRoutes = routes => Object
  .values(routes)
  .map(({ path, component: Component }) => (
    Component &&
    <Route
      key={ path }
      path={ path }
      element={ <Component /> }
    />
  ));

const getPrivateRoutes = (routes, parentPath = '') => (
  Object
    .values(routes)
    .reduce((acc, { path, component, children }) => {
      if (component) {
        acc.push(
          <Route
            key={ parentPath ? `${parentPath}${path}` : path }
            path={ parentPath ? `${parentPath}${path}` : path }
            element={ <PrivateRoute component={ component } /> }
          />,
        );
      }

      if (children) {
        return acc.concat(getPrivateRoutes(children, `${parentPath}${path}`));
      }

      return acc;
    }, [])
);

const AppRoutes = () => (
  <BrowserRouter>
    <CoreLayout>
      <Routes>
        { getPublicRoutes(routes.public) }
        { getPrivateRoutes(routes.private) }
        <Route path="*" element={ <MainPage /> } />
      </Routes>
    </CoreLayout>
  </BrowserRouter>
);

export default AppRoutes;
