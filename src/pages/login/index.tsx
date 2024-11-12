import Language from '@/components/custom/language';
import ThemeSwitch from '@/components/custom/theme-switch';
import Wave from '@/components/custom/wave';
import { z } from 'zod';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import useTheme from '@/hooks/use-theme';
import { cn, isValidUrl } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useCountDown from '@/hooks/use-count-down';
import { doCode, doLogin } from '@/apis/auth';
import { useSearchParams } from 'react-router-dom';

const PHONE_REG = /^1[3456789]\d{9}$/;
const CODE_REG = /^[0-9]{6}$/;

const Login = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { start, count, isDisable } = useCountDown(60);
    const [searchParams] = useSearchParams();

    const getQueryParam = (paramKey: string) => {
        return searchParams.get(paramKey);
    };

    const darkMode =
        theme === 'dark' ||
        (theme === 'system' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);

    const loginForm = z.object({
        phone: z
            .string({
                required_error: t('login.phone.empty'),
                invalid_type_error: t('login.phone.type')
            })
            .regex(PHONE_REG, {
                message: t('login.phone.rule')
            }),
        code: z
            .string({
                required_error: t('login.code.empty'),
                invalid_type_error: t('login.code.type')
            })
            .regex(CODE_REG, {
                message: t('login.code.rule')
            })
    });

    const form = useForm<z.infer<typeof loginForm>>({
        resolver: zodResolver(loginForm),
        defaultValues: {
            phone: '',
            code: ''
        }
    });
    const phone = form.watch('phone');
    const code = form.watch('code');

    const handleLogin = async (values: z.infer<typeof loginForm>) => {
        try {
            await doLogin(values);
            const redirectUrl = getQueryParam('redirect');
            if (redirectUrl && isValidUrl(redirectUrl)) {
                window.location.href = redirectUrl;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCode = async () => {
        const isValid = await form.trigger('phone');
        if (isValid) {
            try {
                await doCode({
                    phone: phone
                });
                start();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div
            className={cn(
                'relative w-full h-full flex items-center justify-center'
            )}
        >
            <Wave darkMode={darkMode} />
            <div
                className={cn(
                    'z-20 w-auto min-w-[21.875rem] sm:min-w-96 transition-[min-width] m-auto'
                )}
            >
                <Card className="transition-[padding]">
                    <CardHeader>
                        <CardTitle
                            className={cn(
                                'text-2xl flex items-center justify-between w-full'
                            )}
                        >
                            <div
                                className={cn(
                                    'flex items-center text-theme-color'
                                )}
                            >
                                <img
                                    className={cn('block mr-4 w-14 h-14')}
                                    src="https://cdn.qnets.cn/logo.svg"
                                    alt="Qnets"
                                />
                                {t('login.title')}
                            </div>
                            <div className="flex flex-col">
                                <ThemeSwitch />
                                <Language />
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="sm:pt-0">
                        <CardTitle className={cn('text-theme-color text-lg')}>
                            {t('login.type.phone')}
                        </CardTitle>
                        <CardDescription
                            className={cn(
                                'flex flex-col text-theme-color opacity-65 text-sm pt-2'
                            )}
                        >
                            {t('login.type.phone.description')}
                        </CardDescription>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleLogin)}
                                className="space-y-6 pt-9"
                            >
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="phone"
                                                    autoComplete="off"
                                                    placeholder="+86"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div
                                                className={cn(
                                                    'flex w-full items-center'
                                                )}
                                            >
                                                <FormControl>
                                                    <Input
                                                        className={cn('flex-1')}
                                                        type="text"
                                                        autoComplete="off"
                                                        placeholder={t(
                                                            'login.code'
                                                        )}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <Button
                                                    className={cn(
                                                        'w-28 ml-4 font-normal'
                                                    )}
                                                    disabled={
                                                        !phone || isDisable
                                                    }
                                                    variant="outline"
                                                    type="button"
                                                    onClick={handleCode}
                                                >
                                                    {isDisable
                                                        ? t(
                                                              'login.code.button.resend'
                                                          ) + `(${count})`
                                                        : t(
                                                              'login.code.button.send'
                                                          )}
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    className={cn('w-full')}
                                    disabled={!phone && !code}
                                    variant="confirm"
                                    type="submit"
                                >
                                    {t('login.submit')}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
