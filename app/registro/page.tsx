"use client";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Facebook, Twitter } from "lucide-react";

// Importa tu configuracion de Firebase (asegurate de tener el archivo lib/firebase.ts)
import { auth, db } from "@/lib/firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function RegistroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    fechaNacimiento: "",
    genero: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validacion de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.correo, formData.password);
      const user = userCredential.user;

      // 2. Guardar el resto de los datos en Firestore (Coleccion 'usuarios')
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        fechaNacimiento: formData.fechaNacimiento,
        genero: formData.genero,
        telefono: formData.telefono,
        uid: user.uid,
        fechaCreacion: new Date().toISOString()
      });

      alert("¡Cuenta creada con éxito, Alaan!");
      router.push("/login"); // Redirige al login tras el éxito
      
    } catch (err: any) {
      setError("Error al registrarse: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-white text-black font-sans overflow-hidden">
        
        {/* Lado Izquierdo: Formulario */}
        <div className="flex w-1/2 flex-col items-center justify-center p-8 z-10 bg-white overflow-y-auto">
          <div className="w-full max-w-lg flex flex-col items-center">
            
            <div className="text-center mb-8 w-full">
              <h1 className="font-serif text-3xl lg:text-4xl uppercase tracking-[0.25em] text-black">
                Baume & Mercier
              </h1>
              <div className="mt-3 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-black"></div>
                <p className="text-[10px] tracking-[0.4em] text-gray-700 uppercase">
                  Crear Cuenta
                </p>
                <div className="h-px w-12 bg-black"></div>
              </div>
            </div>

            <div className="w-full border-2 border-black rounded-2xl p-8 bg-white shadow-2xl">
              
              {error && (
                <div className="mb-4 text-center text-xs text-red-600 bg-red-50 p-2 border border-red-200 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider">Nombre</label>
                    <input type="text" name="nombre" onChange={handleChange} required className="w-full border border-black px-3 py-2 text-sm rounded focus:outline-none bg-gray-50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider">Apellido</label>
                    <input type="text" name="apellido" onChange={handleChange} required className="w-full border border-black px-3 py-2 text-sm rounded focus:outline-none bg-gray-50" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold uppercase tracking-wider">Correo Electrónico</label>
                  <input type="email" name="correo" onChange={handleChange} required className="w-full border border-black px-3 py-2 text-sm rounded focus:outline-none bg-gray-50" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider">Fecha de Nacimiento</label>
                    <input type="date" name="fechaNacimiento" onChange={handleChange} required className="w-full border border-black px-3 py-2 text-sm rounded focus:outline-none bg-gray-50 uppercase" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider">Género</label>
                    <select name="genero" onChange={handleChange} required className="w-full border border-black px-3 py-2 text-sm rounded focus:outline-none bg-gray-50">
                      <option value="">Selecciona</option>
                      <option value="femenino">Femenino</option>
                      <option value="masculino">Masculino</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold uppercase tracking-wider">Teléfono</label>
                  <input type="tel" name="telefono" onChange={handleChange} required className="w-full border border-black px-3 py-2 text-sm rounded focus:outline-none bg-gray-50" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider">Contraseña</label>
                    <input type="password" name="password" onChange={handleChange} required className="w-full border border-black px-3 py-2 text-sm rounded focus:outline-none bg-gray-50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider">Validar Contraseña</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} required className="w-full border border-black px-3 py-2 text-sm rounded focus:outline-none bg-gray-50" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="mt-6 w-full bg-black px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white rounded border border-black transition-all hover:bg-white hover:text-black disabled:bg-gray-400"
                >
                  {loading ? "Registrando..." : "Registrarse"}
                </button>
                
                <Link href="/login" className="text-[11px] text-center text-black underline underline-offset-4 hover:text-gray-600 transition-colors mt-2">
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </Link>

              </form>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Imagen Recortada */}
        <div className="relative w-1/2 h-screen overflow-hidden bg-black">
          <Image 
            src="/reloj.png" 
            alt="Reloj Baume & Mercier"
            fill
            priority
            className="object-cover object-left"
          />
        </div>

      </div>
    </>
  );
}