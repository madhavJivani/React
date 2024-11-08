import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorComponent = ({ message = "Something went wrong.", onRetry }) => {
    return (
        <div className="flex flex-col items-center bg-red-100 p-6 rounded-lg shadow-lg max-w-md mx-auto text-center ">
            {/* Icon */}
            <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />

            {/* Error Message */}
            <h2 className="text-xl font-semibold text-red-700 mb-2">
                Oops!
            </h2>
            <p className="text-gray-700 mb-4">
                {message}
            </p>

            {/* Retry Button */}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorComponent;
