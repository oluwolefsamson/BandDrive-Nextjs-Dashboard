"use client";

import LoginImage from "../../../public/Login.jpg"; // Ensure this image exists in your public folder
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { EyeIcon } from "@heroicons/react/24/outline";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      console.error("Sign-in error:", res.error);
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-blue-700 p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-lg md:flex-row">
        {/* Left Side - Form */}
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
          <h2 className="mb-2 text-center text-3xl font-bold">Welcome home</h2>
          <p className="mb-6 text-center text-gray-500">Please enter your details.</p>
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border p-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border p-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember for 30 days
              </label>
              <a href="#" className="hover:text-blue-500">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            No account yet?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <button className="rounded-full border p-2 hover:bg-gray-100">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                width={24}
                height={24}
              />
            </button>

            <button className="rounded-full border p-2 hover:bg-gray-100">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative hidden md:block md:w-1/2">
          <Image
            src={LoginImage}
            alt="Login"
            layout="fill"
            objectFit="cover"
            className="rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
