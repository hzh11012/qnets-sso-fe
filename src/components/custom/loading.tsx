import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

const Loading = ({ className }: any) => {
    return (
        <div
            className={cn(
                'fixed top-0 left-0 w-full h-full flex items-center justify-center z-50',
                className
            )}
        >
            <LoaderCircle className={cn('h-4 w-4 animate-spin')} />
            <p className={cn('text-sm ml-2')}>加载中</p>
        </div>
    );
};
Loading.displayName = 'Loading';

export default Loading;
