import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-12 shadow-2xl border border-white/20 text-center max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg">
          Annual Drawing Competition 2025
        </h1>
        <p className="text-white/90 text-lg mb-8 md:mb-12">
          Welcome to the official registration portal. Join us for a day of
          creativity and fun!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/register"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-500 p-1 transition-all hover:scale-105 duration-300 shadow-xl"
          >
            <div className="relative h-full bg-transparent p-6 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Student Registration
              </h2>
              <p className="text-white/80">
                Register now and get your Admit Card instantly!
              </p>
            </div>
          </Link>

          <Link
            href="/admin"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 p-1 transition-all hover:scale-105 duration-300 shadow-xl"
          >
            <div className="relative h-full bg-transparent p-6 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Admin Portal
              </h2>
              <p className="text-white/80">
                Login to manage students and results.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
