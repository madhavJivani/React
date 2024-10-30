// App.js
import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Todo from './components/Todo';

const App = () => {
  const [todo, setTodo] = useState({ text: "", isDone: false });
  const [list, setList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Tracks the index being edited
  const [editText, setEditText] = useState(""); // Holds the new text while editing

  // Add new todo
  const handleAdd = () => {
    if (todo.text) {
      setList([...list, todo]);
      setTodo({ text: "", isDone: false });
    }
  };

  // Toggle isDone status of a todo
  const handleToggle = (index) => {
    setList(list.map((item, i) => (
      i === index ? { ...item, isDone: !item.isDone } : item
    )));
  };

  // Delete a todo by index
  const handleDelete = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  // Start editing mode for a specific todo
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(list[index].text); // Initialize edit text with current todo text
  };

  // Save the edited todo text
  const handleSaveEdit = (index) => {
    setList(list.map((item, i) => (
      i === index ? { ...item, text: editText } : item
    )));
    setEditingIndex(null); // Exit edit mode
    setEditText(""); // Clear edit text state
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="container bg-gray-900 text-white h-screen w-screen flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">iTasks</h1>

      <div id="todoUi" className="flex items-center gap-4 mb-6 w-full max-w-md">
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task..."
          onChange={(e) => setTodo({ ...todo, text: e.target.value })}
          value={todo.text}
        />
        <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleAdd}>Add</button>
      </div>

      <div id="todoList" className="w-full max-w-md space-y-4">
        {list.length === 0 ? (
          <p>No Todos added yet</p>
        ) : (
          list.map((item, index) => (
            <Todo
              key={index}
              text={item.text}
              index={index}
              isDone={item.isDone}
              isEditing={editingIndex === index}
              editText={editText}
              onToggle={() => handleToggle(index)}
              onDelete={() => handleDelete(index)}
              onEdit={() => startEdit(index)}
              onSaveEdit={() => handleSaveEdit(index)}
              onCancelEdit={cancelEdit}
              onEditTextChange={(e) => setEditText(e.target.value)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
