import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { Layout } from './common/components/Layout';

export const routes = {
  root: '/',
  notFound: '*',
  tasks: '/tasks',
};

const LoginPage = React.lazy(() => import('./pages/auth/sign-in-page'));
const NotFoundPage = React.lazy(() =>
  import('./pages/not-found/not-found-page')
);
const TasksPage = React.lazy(() => import('./pages/tasks/tasks-page'));

export function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route
          element={
            <Layout loggedOnly={false}>
              <LoginPage />
            </Layout>
          }
          index
        />
        <Route
          element={
            <Layout>
              <TasksPage />
            </Layout>
          }
          path={routes.tasks}
        />
        <Route
          element={
            <Layout loggedOnly={false}>
              <NotFoundPage />
            </Layout>
          }
          path={routes.notFound}
        />
      </ReactRoutes>
    </BrowserRouter>
  );
}
