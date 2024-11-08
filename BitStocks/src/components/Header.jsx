import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCoins, FaExchangeAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { FiMenu, FiX } from 'react-icons/fi';
import btcLogo from '../assets/btc.png';


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-gray-800 fixed top-0 w-full z-10 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">

                <div className="text-2xl font-bold tracking-wide">
                    BitStocks
                </div>

                {/* Mobile Menu Icon */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-white text-2xl md:hidden focus:outline-none"
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Navigation Links (Hidden on mobile, visible on larger screens) */}
                <nav className="hidden md:flex space-x-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 transition ${isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                            }  hover:scale-110`
                        }
                    >
                        <FaHome />
                        <span>Home</span>
                    </NavLink>

                    <NavLink
                        to="/coins"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 transition ${isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                            } hover:scale-110`
                        }
                    >
                        <FaCoins />
                        <span>Coins</span>
                    </NavLink>

                    <NavLink
                        to="/exchanges"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 transition ${isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                            } hover:scale-110`
                        }
                    >
                        <FaExchangeAlt />
                        <span>Exchanges</span>
                    </NavLink>
                </nav>

                {/* Notification Button (Visible on larger screens) */}
                <button
                    onClick={() => toast.success('Welcome to BitStocks!')}
                    className="bg-yellow-500 hidden md:inline-block hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                >
                    Notify Me
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <nav className="flex flex-col items-center bg-gray-700 text-gray-300 md:hidden space-y-4 py-4">
                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center space-x-2 transition ${isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                            } hover:scale-105`
                        }
                    >
                        <FaHome />
                        <span>Home</span>
                    </NavLink>

                    <NavLink
                        to="/coins"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center space-x-2 transition ${isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                            } hover:scale-105`
                        }
                    >
                        <FaCoins />
                        <span>Coins</span>
                    </NavLink>

                    <NavLink
                        to="/exchanges"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center space-x-2 transition ${isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                            } hover:scale-105`
                        }
                    >
                        <FaExchangeAlt />
                        <span>Exchanges</span>
                    </NavLink>

                    <button
                        onClick={() => {
                            toast.success('Welcome to BitStocks!');
                            setMenuOpen(false);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Notify Me
                    </button>
                </nav>
            )}
        </header>
    );
};

export default Header;
