import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

const staticRoutes: RouteObject[] = [
    {
        path: '/',
        lazy: async () => ({
            Component: (await import('@/pages/login/index')).default
        })
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    }
];

const router = createBrowserRouter(staticRoutes);

export default router;
