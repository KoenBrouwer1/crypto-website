"use client";
import { useEffect, useState } from "react";

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
        <div className="flex items-center justify-center min-h-screen dark:bg-gray-800">
            <div className="p-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-500">
                <ul className="overflow-y-auto h-96 space-y-4">
                    {cryptoData.map((crypto) => (
                        <li key={crypto.id}>
                            <img
                                className="w-10 h-10 rounded-full"
                                src={crypto.image}
                                alt={crypto.name}
                            />
                            <a
                                className="font-bold"
                                href={`https://coinmarketcap.com/currencies/${crypto.name}`}
                                target="_blank"
                            >
                                {crypto.name} ({crypto.symbol.toUpperCase()}): €
                                {crypto.current_price}
                            </a>
                            {crypto.price_change_percentage_24h >= 0 ? (
                                <span style={{ color: "green" }}>
                                    ▲ {crypto.price_change_percentage_24h.toFixed(2)}%
                                </span>
                            ) : (
                                <span style={{ color: "red" }}>
                                    ▼ {crypto.price_change_percentage_24h.toFixed(2)}%
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}