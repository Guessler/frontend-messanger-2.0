'use client';

import { IProfileResponse } from '@/interfaces/profileResponse';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowLeft, Eye, EyeClosed } from 'lucide-react';
import { useUpdateProfile } from '@/hooks/api/useUpdateProfile';
import { useChangePassword } from '@/hooks/api/useChangePassword';
import { useLogout } from '@/hooks/api/useLogout';
import Link from 'next/link';

interface ProfileCardProps {
  data: IProfileResponse;
  isLoading?: boolean;
  isError?: boolean;
}

function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
}: {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div className='flex items-center'>
      <input
        type={type === "password" && isVisible ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
        w-full h-14
        rounded-2xl
        border border-white/10
        bg-white/[0.04]
        px-5
        text-[15px] text-white
        placeholder:text-white/25
        outline-none
        transition-all duration-300
        focus:border-cyan-400/40
        focus:bg-white/[0.07]
      "
      />
      {type === "password" &&
        <>
          {isVisible ?
            <Eye onClick={() => setIsVisible(prev => !prev)} className='text-white absolute right-14 cursor-pointer' />
            :
            <EyeClosed onClick={() => setIsVisible(prev => !prev)} className='text-white absolute right-14 cursor-pointer' />

          }
        </>
      }
    </div>
  );
}

export function ProfileCard({ data, isLoading, isError }: ProfileCardProps) {
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const logout = useLogout();

  const [name, setName] = useState(data.name);
  const [username, setUsername] = useState(data.username);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const isPending =
    updateProfile.isPending ||
    changePassword.isPending ||
    logout.isPending;

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-white/30">
        Загрузка...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center text-white/30">
        Ошибка загрузки
      </div>
    );
  }

  return (
    <div
      className="
      min-w-4xl
            bg-white/5 backdrop-blur-md border border-white/10
            border border-white/20
            rounded-3xl
            flex flex-col gap-6
            shadow-2xl shadow-black/40
      "
    >
      {isPending && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="text-white/60">Загрузка...</div>
        </div>
      )}

      <div className="grid grid-cols-3 items-center justify-between w-full border-b border-white/10 px-8 py-6">

        <Link href={'/'}>
          <ArrowLeft className='text-white' />
        </Link>
        
        <p className="text-base justify-self-center font-medium text-white/70">
          Настройки аккаунта
        </p>

        <button
          onClick={() => logout.mutate()}
          className="
            py-2 px-4
            w-max
            rounded-2xl
            justify-self-end
            bg-red-500/20
            text-red-200
            border border-red-500/30
            cursor-pointer
          "
        >
          Выйти из аккаунта
        </button>

      </div>

      <div className="p-8 space-y-10">
        <div className="flex items-center gap-5">
          {data.avatar ? (
            <Image
              src={data.avatar}
              alt={data.name}
              width={80}
              height={80}
              className="h-20 w-20 rounded-full border border-white/10 object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl font-bold text-white">
              {data.name[0]}
            </div>
          )}

          <div>
            <p className="text-lg font-semibold text-white">{name}</p>
            <p className="text-sm text-white/40">{username}</p>
          </div>
        </div>

        <section className="space-y-4">
          <p className="text-sm uppercase tracking-wide text-white/40">
            Профиль
          </p>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
          />

          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />

          <button
            onClick={() => updateProfile.mutate({ name, username })}
            className="
              h-12 w-full rounded-2xl
              bg-gradient-to-r from-cyan-500 to-blue-500
              text-white
              cursor-pointer
            "
          >
            Сохранить
          </button>
        </section>

        <section className="space-y-4">
          <p className="text-sm uppercase tracking-wide text-white/40">
            Безопасность
          </p>

          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Текущий пароль"
          />

          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Новый пароль"
          />

          <button
            onClick={() => changePassword.mutate({ currentPassword, newPassword })}
            className="
              h-12 w-full rounded-2xl
              border border-white/10
              bg-white/5
              text-white
              cursor-pointer
            "
          >
            Изменить пароль
          </button>
        </section>


      </div>
    </div>
  );
}