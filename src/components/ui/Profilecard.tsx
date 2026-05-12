'use client';

import { apiFetch } from "@/feature/api/client";
import { IProfileResponse } from "@/interfaces/profileResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { LogOut, Mail, Pencil, Save, X } from "lucide-react";
import { useState } from "react";

interface ProfileCardProps {
  data: IProfileResponse;
}

export function ProfileCard({ data }: ProfileCardProps) {
  const [name, setName] = useState(data.name);
  const [username, setUsername] = useState(data.username);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  // --- Обновление профиля ---
  const updateMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BACK}user/profile`,
        {
          method: "PATCH",
          body: JSON.stringify({ name, username }),
        }
      );
      if (!res.ok) throw new Error("Ошибка обновления профиля");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Данные успешно обновлены!");
      setIsEditing(false);
      // Инвалидируем кеш — следующий рендер получит свежие данные
      queryClient.invalidateQueries({ queryKey: ["profileInfo"] });
    },
    onError: () => {
      toast.error("Ошибка обновления данных");
    },
  });

  // --- Выход ---
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BACK}auth/logout`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Ошибка выхода");
    },
    onSuccess: () => {
      toast.success("Вы вышли из аккаунта");
      router.push("/login");
    },
    onError: () => {
      toast.error("Ошибка выхода");
    },
  });

  const handleCancelEdit = () => {
    // Сбрасываем локальный стейт к оригинальным данным
    setName(data.name);
    setUsername(data.username);
    setIsEditing(false);
  };

  const isPending = updateMutation.isPending || logoutMutation.isPending;

  return (
    <div
      className="
        relative
        w-full max-w-2xl
        rounded-3xl
        bg-white/5
        backdrop-blur-md
        border border-white/20
        shadow-2xl shadow-black/40
        px-10 py-12
        overflow-hidden
      "
    >
      {/* Декоративные блюры */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Панель управления редактированием */}
      <div className="w-full flex justify-end gap-2 relative z-20 mb-4">
        {isEditing && (
          <button
            onClick={handleCancelEdit}
            disabled={isPending}
            className="
              cursor-pointer w-11 h-11 rounded-xl
              bg-white/10 border border-white/20
              flex items-center justify-center
              text-white/60 hover:text-white
              transition-all duration-300 hover:bg-white/20 active:scale-95
              disabled:opacity-40 disabled:pointer-events-none
            "
          >
            <X size={18} />
          </button>
        )}

        <button
          onClick={() => {
            if (isEditing) {
              updateMutation.mutate();
            } else {
              setIsEditing(true);
            }
          }}
          disabled={isPending}
          className="
            cursor-pointer w-11 h-11 rounded-xl
            bg-white/10 border border-white/20
            flex items-center justify-center text-white
            transition-all duration-300 hover:bg-white/20 active:scale-95
            disabled:opacity-40 disabled:pointer-events-none
          "
        >
          {isEditing ? <Save size={18} /> : <Pencil size={18} />}
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Аватар */}
        {data.avatar ? (
          <Image
            src={data.avatar}
            alt={data.name}
            width={140}
            height={140}
            className="rounded-full object-cover border-4 border-white/20 shadow-xl"
          />
        ) : (
          <div
            className="
              w-[140px] h-[140px] rounded-full
              bg-white/10 border border-white/20
              flex items-center justify-center
              text-5xl font-bold text-white
            "
          >
            {data.name[0]}
          </div>
        )}

        {/* Имя и username */}
        <div className="mt-6 text-center w-full flex flex-col items-center gap-3">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full max-w-sm text-center px-5 py-3
                text-3xl font-semibold tracking-tight text-white
                bg-white/10 border border-white/20 rounded-2xl outline-none
                transition-all duration-300
                focus:bg-white/15 focus:border-blue-400/40 focus:ring-4 focus:ring-blue-500/20
                placeholder:text-white/30
              "
            />
          ) : (
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              {name}
            </h1>
          )}

          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full max-w-xs text-center px-4 py-2
                text-lg text-blue-300
                bg-blue-500/10 border border-blue-400/20 rounded-xl outline-none
                transition-all duration-300
                focus:bg-blue-500/15 focus:border-blue-400/40 focus:ring-4 focus:ring-blue-500/20
                placeholder:text-white/30
              "
            />
          ) : (
            <p className="text-blue-300 text-lg">@{username}</p>
          )}
        </div>

        {/* Email */}
        <div className="w-full mt-8 flex flex-col gap-4">
          <div
            className="
              flex items-center gap-4
              bg-white/5 border border-white/10
              rounded-2xl px-5 py-4
            "
          >
            <Mail className="text-blue-400" size={22} />
            <div className="w-full">
              <p className="text-sm text-white/40">Email</p>
              <p className="text-white break-all">{data.email}</p>
            </div>
          </div>
        </div>

        {/* Главная кнопка */}
        <button
          onClick={() => {
            if (isEditing) {
              updateMutation.mutate();
            } else {
              logoutMutation.mutate();
            }
          }}
          disabled={isPending}
          className={`
            cursor-pointer mt-8 w-full py-3 rounded-2xl font-medium
            flex items-center justify-center gap-3
            transition-all duration-300 active:scale-[0.98]
            disabled:opacity-50 disabled:pointer-events-none
            ${isEditing
              ? "bg-green-500/15 border border-green-400/20 text-green-200 hover:bg-green-500/25 hover:border-green-400/40"
              : "bg-red-500/15 border border-red-400/20 text-red-200 hover:bg-red-500/25 hover:border-red-400/40"
            }
          `}
        >
          {isEditing ? (
            <>
              <Save size={20} />
              {updateMutation.isPending ? "Сохранение..." : "Сохранить изменения"}
            </>
          ) : (
            <>
              <LogOut size={20} />
              {logoutMutation.isPending ? "Выход..." : "Выйти из аккаунта"}
            </>
          )}
        </button>

      </div>
    </div>
  );
}