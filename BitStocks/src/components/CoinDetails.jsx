import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AiOutlineRise, AiOutlineFall, AiOutlineBarChart, AiOutlineDollar, AiOutlineEuro } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import toast from "react-hot-toast";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Chart from "./Chart";
import { server } from "../main";

const CoinDetails = () => {
    const params = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [currency, setCurrency] = useState("inr");
    const [days, setDays] = useState("24h");
    const [chartArray, setChartArray] = useState([]);

    const fetchCoin = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${server}/coins/${params.id}`);
            const { data: chartData } = await axios.get(
                `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
            );
            setCoin(data);
            setChartArray(chartData.prices);
            setLoading(false);
            setIsError(false);
        } catch (error) {
            console.log(error)
            setTimeout(() => {
                setLoading(false);
                setIsError(true);
            }, 2000);
        }
    };

    useEffect(() => {
        fetchCoin();
    }, [params.id, currency, days]);

    if (loading) return <Loader />;
    if (isError) return <div className="mt-36"><ErrorComponent message="Failed to load coin. Please try again later." /></div>;

    const currentPrice = coin.market_data.current_price[currency];
    const athPrice = coin.market_data.ath[currency];
    const atlPrice = coin.market_data.atl[currency];
    const athChangePercentage = coin.market_data.ath_change_percentage[currency];
    const atlChangePercentage = coin.market_data.atl_change_percentage[currency];
    const lastUpdated = new Date(coin.market_data.last_updated).toLocaleString();
    const athDate = new Date(coin.market_data.ath_date[currency]).toLocaleDateString();
    const atlDate = new Date(coin.market_data.atl_date[currency]).toLocaleDateString();
    const marketCapFdvRatio = coin.market_data.market_cap_fdv_ratio || "N/A";

    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    // Button for selecting chart range
    const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

    const switchChartStats = (key) => {
        switch (key) {
            case "24h":
                setDays("24h");
                break;
            case "7d":
                setDays("7d");
                break;
            case "14d":
                setDays("14d");
                break;
            case "30d":
                setDays("30d");
                break;
            case "60d":
                setDays("60d");
                break;
            case "200d":
                setDays("200d");
                break;
            case "1y":
                setDays("365d");
                break;
            case "max":
                setDays("max");
                break;
            default:
                setDays("24h");
                break;
        }
    };

    // Calculate bar widths based on current, ATH, and ATL prices
    const barWidth = 300;
    const currentWidth = (currentPrice / athPrice) * barWidth;
    const athWidth = barWidth;
    const atlWidth = (atlPrice / athPrice) * barWidth;

    return (
        <div className="mt-24 p-8 bg-gray-900 text-white rounded-lg shadow-lg max-w-3xl mx-auto">
            {/* Coin Header */}
            <div className="flex items-center space-x-4 mb-8">
                <img src={coin.image.large} alt={`${coin.name} logo`} className="w-16 h-16" />
                <div>
                    <h1 className="text-4xl font-bold font-sans">{coin.name} <span className="text-gray-400">({coin.symbol.toUpperCase()})</span></h1>
                    <p className="text-lg font-light text-gray-500">Market Cap Rank: #{coin.market_cap_rank}</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={() => { toast.success('Currency set to Rupees!'); setCurrency('inr') }} className={`p-2 ${currency === 'inr' ? 'text-yellow-500' : 'text-white'}`}>
                        <BiRupee size={24} />
                    </button>
                    <button onClick={() => { toast.success('Currency set to US Dollars!'); setCurrency('usd') }} className={`p-2 ${currency === 'usd' ? 'text-yellow-500' : 'text-white'}`}>
                        <AiOutlineDollar size={24} />
                    </button>
                    <button onClick={() => { toast.success('Currency set to Euros!'); setCurrency('eur') }} className={`p-2 ${currency === 'eur' ? 'text-yellow-500' : 'text-white'}`}>
                        <AiOutlineEuro size={24} />
                    </button>
                </div>
            </div>

            {/* Chart */}
            <div className="mb-8">
                <Chart arr={chartArray} currency={currencySymbol} days={days} />
            </div>

            {/* Chart Range Buttons */}
            <div className="mb-8">
                <div className="flex space-x-4">
                    {btns.map((i) => (
                        <button key={i} onClick={() => switchChartStats(i)} className={`px-4 py-2 bg-gray-700 rounded ${days === i ? 'bg-yellow-500' : 'hover:bg-gray-600'}`}>
                            {i}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Bars */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold font-sans mb-2">Price Information</h2>
                <div className="space-y-4 font-mono">
                    <div>
                        <span className="flex items-center text-xl font-medium">
                            <AiOutlineBarChart className="mr-2 text-yellow-400" /> Current Price: {currencySymbol}{currentPrice.toLocaleString()}
                        </span>
                        <div className="w-full bg-gray-700 rounded-lg h-3 mt-2">
                            <div className="bg-yellow-500 h-3 rounded-lg" style={{ width: `${currentWidth}px` }}></div>
                        </div>
                    </div>
                    <div>
                        <span className="flex items-center text-xl font-medium">
                            <AiOutlineRise className="mr-2 text-green-400" /> All-Time High (ATH): {currencySymbol}{athPrice.toLocaleString()}
                            {athChangePercentage > 0 ?
                                <p className="text-green-500 flex items-center">(<AiOutlineArrowUp />{athChangePercentage.toFixed(2)}%)</p> :
                                <p className="text-red-500 flex items-center">(<AiOutlineArrowDown />{athChangePercentage.toFixed(2)}%)</p>
                            }
                        </span>
                        <div className="w-full bg-gray-700 rounded-lg h-3 mt-2">
                            <div className="bg-green-500 h-3 rounded-lg" style={{ width: `${athWidth}px` }}></div>
                        </div>
                        <p className="text-sm text-gray-400">Date Achieved: {athDate}</p>
                    </div>
                    <div>
                        <span className="flex items-center text-xl font-medium">
                            <AiOutlineFall className="mr-2 text-red-400" /> All-Time Low (ATL): {currencySymbol}{atlPrice.toLocaleString()}
                            {atlChangePercentage > 0 ?
                                <p className="text-green-500 flex items-center">(<AiOutlineArrowUp />{atlChangePercentage.toFixed(2)}%)</p> :
                                <p className="text-red-500 flex items-center">(<AiOutlineArrowDown />{atlChangePercentage.toFixed(2)}%)</p>
                            }
                        </span>
                        <div className="w-full bg-gray-700 rounded-lg h-3 mt-2">
                            <div className="bg-red-500 h-3 rounded-lg" style={{ width: `${atlWidth}px` }}></div>
                        </div>
                        <p className="text-sm text-gray-400">Date Achieved: {atlDate}</p>
                    </div>
                </div>
            </div>

            {/* Market Cap and FDV Ratio */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold font-sans mb-2">Market Information</h2>
                <div className="text-xl font-mono">
                    <p>Market Cap / FDV Ratio: {marketCapFdvRatio}</p>
                    <p>Last Updated: {lastUpdated}</p>
                </div>
            </div>

            {/* External Links */}
            <div className="mt-8">
                <a
                    href={coin.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-blue-400 hover:text-blue-600"
                >
                    Visit {coin.name} Website <FaExternalLinkAlt className="inline ml-2" />
                </a>
            </div>
        </div>
    );
};

export default CoinDetails;
