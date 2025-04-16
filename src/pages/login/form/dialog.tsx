import React, { useCallback, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from '@/components/ui/button';

interface CodeDialogProps {
    phone: string;
    open: boolean;
    countDown: {
        isDisable: boolean;
        count: number;
    };
    onOpenChange: (open: boolean) => void;
    onComplete: (
        phone: string,
        code: string,
        setCode: (code: string) => void
    ) => Promise<void>;
    onSend: (phone: string) => void;
}

const CodeDialog: React.FC<CodeDialogProps> = ({
    open,
    onOpenChange,
    phone,
    countDown,
    onComplete,
    onSend
}) => {
    const { count, isDisable } = countDown;
    const [code, setCode] = useState('');

    const handleComplete = useCallback(async () => {
        await onComplete(phone, code, setCode);
    }, [phone, code, onComplete]);

    const handleSendCode = useCallback(() => {
        onSend(phone);
    }, [phone, onSend]);

    const handleOpenChange = (open: boolean) => {
        onOpenChange(open);
        !open && setCode('');
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                className={cn('w-[21.375rem] sm:w-full')}
                closeClassName={cn('top-6.75')}
            >
                <DialogHeader>
                    <DialogTitle className={cn('text-[1.375rem]')}>
                        请输入验证码
                    </DialogTitle>
                    <DialogDescription>
                        短信验证码已发送至 +86 {phone}
                    </DialogDescription>
                </DialogHeader>
                <div className={cn('mx-auto my-7.5')}>
                    <InputOTP
                        value={code}
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        onComplete={handleComplete}
                        onChange={setCode}
                    >
                        <InputOTPGroup>
                            <div className={cn('flex w-full sm:gap-5')}>
                                {[0, 1, 2, 3, 4, 5].map(index => (
                                    <InputOTPSlot
                                        key={index}
                                        className={cn(
                                            'rounded-none sm:rounded-md'
                                        )}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <DialogFooter className={cn('sm:justify-center')}>
                    <Button
                        className={cn('max-w-[18.75rem] w-full bg-theme')}
                        onClick={handleSendCode}
                        disabled={isDisable}
                    >
                        {isDisable ? `${count} 秒后可重新发送` : '发送验证码'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { CodeDialog };
