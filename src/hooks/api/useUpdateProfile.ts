import { apiFetch } from '@/feature/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const updateProfile = async (body: {
  name: string;
  username: string;
}) => {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_BACK}user/profile`,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) throw new Error('Ошибка обновления профиля');
};

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success('Профиль обновлён');
      queryClient.invalidateQueries({ queryKey: ['profileInfo'] });
    },
    onError: () => toast.error('Ошибка обновления профиля'),
  });
}
