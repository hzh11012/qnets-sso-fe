import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

const staticRoutes: RouteObject[] = [
    {
        path: '/login',
        lazy: async () => ({
            Component: (await import('@/pages/login/index')).default
        })
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />
    }
];

const router = createBrowserRouter(staticRoutes);

export default router;
