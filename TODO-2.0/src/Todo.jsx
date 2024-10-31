import React from 'react';
import { AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';

const Todo = ({ text, isDone, toggleIsDone, handleEdit, handleDelete }) => {
    return (
        <div className='flex items-center justify-between bg-gray-100 p-4 rounded-md'>
            {/* Toggle isDone Status */}
            <span className='text-neutral-800 cursor-pointer' onClick={toggleIsDone}>
                {isDone ? (
                    <AiOutlineCheckCircle size={24} className="text-green-500" />
                ) : (
                    <AiOutlineClockCircle size={24} className="text-yellow-500" />
                )}
            </span>

            {/* Text with conditional styles for line-through and opacity */}
            <span className={`text-neutral-800 ${isDone ? 'line-through opacity-50' : ''} truncate max-w-[150px]`}>
                {text}
            </span>

            {/* Edit and Delete Buttons */}
            <div className='flex space-x-2'>
                <button className='bg-yellow-500 text-white px-4 py-1 rounded-md' onClick={handleEdit}>Edit</button>
                <button className='bg-red-500 text-white px-4 py-1 rounded-md' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Todo;
