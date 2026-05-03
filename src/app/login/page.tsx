import { StarfieldBackground } from '@/components/ui/starfield';
import Image from 'next/image';
import Link from 'next/link';
export default function LoginPage() {
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
            />

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
              type="password"
              placeholder="Пароль"
            />
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
            Зарегистрироваться
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
