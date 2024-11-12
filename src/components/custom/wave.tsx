import { cn } from '@/lib/utils';

const Wave = ({ darkMode }: { darkMode: boolean }) => {
    const lightColor = darkMode ? '#d1d6ff' : '#dee3ff';
    const darkColor = darkMode ? '#4a4cd9' : '#646cff';

    return (
        <div
            className={cn(
                'fixed z-10 left-0 right-0 size-full overflow-hidden'
            )}
        >
            <div
                className={cn(
                    'absolute -right-24 -top-[72rem] sm:-right-[18rem] sm:-top-[56rem] transition-[right] transition-[top]'
                )}
            >
                <svg height="1337" width="1337">
                    <defs>
                        <path
                            id="path-1"
                            opacity="1"
                            fillRule="evenodd"
                            d="M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
                        />
                        <linearGradient
                            id="linearGradient-2"
                            x1="0.79"
                            y1="0.62"
                            x2="0.21"
                            y2="0.86"
                        >
                            <stop
                                offset="0"
                                stopColor={lightColor}
                                stopOpacity="1"
                            />
                            <stop
                                offset="1"
                                stopColor={darkColor}
                                stopOpacity="1"
                            />
                        </linearGradient>
                    </defs>
                    <g opacity="1">
                        <use
                            xlinkHref="#path-1"
                            fill="url(#linearGradient-2)"
                            fillOpacity="1"
                        />
                    </g>
                </svg>
            </div>
            <div
                className={cn(
                    'absolute -bottom-[48rem] -left-24 sm:-bottom-96 sm:-left-52 transition-[left] transition-[bottom]'
                )}
            >
                {' '}
                <svg height="896" width="967.8852157128662">
                    <defs>
                        <path
                            id="path-2"
                            opacity="1"
                            fillRule="evenodd"
                            d="M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896 C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806 200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
                        />
                        <linearGradient
                            id="linearGradient-3"
                            x1="0.5"
                            y1="0"
                            x2="0.5"
                            y2="1"
                        >
                            <stop
                                offset="0"
                                stopColor={lightColor}
                                stopOpacity="1"
                            />
                            <stop
                                offset="1"
                                stopColor={darkColor}
                                stopOpacity="1"
                            />
                        </linearGradient>
                    </defs>
                    <g opacity="1">
                        <use
                            xlinkHref="#path-2"
                            fill="url(#linearGradient-3)"
                            fillOpacity="1"
                        />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default Wave;
