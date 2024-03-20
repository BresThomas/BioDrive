import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardPage from '../pages/dashboard';
import DashboardLayout from '../layouts/dashboard';
import TransactionsPage from '../pages/transactions';
import PompesPage from '../pages/pompes';
import DashboardPage from '../pages/dashboard';
import ServicesAndLogistiquePage from '../pages/servicesAndLogistique';


export const IndexPage = lazy(() => import('../pages/app'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ServicesLogistique = lazy(() => import('../pages/services-logistique'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const Page404 = lazy(() => import('../pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },    
    {
      path: 'pompes',
      element: <PompesPage />,
    },     
    {
      path: 'transactions',
      element: <TransactionsPage />,
    }, 
    {
      path: 'servicesAndLogistique',
      element: <ServicesAndLogistiquePage />,
    },   
    {
      path: 'dashboard',
      element: <DashboardPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
