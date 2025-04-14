import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Phone } from 'lucide-react';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface FormPhoneProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    required?: boolean;
    placeholder?: string;
    maxLength?: number;
    onFocus?: () => void;
}

const FormPhone = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    required,
    placeholder,
    maxLength,
    onFocus
}: FormPhoneProps<TFieldValues>) => {
    const handleFocus = () => {
        onFocus && onFocus();
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && (
                        <FormLabel
                            className={cn({
                                required: required
                            })}
                        >
                            {label}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div className={cn('relative')}>
                            <Input
                                className={cn('peer ps-9')}
                                type="text"
                                autoComplete="off"
                                value={field.value}
                                maxLength={maxLength}
                                onChange={field.onChange}
                                placeholder={placeholder}
                                onFocus={handleFocus}
                            />
                            <div
                                className={cn(
                                    'text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'
                                )}
                            >
                                <Phone size={16} aria-hidden="true" />
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormPhone;
