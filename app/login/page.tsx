import Image from "next/image";
import Head from "next/head";
import { Facebook, Twitter } from "lucide-react"; 
import Link from "next/link";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Baume & Mercier | Iniciar Sesion</title>
      </Head>

      <div className="flex min-h-screen bg-white text-black font-sans overflow-hidden">
        
        {/* Mitad Izquierda: Alinear a la derecha (items-end) para acercarlo al centro */}
        <div className="flex w-1/2 flex-col items-end justify-center pr-10 lg:pr-20 z-10 bg-white">
          
          {/* Contenedor del contenido centrado en si mismo, pero empujado a la derecha por el padre */}
          <div className="w-full max-w-sm flex flex-col items-center">
            
            <div className="text-center mb-12 w-full">
              <h1 className="font-serif text-4xl lg:text-5xl uppercase tracking-[0.25em] text-black">
                Baume & Mercier
              </h1>
              <div className="mt-3 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-black"></div>
                <p className="text-[10px] tracking-[0.4em] text-gray-700 uppercase">
                  GENEVE . 1830
                </p>
                <div className="h-px w-12 bg-black"></div>
              </div>
            </div>

            <div className="w-full border-2 border-black rounded-2xl p-8 bg-white shadow-2xl">
              <h2 className="font-serif text-2xl mb-6 text-black">
                Ingresa tus datos
              </h2>
              
              <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-black">
                    Correo
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full border border-black px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50"
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-black">
                    Contrasena
                  </label>
                  <input 
                    type="password" 
                    id="password" 
                    className="w-full border border-black px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50"
                  />
                </div>

                <Link href="/registro" className="text-[11px] text-gray-500 hover:text-black transition-colors underline decoration-1 underline-offset-4">
                    No tienes cuenta? Registrate aqui
                </Link>

                <button 
                  type="submit" 
                  className="mt-4 w-full bg-black px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white rounded border border-black transition-all hover:bg-white hover:text-black"
                >
                  Iniciar Sesion
                </button>
              </form>

              <div className="mt-8 flex justify-center gap-4">
                <SocialIcon><Facebook size={18} strokeWidth={1.5} /></SocialIcon>
                <SocialIcon><GoogleIcon /></SocialIcon>
                <SocialIcon><Twitter size={18} strokeWidth={1.5} /></SocialIcon>
              </div>
            </div>
          </div>
        </div>

        {/* Mitad Derecha: Imagen anclada a la izquierda (object-left) para pegarse al centro */}
        <div className="relative w-1/2 h-screen overflow-hidden bg-black">
          <Image 
            src="/reloj.png" 
            alt="Detalle de Reloj de Lujo"
            fill
            priority
            className="object-cover object-left"
          />
        </div>

      </div>
    </>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-black hover:text-black transition-all duration-300 cursor-pointer bg-white">
      {children}
    </div>
  );
}