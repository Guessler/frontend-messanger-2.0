'use client';

import { ProfileCard } from "@/components/ui/Profilecard";
import { StarfieldBackground } from "@/components/ui/starfield";
import { apiFetch } from "@/feature/api/client";
import { IProfileResponse } from "@/interfaces/profileResponse";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const { data, isError, isLoading } = useQuery<IProfileResponse>({
    queryKey: ["profileInfo"],
    queryFn: async () => {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_BACK}user/profile`
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <StarfieldBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl animate-pulse">
            Загрузка профиля...
          </div>
        </div>
      </StarfieldBackground>
    );
  }

  if (isError || !data) {
    return (
      <StarfieldBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-400">Ошибка загрузки профиля</div>
        </div>
      </StarfieldBackground>
    );
  }

  return (
    <StarfieldBackground>
      <div className="min-h-screen flex items-center justify-center px-4">
        <ProfileCard data={data} />
      </div>
    </StarfieldBackground>
  );
}