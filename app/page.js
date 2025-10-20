"use client";
import { useEffect, useState } from "react";

import Link from "next/link";

export default function Home() {
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin,ethereum,solana,dogecoin,tether,tron,stellar,binancecoin,pepe,ripple,official-trump&order=market_cap_desc&sparkline=false"
        )
            .then((response) => response.json())
            .then((data) => setCryptoData(data))
            .catch((error) => console.error(error));
}, []);
return (
        <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
            <Link href="/sparkline">Go to Sparkline Page</Link>
            <table className="w-full text-left border-collapse border border-gray-200 dark:border-gray-700">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 m-1">
                        <th className="m-1">Logo</th>
                        <th className="m-1">Name</th>
                        <th className="m-1">Price</th>
                        <th className="m-1">Change (24h)</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoData.map((crypto) => (
                        <tr key={crypto.id} className="m-1">
                            <td className="m-1">
                                <img
                                    className="w-10 h-10 rounded-full m-1"
                                    src={crypto.image}
                                    alt={crypto.name}
                                />
                            </td>
                            <td className="m-1">
                                <a
                                    className="font-bold m-1"
                                    href={`https://coinmarketcap.com/currencies/${crypto.name}`}
                                    target="_blank"
                                >
                                    {crypto.name} ({crypto.symbol.toUpperCase()}):
                                </a>
                            </td>
                            <td className="m-1"> 
                                €   {crypto.current_price} 
                            </td>
                            <td className="m-1">
                                {crypto.price_change_percentage_24h >= 0 ? (
                                    <span style={{ color: "green" }}>
                                        ▲ {crypto.price_change_percentage_24h.toFixed(2)}%
                                    </span>
                                ) : (
                                    <span style={{ color: "red" }}>
                                        ▼ {crypto.price_change_percentage_24h.toFixed(2)}%
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    );
}