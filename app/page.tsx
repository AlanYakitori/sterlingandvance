"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X, Globe, Facebook, Twitter, Instagram, CreditCard } from "lucide-react";

// Configuración de Firebase
import { auth, db } from "@/lib/firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const traducciones = {
  es: {
    nav_registro: "Registro",
    nav_inicio: "Bienvenida",
    nav_colecciones: "Colecciones",
    nav_pago: "Comprar",
    nav_drop_1: "Relojes de Lujo",
    nav_drop_2: "Ediciones Limitadas",
    form_titulo: "Únete a nuestro Club Exclusivo",
    form_nombre: "Nombre",
    form_correo: "Correo",
    form_pass: "Contraseña",
    form_btn: "Registrar y Guardar",
    hero_titulo: "Elegancia Atemporal",
    hero_sub: "Descubre la perfección suiza en cada segundo. Una metáfora visual del tiempo eterno.",
    btn_explorar: "Explorar Colección",
    seccion_relojes: "Nuestras Piezas Clásicas",
    btn_comprar: "Comprar Ahora",
    pago_titulo: "Finalizar Compra",
    pago_nombre: "Nombre en la Tarjeta",
    pago_tarjeta: "Número de Tarjeta",
    pago_fecha: "Fecha (MM/AA)",
    pago_cvv: "CVV",
    pago_btn: "Procesar Pago Seguro",
    footer_texto: "2026 Baume & Mercier. Todos los derechos reservados. Proyecto Académico.",
    btn_cool: "Otras páginas cool"
  },
  en: {
    nav_registro: "Register",
    nav_inicio: "Welcome",
    nav_colecciones: "Collections",
    nav_pago: "Checkout",
    nav_drop_1: "Luxury Watches",
    nav_drop_2: "Limited Editions",
    form_titulo: "Join our Exclusive Club",
    form_nombre: "Name",
    form_correo: "Email",
    form_pass: "Password",
    form_btn: "Register and Save",
    hero_titulo: "Timeless Elegance",
    hero_sub: "Discover Swiss perfection in every second. A visual metaphor of eternal time.",
    btn_explorar: "Explore Collection",
    seccion_relojes: "Our Classic Pieces",
    btn_comprar: "Buy Now",
    pago_titulo: "Checkout",
    pago_nombre: "Name on Card",
    pago_tarjeta: "Card Number",
    pago_fecha: "Exp. Date (MM/YY)",
    pago_cvv: "CVV",
    pago_btn: "Process Secure Payment",
    footer_texto: "2026 Baume & Mercier. All rights reserved. Academic Project.",
    btn_cool: "Other cool pages"
  }
};

const PRODUCTOS = [
  { id: 1, modelo: "Riviera Baumatic", ref: "10616", precio: "$85,200 MXN", img: "/reloj1.png" },
  { id: 2, modelo: "Classima", ref: "10324", precio: "$28,500 MXN", img: "/reloj2.png" },
  { id: 3, modelo: "Clifton", ref: "10592", precio: "$112,000 MXN", img: "/reloj3.png" },
];

