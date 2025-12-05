export default function Home() {
    return (
        <div className="bg-gray-900 min-h-screen">
            <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 border-b border-gray-700">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center">
                        <span className="font-bold text-2xl text-white">CryptoPage</span>
                    </a>
                    <div className="hidden md:block">
                        <ul className="flex gap-8">
                            <li>
                                <a href="/cryptocoins" className="text-white hover:text-blue-400">
                                    Coins
                                </a>
                            </li>
                            <li>
                                <a href="/sparkline" className="text-white hover:text-blue-400">
                                    Sparkline
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="flex items-center justify-center min-h-screen p-6 pt-20">
                <div className="flex flex-col mr-12">
                    <h1 className="text-5xl font-bold text-white mb-4">Welcome to CryptoPage</h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Explore the latest in cryptocurrency and market trends.
                    </p>
                    <div className="flex gap-4">
                        <a href="/cryptocoins" className="px-6 py-3 bg-blue-500 text-white rounded-lg">View Coins</a>
                        <a href="/sparkline" className="px-6 py-3 bg-gray-700 text-white rounded-lg">See Charts</a>
                    </div>
                </div>
                <img src="/img/bitcoin.png" className="w-96 h-auto" alt="bitcoin" />
            </main>
        </div>
    );
}
