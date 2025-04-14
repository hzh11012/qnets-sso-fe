import { CircleX } from 'lucide-react';

import { cn } from '@/lib/utils';

const Error = ({ className }: any) => {
    return (
        <div
            className={cn(
                'fixed top-0 left-0 w-full h-full flex items-center justify-center z-50',
                className
            )}
        >
            <CircleX className={cn('h-4 w-4')} />
            <p className={cn('text-sm ml-2')}>出现错误</p>
        </div>
    );
};
Error.displayName = 'Error';

export default Error;
