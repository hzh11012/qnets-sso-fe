import { useState } from 'react';
import { useRequest } from 'ahooks';
import { doCode, doLogin } from '@/apis/auth';
import useCountDown from '@/hooks/use-count-down';

const useLoginAuth = () => {
    const [open, setOpen] = useState(false);
    const { start, count, isDisable } = useCountDown(60);

    const { runAsync: sendCode, loading } = useRequest(doCode, {
        debounceWait: 300,
        manual: true,
        onSuccess: ({ code }) => {
            if (code === 200) {
                start();
            }
        }
    });

    const handleSendCode = async (email: string) => {
        !isDisable && (await sendCode({ email }));
        setOpen(true);
    };

    const handleLogin = async (email: string, code: string) => {
        try {
            await doLogin({ email, code });
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

export default useLoginAuth;
