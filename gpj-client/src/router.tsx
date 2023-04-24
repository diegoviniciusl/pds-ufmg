import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import usePagesContext from './context/page/context';
import { NotFoundPage } from './shared/components';
import Layout from './shared/components/layout/layout';

function Router() {
  const { pages } = usePagesContext();

  return (
    <BrowserRouter>
      <Routes>
        {pages.map((page) => (
          <Route
            path={page.path}
            key={page.path}
            element={<Layout>{page.component}</Layout>}
          />
        ))}

        <Route
          path="*"
          element={(<NotFoundPage />)}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
