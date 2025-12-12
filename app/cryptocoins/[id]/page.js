"use client";
import { useEffect, useState } from "react";

export default function CoinDetailPage({ params }) {
    const [coinData, setCoinData] = useState(null);
    const [loading, setLoading] = useState(true);

    // params.id will be "bitcoin", "ethereum", etc.
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
        <div className="min-h-screen bg-gray-900 p-6 text-white">
            <h1 className="text-4xl font-bold">{coinData.name}</h1>
            <p className="text-2xl mt-4">${coinData.market_data.current_price.usd}</p>
            {/* Add more d  ata here */}
        </div>
    );
}