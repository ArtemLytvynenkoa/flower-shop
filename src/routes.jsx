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
  Test,
  MainPage,
  SignIn,
} from 'containers';

export const routes = {
  public: {
    signIn: {
      path: links.signIn,
      component: SignIn,
    },
    // register: {
    //   path: links.register,
    //   component: Registration,
    // },
    main: {
      path: '/main',
      component: MainPage,
    },
    test: {
      path: '/test',
      component: Test,
    },
  },
  // private: {},
};

// const PrivateRoute = ({ component: Component }) => {
//   const [user] = useAuthState(auth);

//   if (user) {
//     return <Component />;
//   }

//   return <Navigate to={ links.signIn } />;
// };

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

// const getPrivateRoutes = (routes, parentPath = '') => (
//   Object
//     .values(routes)
//     .reduce>((acc, { path, component, children }) => {
//       if (component) {
//         acc.push(
//           <Route
//             key={ parentPath ? `${parentPath}${path}` : path }
//             path={ parentPath ? `${parentPath}${path}` : path }
//             element={ <PrivateRoute component={ component } /> }
//           />,
//         );
//       }

//       if (children) {
//         return acc.concat(getPrivateRoutes(children, `${parentPath}${path}`));
//       }

//       return acc;
//     }, [])
// );

const AppRoutes = () => (
  <BrowserRouter>
    <CoreLayout>
      <Routes>
        { getPublicRoutes(routes.public) }
        { /* { getPrivateRoutes(routes.private) } */ }
        <Route path="*" element={ <Test /> } />
      </Routes>
    </CoreLayout>
  </BrowserRouter>
);

export default AppRoutes;