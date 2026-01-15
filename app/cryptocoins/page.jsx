"use client"; //moet client side worden gerenderd

//import 
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function CryptoPage() {
  //haalt gegevens op
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Haal crypto data op van de CoinGecko API bij de eerste render
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=true&price_change_percentage=24h")
            .then((response) => response.json())
            .then((data) => {
                setCryptoData(data); // Zet de opgehaalde data in state
                setLoading(false);   // Stop de loading indicator
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []); // Alleen uitvoeren bij de eerste render

    const Sparkline = ({ data, isPositive }) => {
        if (!data || data.length === 0) return null;
        // de sparkline
        const width = 120;
        const height = 40;
        const padding = 2;
      // schaalt de sparkline
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;
        
        // Bereken coördinaten voor elk punt in de sparkline grafiek
        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
            const y = height - padding - ((value - min) / range) * (height - padding * 2);
            return `${x},${y}`;
        }).join(' ');


        return (
            <svg width={width} height={height} className="inline-block">
                <polyline
                    points={points}
                    fill="none"
                    stroke={isPositive ? "#10b981" : "#ef4444"}
                    strokeWidth="2"
                />
            </svg>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
                <div className="text-white text-xl">Loading crypto data...</div>
            </div>
        );
    }

  return (
  <main>
     <Head>
      <meta name="description"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
     </Head>
   
  
      <div className="min-h-screen bg-gray-900 p-6">
        {/* desktop start */
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-4 text-gray-300 font-semibold">Logo</th>
                <th className="p-4 text-gray-300 font-semibold">Name</th>
                <th className="p-4 text-gray-300 font-semibold">Price</th>
                <th className="p-4 text-gray-300 font-semibold">Change (24h)</th>
                <th className="p-4 text-gray-300 font-semibold">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto) => (
                <tr key={crypto.id} className="border-t border-gray-700 hover:bg-gray-750">
                  <td className="p-4"><img className="w-10 h-10 rounded-full" src={crypto.image} alt={crypto.name} /></td>
                  <td className="p-4">
                    <Link href={`/cryptocoins/${crypto.id}`} className="font-bold text-white hover:text-blue-400 transition-colors">
                      {crypto.name} <span className="text-gray-400">({crypto.symbol.toUpperCase()})</span>
                    </Link>
                  </td>
                  <td className="p-4 text-white font-semibold">
                    ${crypto.current_price.toFixed(2)}
                  </td>
                  <td className="p-4">
                    {crypto.price_change_percentage_24h >= 0 ? (
                      <span className="text-green-500 font-semibold">▲ {crypto.price_change_percentage_24h.toFixed(2)}%</span>
                    ) : (
                      <span className="text-red-500 font-semibold">▼ {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
                    )}
                  </td>
                  <td className="p-4">
                    <Sparkline data={crypto.sparkline_in_7d?.price || []} isPositive={crypto.price_change_percentage_24h >= 0}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      // destop end
        {/* mobile start */}
        <div className="md:hidden space-y-4">
          {cryptoData.map((crypto) => (
            <div key={crypto.id} className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full" src={crypto.image} alt={crypto.name} />
                <Link href={`/cryptocoins/${crypto.id}`} className="font-bold text-white hover:text-blue-400">
                  {crypto.name} <span className="text-gray-400">({crypto.symbol.toUpperCase()})</span>
                </Link>
              </div>
      
              <div className="text-white font-semibold">
                ${crypto.current_price.toFixed(2)}
              </div>
      
              <div>
                {crypto.price_change_percentage_24h >= 0 ? (
                  <span className="text-green-500 font-semibold">▲ {crypto.price_change_percentage_24h.toFixed(2)}%</span>
                ) : (
                  <span className="text-red-500 font-semibold">▼ {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
                )}
              </div>
      
              <div>
                <Sparkline data={crypto.sparkline_in_7d?.price || []} isPositive={crypto.price_change_percentage_24h >= 0}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* mobile end*/}
  </main>
    );
}