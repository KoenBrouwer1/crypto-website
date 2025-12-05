"use client";
import { useEffect, useState } from "react";

export default function CryptoPage() {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin,ethereum,solana,dogecoin,tether,tron,stellar,binancecoin,pepe,ripple,official-trump&order=market_cap_desc&sparkline=true&sparkline_in_7d=true"
        )
            .then((response) => response.json())
            .then((data) => {
                setCryptoData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);
    const Sparkline = ({ data, isPositive }) => {
        // Return nothing if no data
        if (!data?.length) return null;

        // Chart dimensions
        const width = 800;
        const height = 60;

        // Find the highest and lowest prices
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;

        // Convert price data to SVG coordinates
        const points = data
            .map((value, index) => {
                // Horizontal position (spread across width)
                const xline = (index / (data.length - 1)) * width;
                
                // Vertical position (higher price = lower y value)
                const yline = height - ((value - min) / range) * height;
                
                return `${xline},${yline}`;
            })
            .join(" ");


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
        <div className="min-h-screen bg-gray-900 p-6">
            <style jsx>{`
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #131827;
                }
                ::-webkit-scrollbar-thumb {
                    background: #4b5563;
                    border-radius: 10px;
                }
            `}</style>
            <h1 className="text-3xl font-bold text-white mb-6">Cryptocurrency Tracker</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-gray-800 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="p-4 text-gray-300 font-semibold">Logo</th>
                            <th className="p-4 text-gray-300 font-semibold">Name</th>
                            <th className="p-4 text-gray-300 font-semibold">Last 7 Days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptoData.map((crypto) => (
                            <tr
                                key={crypto.id}
                                className="border-t border-gray-700 hover:bg-gray-750"
                            >
                                <td className="p-4">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={crypto.image}
                                        alt={crypto.name}
                                    />
                                </td>
                                <td className="p-4">
                                    <a
                                        className="font-bold text-white hover:text-blue-400 transition-colors"
                                        href={`https://coinmarketcap.com/currencies/${crypto.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {crypto.name}
                                        <span className="text-gray-400 p-1">
                                            ({crypto.symbol.toUpperCase()})
                                        </span>
                                    </a>
                                </td>
                                <td className="p-4">
                                    <Sparkline
                                        data={crypto.sparkline_in_7d?.price || []}
                                        isPositive={crypto.price_change_percentage_24h >= 0}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}