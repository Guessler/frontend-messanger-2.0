"use client"
import { StarfieldBackground } from '@/components/ui/starfield';
import { registerSchema } from '@/feature/api/auth-schemes';
import { apiFetch } from '@/feature/api/client';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeClosed } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setVisible] = useState(false)

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: { email: string, password: string }) => {
      const res = await apiFetch(`${process.env.NEXT_PUBLIC_API_BACK}auth/login`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Ошибка')
      return res.json()
    },

    onSuccess: () => {
      toast.success('Атворизация успешна!')
      setEmail('')
      setPassword('')
    },

    onError: () => {
      toast.error('Ошибка авторизации')
    }
  })


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    loginMutation.mutate(result.data);
  }
  return (
    <StarfieldBackground>
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          className="
            w-full max-w-2xl
            bg-white/5 backdrop-blur-md border border-white/10
            border border-white/20
            rounded-3xl
            px-10 py-12
            flex flex-col gap-6
            shadow-2xl shadow-black/40
          "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Авторизация
            </h1>
            <p className="text-sm text-white/60">
              Войдите в аккаунт, чтобы начать
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <input
              className="
                w-full px-4 py-3 rounded-xl
                bg-white/10 text-white placeholder:text-white/40
                border border-white/20
                outline-none
                transition-all duration-200
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent
              "
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className='relative'>
              <input
                className="
                w-full px-4 pr-14 py-3 rounded-xl
                bg-white/10 text-white placeholder:text-white/40
                border border-white/20
                outline-none
                transition-all duration-200
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent
              "
                type={isVisible ? 'text' : 'password'}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type='button' className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setVisible(prev => !prev)}>
                {isVisible ? <Eye size={30} className='text-white' /> : <EyeClosed size={30} className='text-white' />}
              </button>
            </div>
          </div>

          <button
            className="
            cursor-pointer
              mt-2
              w-full py-3 rounded-xl
              bg-blue-500
              text-white font-medium text-lg
              shadow-lg shadow-blue-500/30
              transition-all duration-400
              hover:bg-blue-700
              active:scale-[0.98]
            "
          >
            Вход
          </button>

          <div className="flex items-center gap-3 text-white/40 text-sm">
            <div className="flex-1 h-px bg-white/20" />
            или
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <button
            type="button"
            className="
            cursor-pointer
              w-full py-3 rounded-xl
              bg-white/10 border border-white/20
              text-white font-medium
              flex items-center justify-center gap-3
              transition-all duration-400
              hover:bg-white/15
              active:scale-[0.98]
            "
          >
            <Image
              src="/svg/google-icon-logo.svg"
              alt="Google"
              width={15}
              height={15}
            />
            Войти через Google
          </button>

          <p className="text-center text-sm text-white/60">
            Еще нет аккаунта?{' '}
            <Link
              href="/register"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </StarfieldBackground>
  );
}
