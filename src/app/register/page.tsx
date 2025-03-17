"use client";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password });
    router.push("/login"); // Redirect to login after registration
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      {/* Left Section - Form (1/3 on large screens, full on mobile) */}
      <div className="flex flex-1 flex-col justify-center bg-white px-8 py-12 shadow-lg md:px-16 lg:flex-[1]">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Create an Account</h2>
        <p className="mt-2 text-gray-600">Welcome! Please enter your details below.</p>

        <form onSubmit={handleRegister} className="mt-6 w-full max-w-md space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200 md:text-base"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200 md:text-base"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200 md:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-purple-600 p-3 text-white transition hover:bg-purple-700"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 flex items-center space-x-2 text-gray-500">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-sm">OR</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border p-3 text-gray-700 transition hover:bg-gray-100"
        >
          <FcGoogle size={20} />
          Sign up with Google
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Log in
          </a>
        </p>
      </div>

      {/* Right Section - Decorative (2/3 on large screens, hidden on small) */}
      <div className="relative hidden flex-1 items-center justify-center bg-gray-100 md:flex lg:flex-[2]">
        <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-purple-600 shadow-xl md:h-56 md:w-56 lg:h-64 lg:w-64"></div>
        <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-purple-500 opacity-50 blur-xl md:h-64 md:w-64 lg:h-72 lg:w-72"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
