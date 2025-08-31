"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-100 to-orange-200">
      <h1 className="text-8xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl text-gray-700">Oops! Page not found</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-white shadow-lg transition hover:bg-red-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
