import Zod from 'zod';

const PHONE_REG = /^1[3456789]\d{9}$/;

const phoneFormSchema = Zod.object({
    phone: Zod.string({
        required_error: '手机号不能为空',
        invalid_type_error: '手机号无效'
    })
        .min(1, {
            message: '手机号不能为空'
        })
        .regex(PHONE_REG, {
            message: '手机号无效'
        })
});

export { phoneFormSchema };
