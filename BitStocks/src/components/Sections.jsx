import React from 'react'

const Sections = () => {
    return (
        <div>Sections</div>
    )
}

export const Section1 = () => {
    return (
        <section className="bg-gray-800 text-white p-10 text-center">
            <h1 className="text-4xl font-bold">Welcome to BitStocks</h1>
            <p className="mt-4 text-lg">Your Gateway to the World of Cryptocurrency</p>
            <p className="mt-2 text-gray-300">Explore, trade, and stay informed on all things crypto with our easy-to-use platform.</p>
            <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg transition">
                Get Started
            </button>
        </section>

    )
}


export const Section2 = () => {
    return (
        <section className="p-10 bg-white text-gray-800">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose BitStocks?</h2>
            <div className="grid gap-8 md:grid-cols-3 text-center">
                <div className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold">Secure and Fast Transactions</h3>
                    <p className="mt-4 text-gray-600">Experience lightning-fast trading with top-notch security protocols to keep your assets safe.</p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold">Real-Time Data and Analytics</h3>
                    <p className="mt-4 text-gray-600">Stay up-to-date with live market data, crypto news, and insights right at your fingertips.</p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold">24/7 Support</h3>
                    <p className="mt-4 text-gray-600">Our team is available around the clock to assist you with any questions or issues.</p>
                </div>
            </div>
        </section>

    )
}

export const Section3 = () => {
    return (
        <section className="p-10 bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-6">Trending Coins</h2>
            <div className="grid gap-6 md:grid-cols-3">
                {/* Individual coin example */}
                <div className="p-6 bg-white border rounded-lg shadow-sm text-center hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold">Bitcoin (BTC)</h3>
                    <p className="mt-2 text-gray-600">Price: $50,000</p>
                    <p className="mt-1 text-green-500">+5.3% (24h)</p>
                    <p className="mt-1 text-gray-600">Market Cap: $1 Trillion</p>
                </div>
                {/* Repeat above block for other coins */}
            </div>
        </section>

    )
}

export const Section4 = () => {
    return (
        <section className="p-10 bg-white text-gray-800">
            <h2 className="text-3xl font-bold text-center mb-8">Getting Started with BitStocks</h2>
            <div className="flex flex-col md:flex-row justify-around">
                <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold">Step 1: Create an Account</h3>
                    <p className="mt-2 text-gray-600">Sign up and verify your email to get started.</p>
                </div>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold">Step 2: Add Funds</h3>
                    <p className="mt-2 text-gray-600">Easily deposit funds via bank transfer or credit card.</p>
                </div>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold">Step 3: Start Trading</h3>
                    <p className="mt-2 text-gray-600">Explore the crypto markets and start trading with confidence.</p>
                </div>
            </div>
        </section>

    )
}
export default Sections