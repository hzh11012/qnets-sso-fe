import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};
