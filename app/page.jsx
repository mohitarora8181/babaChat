'use client'
import { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import io from 'socket.io-client';

let socket;
const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socketInitializer();

  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data) => {
      console.log(data);
    });
  }

  function handleSend(e) {
    e.preventDefault();

    socket.emit("send-message", {
      message
    });
    setMessage("");
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      handleSend(e);
    }
  }

  return (
    <div className="h-[90vh] w-full bg-white flex flex-col justify-end" >
      <form className='flex justify-center h-[6rem]'>
        <div className=' w-11/12 p-5 flex justify-between'>
          <textarea className='border border-black border-opacity-10 resize-none outline-none w-full p-3 rounded-md align-middle shadow-lg shadow-gray-100' type='text' value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder='Type a message ...' onKeyDown={handleKeypress}></textarea>
          <div className='px-3 mx-2 border-none bg-green-500 rounded-lg hover:opacity-50 flex justify-center gap-x-2'>
            <button type='submit' className=' text-white select-none' onClick={handleSend}>Send</button>
            <IoSend className='self-center text-white select-none' />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Home
