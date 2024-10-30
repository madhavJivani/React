// Todo.js
import React from 'react';
import { FaTrash, FaEdit, FaSave, FaTimes, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const Todo = ({
    text,
    isDone,
    index,
    isEditing,
    editText,
    onToggle,
    onDelete,
    onEdit,
    onSaveEdit,
    onCancelEdit,
    onEditTextChange
}) => {
    return (
        <div className={`flex items-center justify-between p-4 rounded bg-gray-700 ${isDone ? 'opacity-70' : 'opacity-100'}`}>
            <div className="flex items-center">
                <span className="font-semibold mr-2">{index + 1}.)</span>

                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={onEditTextChange}
                        className="bg-gray-800 text-gray-200 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ) : (
                    <p className={`${isDone ? 'line-through text-gray-200' : 'text-white'}`}>{text}</p>
                )}
            </div>

            <div className="flex items-center space-x-4">
                {/* Display "Completed" or "Pending" label with icons */}
                <div onClick={onToggle} className="flex items-center cursor-pointer">
                    {isDone ? (
                        <>
                            <FaCheckCircle className="text-green-500 mr-1" />
                            <span className="text-green-500 font-semibold">Completed</span>
                        </>
                    ) : (
                        <>
                            <FaHourglassHalf className="text-yellow-500 mr-1" />
                            <span className="text-yellow-500 font-semibold">Pending</span>
                        </>
                    )}
                </div>

                {/* Edit/Delete buttons */}
                {isEditing ? (
                    <>
                        <button onClick={onSaveEdit} className="text-green-500 hover:text-green-700">
                            <FaSave />
                        </button>
                        <button onClick={onCancelEdit} className="text-red-500 hover:text-red-700">
                            <FaTimes />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={onEdit} className="text-yellow-500 hover:text-yellow-700">
                            <FaEdit />
                        </button>
                        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
                            <FaTrash />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Todo;
