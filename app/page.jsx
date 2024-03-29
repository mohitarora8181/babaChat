'use client'
import { useEffect, useState, useRef } from 'react'
import { IoSend } from "react-icons/io5";
import io from 'socket.io-client';

let socket;
const Home = () => {
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView()
  }, [list])

  useEffect(() => {
    socketInitializer();

  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data) => {
      setList(list => [...list, { message: data.message, recv: true }]);
    });
  }

  function handleSend(e) {
    if (e.target.value != "") {
      e.preventDefault();
      socket.emit("send-message", {
        message
      });
      setList(list => [...list, { message, recv: false }]);
      setMessage("");
    }
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend(e);
    }
  }

  return (
    <div className="h-[90vh] w-screen bg-white flex flex-col justify-end" >
      <div className='w-full overflow-y-scroll'>
        <ul className="scroll-smooth flex flex-col" ref={ref}>
          {
            list.map((ele, index) => {
              return <li className={`w-1/3 whitespace-pre-line break-words ml-[7rem] p-5 my-2 mr-[7rem] rounded-lg rounded-tl-xl rounded-br-xl ${ele.recv ? "self-start bg-green-200" : "self-end bg-gray-200"}`}
                key={index}>{ele.message}<br /></li>
            })
          }
        </ul>
      </div>
      <form className='flex justify-center h-[6rem]'>
        <div className=' w-11/12 p-5 flex justify-between'>
          <textarea className='border border-black border-opacity-10 resize-none outline-none w-full p-3 rounded-md align-middle shadow-lg shadow-gray-100'
            type='text'
            value={message}
            onChange={(e) => { setMessage(e.target.value) }} placeholder='Type a message ...'
            onKeyDown={handleKeypress}
          ></textarea>
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
