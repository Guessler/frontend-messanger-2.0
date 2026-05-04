import z from 'zod';

export const registerSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string().min(1, 'Введите пароль'),
});
