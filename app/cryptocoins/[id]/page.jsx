"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CoinDetailPage({ params }) {
    const [coinData, setCoinData] = useState(null);
    const [loading, setLoading] = useState(true);

    const coinId = params.id;

    useEffect(() => {
        // Fetch detailed coin data
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
            .then((response) => response.json())
            .then((data) => {
                setCoinData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [coinId]);

    if (loading) {
        return <div className="min-h-screen bg-gray-900 p-6 text-white">Loading...</div>;
    }

    if (!coinData) {  
       return <div className="min-h-screen bg-gray-900 p-6 text-white">Coin not found</div>;
    }

  return (
    <main className="min-h-screen bg-gray-900 text-white px-6 py-10 pt-20">
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={coinData.image?.large}
            alt={coinData.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full"
          />
    
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold">
              {coinData.name}
              <span className="text-gray-400 text-xl sm:text-2xl ml-3">
                ({coinData.symbol?.toUpperCase()})
              </span>
            </h1>
    
            <p className="text-gray-300 mt-1">
              Rank #{coinData.market_cap_rank}
            </p>
          </div>
        </div>
    
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <p className="text-gray-300 text-lg mb-2">Current Price</p>
            <p className="text-3xl sm:text-4xl font-bold">
              ${coinData.market_data.current_price.eur}
            </p>
          </div>
    
          {/* 24h Change */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <p className="text-gray-300 text-lg mb-2">Change (24h)</p>
    
            {coinData.market_data.price_change_percentage_24h >= 0 ? (
              <p className="text-3xl sm:text-4xl font-bold text-green-500">
                ▲ {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
            ) : (
              <p className="text-3xl sm:text-4xl font-bold text-red-500">
                ▼ {Math.abs(coinData.market_data.price_change_percentage_24h).toFixed(2)}%
              </p>
            )}
          </div>
    
          {/* Market Cap */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <p className="text-gray-300 text-lg mb-2">Market Cap</p>
            <p className="text-2xl sm:text-3xl font-semibold">
              ${coinData.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>
    
          {/* 24h Volume */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <p className="text-gray-300 text-lg mb-2">Volume (24h)</p>
            <p className="text-2xl sm:text-3xl font-semibold">
              ${coinData.market_data.total_volume.usd.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}