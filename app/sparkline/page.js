import Link from "next/link";

export default function Sparkline() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
            <h1>Sparkline Page 📈</h1>
            <p>This is your sparkline data or chart.</p>

            <Link href="/">Back to Home</Link>
        </div>
    );
}
