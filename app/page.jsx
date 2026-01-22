"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 border-b border-gray-700">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="font-bold text-2xl sm:text-3xl">
            CryptoPage
          </Link>

          <div className="flex gap-6 sm:gap-10 text-base sm:text-lg">
            <Link href="/cryptocoins" className="hover:text-blue-400 transition">
              Coins
            </Link>
          </div>
        </div>
      </nav>

      {/* main */}
      <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-28 text-center">
        <img
          src="/img/bitcoin.png"
          alt="Bitcoin"
          className="w-56 sm:w-72 md:w-80 mb-10"
        />

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5">
          Welcome to CryptoPage
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mb-10">
          Explore the latest cryptocurrency prices, changes and simple charts in
          one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <Link
            href="/cryptocoins"
            className="px-8 py-4 text-lg sm:text-xl bg-blue-500 rounded-xl hover:bg-blue-600 transition text-center font-semibold">
            View Coins
          </Link>
        </div>
      </main>
    </div>
  );
}
