import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18next from '@/locale';
import { ThemeProvider } from '@/components/custom/theme-provider';
import { Loading } from '@/components/custom/loading';
import { Toaster } from '@/components/ui/toaster';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import '@/style/index.css';
import '@/style/global.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <I18nextProvider i18n={i18next} defaultNS={'translation'}>
            <ThemeProvider defaultTheme="system" storageKey="qnets-ui-theme">
                <RouterProvider router={router} fallbackElement={<Loading />} />
                <Toaster />
            </ThemeProvider>
        </I18nextProvider>
    </StrictMode>
);
