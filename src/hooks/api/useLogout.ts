import { apiFetch } from '@/feature/api/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const res = await apiFetch(`${process.env.NEXT_PUBLIC_API_BACK}auth/logout`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error();
    },
    onSuccess: () => {
      toast.success('Вы вышли из аккаунта');
      router.push('/login');
    },
  });
}