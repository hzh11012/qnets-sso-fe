import React from 'react';
import { Form } from '@/components/ui/form';
import { emailFormSchema } from '@/pages/login/form/schema';
import { UseFormReturn } from 'react-hook-form';
import FormInput from '@/components/custom/form/form-input';
import { Mail } from 'lucide-react';

interface EmailFormProps {
    form: UseFormReturn<Zod.infer<typeof emailFormSchema>>;
    onFocus?: () => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ form, onFocus }) => {
    return (
        <Form {...form}>
            <FormInput
                control={form.control}
                name="email"
                placeholder={'请输入邮箱'}
                maxLength={255}
                onFocus={onFocus}
                startIcon={<Mail size={16} aria-hidden="true" />}
            />
        </Form>
    );
};

export { EmailForm };
