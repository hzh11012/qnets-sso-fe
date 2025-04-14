import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Login from '@/pages/login';
import Loading from '@/components/custom/loading';
import Error from '@/components/custom/error';

const staticRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Login />,
        hydrateFallbackElement: <Loading />,
        errorElement: <Error />
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    }
];

const router = createBrowserRouter(staticRoutes);

export default router;
