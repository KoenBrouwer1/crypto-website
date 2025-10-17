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
        <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
            <table className="w-full text-left border-collapse border border-gray-200 dark:border-gray-800">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-800">
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Change (24h)</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoData.map((crypto) => (
                        <tr key={crypto.id}>
                            <td>
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={crypto.image}
                                    alt={crypto.name}
                                />
                            </td>
                            <td>
                                <a
                                    className="font-bold"
                                    href={`https://coinmarketcap.com/currencies/${crypto.name}`}
                                    target="_blank"
                                >
                                    {crypto.name} ({crypto.symbol.toUpperCase()}): €
                                    {crypto.current_price}
                                </a>
                            </td>
                            <td>
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