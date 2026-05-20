import { apiFetch } from '@/feature/api/client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useChangePassword() {
  return useMutation({
    mutationFn: async (body: { currentPassword: string; newPassword: string }) => {
      const res = await apiFetch(`${process.env.NEXT_PUBLIC_API_BACK}user/change-password`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
    },
    onSuccess: () => toast.success('Пароль изменён'),
    onError: () => toast.error('Ошибка изменения пароля'),
  });
}