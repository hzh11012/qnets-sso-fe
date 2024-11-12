import useTheme from '@/hooks/use-theme';
import { Moon, Sun, Tv2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const themeOptions: Record<string, 'system' | 'light' | 'dark'> = {
    dark: 'system',
    system: 'light',
    light: 'dark'
};

const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Tv2;
    const darkMode =
        theme === 'dark' ||
        (theme === 'system' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);

    const handleClick = (e: any) => {
        const isAppearanceTransition = !window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (!isAppearanceTransition) {
            setTheme(themeOptions[theme]);
            return;
        }

        const transition = document.startViewTransition(async () => {
            setTheme(themeOptions[theme]);
        });

        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ];
            document.documentElement.animate(
                {
                    clipPath: darkMode ? [...clipPath].reverse() : clipPath
                },
                {
                    duration: 400,
                    easing: 'ease-out',
                    pseudoElement: darkMode
                        ? '::view-transition-old(root)'
                        : '::view-transition-new(root)'
                }
            );
        });
    };

    return (
        <Button
            size="icon"
            variant="ghost"
            className={cn('rounded-full w-9 h-9')}
            onClick={handleClick}
        >
            <Icon size={20} />
        </Button>
    );
};

export default ThemeSwitch;
