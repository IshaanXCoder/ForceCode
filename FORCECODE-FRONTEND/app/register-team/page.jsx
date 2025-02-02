"use client";

import { Nav } from "../../components/nav";
import RegistrationForm from "./components/registration-form";

export default function Page() {
  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black">
      <Nav />
      <main className="relative my-16">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <RegistrationForm />
      </main>
    </div>
  )
}