export default function IndexPage() {
  const [idioma, setIdioma] = useState<"es" | "en">("es");
  const [menuAbierto, setMenuAbierto] = useState(false);
  
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const t = traducciones[idioma];

  const registrarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      await setDoc(doc(db, "usuarios_landing", userCredential.user.uid), {
        nombre, correo, fechaRegistro: new Date().toISOString()
      });
      alert(idioma === "es" ? "¡Datos guardados en Firebase!" : "Data saved to Firebase!");
      setNombre(""); setCorreo(""); setPassword("");
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans scroll-smooth uppercase tracking-tight">
      
      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          <div className="flex flex-col cursor-default">
            <h1 className="font-serif text-xl md:text-2xl tracking-[0.2em]">Baume & Mercier</h1>
            <p className="text-[8px] tracking-[0.4em]">Geneve . 1830</p>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[10px] tracking-widest font-bold">
            <a href="#registro" className="hover:text-gray-400 transition-colors">{t.nav_registro}</a>
            <a href="#inicio" className="hover:text-gray-400 transition-colors">{t.nav_inicio}</a>
            
            {/* DROPDOWN CORREGIDO */}
            <div className="relative group py-2">
              <div className="flex items-center gap-1 cursor-pointer hover:text-gray-400">
                {t.nav_colecciones} <ChevronDown size={12} />
              </div>
              <div className="absolute top-full left-0 hidden group-hover:flex flex-col w-48 bg-white border border-gray-100 shadow-2xl py-2 transition-all">
                <a href="#colecciones" className="px-6 py-3 hover:bg-gray-50 transition-colors">{t.nav_drop_1}</a>
                <a href="#colecciones" className="px-6 py-3 hover:bg-gray-50 transition-colors">{t.nav_drop_2}</a>
              </div>
            </div>

            <a href="#pago" className="hover:text-gray-400 transition-colors">{t.nav_pago}</a>
            <button onClick={() => setIdioma(idioma === "es" ? "en" : "es")} className="flex items-center gap-2 border border-black px-3 py-1 hover:bg-black hover:text-white transition-all">
              <Globe size={14} /> {idioma === "es" ? "EN" : "ES"}
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuAbierto(!menuAbierto)}>
            {menuAbierto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* SECCIÓN 1: REGISTRO (Ley de Proximidad) */}
      <section id="registro" className="pt-32 pb-16 px-6 lg:px-12 flex justify-center items-center min-h-screen bg-white">
        <div className="w-full max-w-md border border-black p-10 shadow-sm">
          <h3 className="font-serif text-2xl mb-8 text-center tracking-normal uppercase">{t.form_titulo}</h3>
          <form onSubmit={registrarUsuario} className="flex flex-col gap-6">
            <input type="text" placeholder={t.form_nombre} value={nombre} onChange={(e) => setNombre(e.target.value)} required className="border-b border-black py-2 outline-none text-xs" />
            <input type="email" placeholder={t.form_correo} value={correo} onChange={(e) => setCorreo(e.target.value)} required className="border-b border-black py-2 outline-none text-xs" />
            <input type="password" placeholder={t.form_pass} value={password} onChange={(e) => setPassword(e.target.value)} required className="border-b border-black py-2 outline-none text-xs" />
            <button type="submit" className="mt-4 bg-black text-white py-4 text-[10px] font-bold tracking-[0.2em] hover:bg-gray-800 transition-all">{t.form_btn}</button>
          </form>
        </div>
      </section>

      {/* SECCIÓN 2: BIENVENIDA (Simetría y Balance) */}
      <section id="inicio" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 min-h-screen">
        <div className="w-full md:w-1/2 text-left">
          <h2 className="font-serif text-5xl lg:text-7xl leading-none mb-6 tracking-tight uppercase">{t.hero_titulo}</h2>
          <p className="text-gray-500 mb-8 max-w-md text-xs leading-relaxed tracking-wider normal-case">{t.hero_sub}</p>
          <a href="#colecciones" className="inline-block border border-black px-10 py-4 text-[10px] font-bold tracking-[0.3em] hover:bg-black hover:text-white transition-all">{t.btn_explorar}</a>
        </div>
        <div className="w-full md:w-1/2 relative h-[500px]">
          <Image src="/reloj.png" alt="Reloj Principal" fill className="object-contain" />
        </div>
      </section>

      {/* SECCIÓN 3: PRODUCTOS (Psicología Gestalt: Continuidad) */}
      <section id="colecciones" className="py-24 bg-gray-50 px-6 lg:px-12 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <h3 className="font-serif text-3xl text-center mb-20 tracking-widest uppercase">{t.seccion_relojes}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {PRODUCTOS.map((reloj) => (
              <div key={reloj.id} className="flex flex-col items-center group">
                <div className="relative w-full aspect-square mb-8 transition-transform duration-700 group-hover:scale-105">
                  <Image src={reloj.img} alt={reloj.modelo} fill className="object-contain" />
                </div>
                <h4 className="font-serif text-lg tracking-normal uppercase">{reloj.modelo}</h4>
                <p className="text-[10px] text-gray-400 mt-2 tracking-[0.2em]">REF. {reloj.ref}</p>
                <p className="text-sm mt-4 font-medium tracking-widest">{reloj.precio}</p>
                <a href="#pago" className="mt-6 text-[9px] font-bold border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">{t.btn_comprar}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: PAGO (Metáfora Visual) */}
      <section id="pago" className="py-24 px-6 lg:px-12 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md border border-gray-200 p-12 bg-white shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <CreditCard size={32} strokeWidth={1} className="mb-4" />
            <h3 className="font-serif text-xl uppercase tracking-widest">{t.pago_titulo}</h3>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Simulated Payment Success"); }} className="flex flex-col gap-6">
            <input type="text" placeholder={t.pago_nombre} required className="border-b border-gray-300 py-3 text-[10px] outline-none focus:border-black transition-colors" />
            <input type="text" placeholder={t.pago_tarjeta} maxLength={16} required className="border-b border-gray-300 py-3 text-[10px] outline-none focus:border-black transition-colors" />
            <div className="flex gap-8">
              <input type="text" placeholder={t.pago_fecha} className="w-1/2 border-b border-gray-300 py-3 text-[10px] outline-none focus:border-black transition-colors" />
              <input type="password" placeholder={t.pago_cvv} maxLength={3} className="w-1/2 border-b border-gray-300 py-3 text-[10px] outline-none focus:border-black transition-colors" />
            </div>
            <button type="submit" className="mt-6 bg-black text-white py-4 text-[9px] font-bold tracking-[0.3em] hover:bg-gray-800 transition-all">{t.pago_btn}</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-20 px-6 lg:px-12 flex flex-col items-center">
        <h2 className="font-serif text-2xl tracking-[0.3em] mb-8 uppercase">Baume & Mercier</h2>
        <div className="flex gap-10 mb-10 text-gray-400">
          <Facebook size={18} className="hover:text-black cursor-pointer transition-colors" />
          <Instagram size={18} className="hover:text-black cursor-pointer transition-colors" />
          <Twitter size={18} className="hover:text-black cursor-pointer transition-colors" />
        </div>
        <a href="https://tupagina.com" target="_blank" rel="noopener noreferrer" className="mb-8 border border-black px-6 py-2 text-[9px] font-bold tracking-widest hover:bg-black hover:text-white transition-all">
          {t.btn_cool}
        </a>
        <p className="text-[8px] text-gray-400 tracking-[0.4em] uppercase">{t.footer_texto}</p>
      </footer>

    </div>
  );
}