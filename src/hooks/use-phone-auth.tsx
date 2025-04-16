import { useState } from 'react';
import { useRequest } from 'ahooks';
import { doCode, doLogin } from '@/apis/auth';
import useCountDown from '@/hooks/use-count-down';

const usePhoneAuth = () => {
    const [open, setOpen] = useState(false);
    const { start, count, isDisable } = useCountDown(60);

    const { runAsync: sendCode, loading } = useRequest(doCode, {
        debounceWait: 300,
        manual: true,
        onSuccess: () => {
            start();
        }
    });

    const handleSendCode = async (phone: string) => {
        await sendCode({ phone });
        setOpen(true);
    };

    const handleLogin = async (phone: string, code: string) => {
        try {
            await doLogin({ phone, code });
            return true;
        } catch (error) {
            return false;
        }
    };

    return {
        dialogOpen: open,
        setDialogOpen: setOpen,
        countDown: { count, isDisable },
        loading,
        onSendCode: handleSendCode,
        onLogin: handleLogin
    };
};

export default usePhoneAuth;
