import React from 'react';
import { Form } from '@/components/ui/form';
import { phoneFormSchema } from '@/pages/login/form/schema';
import { UseFormReturn } from 'react-hook-form';
import FormPhone from '@/components/custom/form/form-phone';

interface PhoneFormProps {
    form: UseFormReturn<Zod.infer<typeof phoneFormSchema>>;
    onFocus?: () => void;
}

const PhoneForm: React.FC<PhoneFormProps> = ({ form, onFocus }) => {
    return (
        <Form {...form}>
            <FormPhone
                control={form.control}
                name="phone"
                placeholder={'+86'}
                maxLength={11}
                onFocus={onFocus}
            />
        </Form>
    );
};

export { PhoneForm };
