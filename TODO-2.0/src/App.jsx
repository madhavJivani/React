import React, { useState, useEffect, useRef } from 'react';
import Todo from "./Todo"

import "./scroll.css"

const App = () => {
  const [todo, setTodo] = useState({ text: "", isDone: false })
  const [list, setList] = useState([])
  const [pending, setPending] = useState(false)
  const inputRef = useRef(null); // Create a ref for the input
  const handleAdd = () => {
    setList([...list, todo])
    setTodo({ text: "", isDone: false })
  }

  const toggleIsDone = (idx) => {
    let newList = [...list];
    newList[idx].isDone = !newList[idx].isDone;
    setList(newList)
  }
  const handleDelete = (idx) => {
    setList(list.filter((_, index) => index !== idx));
  }

  const handleEdit = (idx) => {
    // console.log("edit click", idx, list[idx].text);
    setTodo({ ...todo, text: list[idx].text })
    handleDelete(idx)
  }


  useEffect(() => {
    // Add event listener for keydown
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleAdd();
      }
      else if (event.key === 'Tab') {
        event.preventDefault(); // Prevent default tab behavior
        inputRef.current.focus(); // Set focus to the input
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [todo]); // Re-run if 'todo' state changes to add the latest 'todo' on Enter


  return (
    <div className='bg-emerald-950 mx-auto h-[90vh] w-screen flex items-center justify-center'>
      <div className='bg-lime-400 hover:bg-lime-500 hover:scale-105 hover:duration-500 p-6 text-pretty font-semibold rounded-xl flex flex-col items-center space-y-4 w-[50vw]'>

        {/* Heading */}
        <h2 className='text-neutral-800 text-center text-2xl hover:text-neutral-900'>IPanel</h2>

        {/* Input and Add Button */}
        <div className="flex space-x-2 w-full justify-center">
          <input
            type="text"
            ref={inputRef} // Attach the ref here
            className="border-neutral-800 rounded-md px-2 py-1 w-3/4 text-neutral-800 border-4"
            placeholder="Enter text"
            value={todo.text}
            onChange={(e) => { setTodo({ ...todo, text: e.target.value }) }}
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md" onClick={handleAdd}>Add</button>
        </div>

        {/* Blank Space */}
        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-md shadow-md">
          <p className='text-neutral-800 font-medium'>Pending only</p>
          <div
            className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${pending ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            onClick={() => setPending(!pending)}
          >
            {/* Toggle Circle */}
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${pending ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
          </div>
        </div>



        <div className='h-4'></div>

        {/* Display Section */}
        <div className='w-full space-y-4 overflow-y-auto max-h-80 p-4 scroll-auto custom-scrollbar'>
          {list.map((item, index) => { return (!pending || !item.isDone) && <Todo text={item.text} isDone={item.isDone} key={index} toggleIsDone={() => { toggleIsDone(index) }} handleEdit={() => { handleEdit(index) }} handleDelete={() => { handleDelete(index) }} /> })}
        </div>
      </div>
    </div>
  )
}

export default App;
