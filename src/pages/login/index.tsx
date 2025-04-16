import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Layout } from '@/components/layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { PhoneForm } from '@/pages/login/form';
import ThemeSwitch from '@/components/custom/theme-switch';
import { phoneFormSchema } from '@/pages/login/form/schema';
import { Button } from '@/components/ui/button';
import { CodeDialog } from '@/pages/login/form/dialog';
import Loading from '@/components/custom/loading';
import { useSearchParams } from 'react-router-dom';
import usePhoneAuth from '@/hooks/use-phone-auth';

const DEFAULT_REDIRECT_URL = import.meta.env.VITE_DEFAULT_REDIRECT_URL;

const Login: React.FC = () => {
    const [searchParams] = useSearchParams();
    const {
        dialogOpen,
        setDialogOpen,
        countDown,
        loading,
        onSendCode,
        onLogin
    } = usePhoneAuth();

    const phoneForm = useForm<Zod.infer<typeof phoneFormSchema>>({
        resolver: zodResolver(phoneFormSchema),
        defaultValues: { phone: '' },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const phone = phoneForm.watch('phone');
    const redirectUrl = searchParams.get('redirect') || DEFAULT_REDIRECT_URL;

    const handleClick = async (values: Zod.infer<typeof phoneFormSchema>) => {
        await onSendCode(values.phone);
    };

    const handleComplete = async (
        phone: string,
        code: string,
        setCode: (code: string) => void
    ) => {
        const success = await onLogin(phone, code);
        if (success) {
            window.location.href = redirectUrl;
        } else {
            setCode('');
        }
    };

    return (
        <>
            <Layout
                className={cn('min-h-svh flex items-center justify-center')}
            >
                <Card
                    className={cn(
                        'relative shadow-none sm:border-1 border-0 w-[21.875rem] h-auto p-6 gap-0'
                    )}
                >
                    <CardHeader className={cn('gap-0 px-0 py-6 pt-0')}>
                        <CardTitle
                            className={cn(
                                'text-2xl flex items-center justify-between w-full mb-10.5'
                            )}
                        >
                            <div
                                className={cn(
                                    'flex items-center text-theme text-4xl'
                                )}
                            >
                                <img
                                    className={cn('block mr-4 size-14')}
                                    src="/logo.svg"
                                    alt="Qnets"
                                />
                                Qnets
                            </div>
                            <ThemeSwitch />
                        </CardTitle>
                        <CardTitle className={cn('text-[1.125rem] mx-2')}>
                            手机号登录/注册
                        </CardTitle>
                        <CardDescription
                            className={cn('text-[0.875rem] mx-2 mt-3 mb-4')}
                        >
                            未注册用户验证后将自动注册并登录
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={cn('px-0')}>
                        <PhoneForm
                            form={phoneForm}
                            onFocus={() => phoneForm.clearErrors()}
                        />
                    </CardContent>
                    <CardFooter className={cn('px-0 pt-6')}>
                        <Button
                            className={cn('w-full mt-4 bg-theme')}
                            type="submit"
                            disabled={!phone}
                            onClick={phoneForm.handleSubmit(handleClick)}
                        >
                            登录
                        </Button>
                    </CardFooter>
                </Card>
                <CodeDialog
                    phone={phone}
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    countDown={countDown}
                    onComplete={handleComplete}
                    onSend={onSendCode}
                />
            </Layout>
            {loading && <Loading />}
        </>
    );
};

export default Login;
