export default function Home() {
    return (
        <div className="bg-black">
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/0 border-gray-200 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl whitespace-nowrap dark:text-white">
                            Home
                        </span>
                    </a>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50/0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white/0 dark:bg-gray-800/0 md:dark:bg-gray-900/0 dark:border-gray-700">
                            <li>
                                <a href="/cryptocoins" className="text-white hover:text-blue-500">
                                    coins
                                </a>
                            </li>
                            <li>
                                <a href="/sparkline" className="text-white hover:text-blue-500">
                                    sparkline
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="flex flex-col items-center justify-center text-white min-h-screen p-6">
                <h1 className="font-bold text-4xl text-center">Welcome to the Home Page!</h1>
                <img src="/img/bitcoin.png" className="w-[500px] h-auto" alt="bitcoin" />
            </main>
        </div>
    );
}
