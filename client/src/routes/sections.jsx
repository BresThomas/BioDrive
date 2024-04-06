import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardPage from '../pages/dashboard';
import SignUpPage from '../pages/signup';
import DashboardLayout from '../layouts/dashboard';
import TransactionsPage from '../pages/transactions';
import PompesPage from '../pages/pompes';
import StocksPage from '../pages/stocks';
import IncidentsPage from '../pages/incidents';
import ServicesAndLogistiquePage from '../pages/servicesAndLogistique';


export const IndexPage = lazy(() => import('../pages/app'));
export const GerantPage = lazy(() => import('../pages/gerant'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const AutrePage = lazy(() => import('../pages/autre'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const Page404 = lazy(() => import('../pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        // <DashboardLayout>
          // <Suspense>
            // <Outlet />
          // </Suspense>
        // </DashboardLayout>
        <DashboardPage />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'products', element: <ProductsPage /> },
      ],
    },
    {
      path: 'user',
      element: <UserPage /> 
    },
    {
      path: 'login',
      element: <LoginPage />,
    },    
    {
      path: 'signup',
      element: <SignUpPage />,
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
      path: 'stocks',
      element: <StocksPage />,
    },    
    {
      path: 'incidents',
      element: <IncidentsPage />,
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
      path: 'autre',
      element: <AutrePage />,
    },
    {
      path: 'gerant',
      element: <GerantPage />,
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
