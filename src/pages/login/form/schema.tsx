import Zod from 'zod';

const emailFormSchema = Zod.object({
    email: Zod.string({
        required_error: '邮箱不能为空',
        invalid_type_error: '邮箱类型错误'
    })
        .min(1, {
            message: '邮箱不能为空'
        })
        .max(255, {
            message: '邮箱长度超出限制'
        })
        .email('邮箱格式错误')
});

export { emailFormSchema };
