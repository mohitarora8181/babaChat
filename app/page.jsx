'use client'
import { useEffect, useState, useRef } from 'react'
import { IoSend } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    socket.on("newUser",(id)=>{
      toast("New user joined")
      console.log("user connected",id);
    });
    socket.on("receive-message", (data) => {
      setList(list => [...list, { message: data.message, recv: true }]);
    });
  }

  function handleSend(e) {
    e.preventDefault();
    if (!message) { return }
    socket.emit("send-message", {
      message
    });
    setList(list => [...list, { message, recv: false }]);
    setMessage("");
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend(e);
    }
  }

  return (
    <>
      <div className="h-screen w-screen bg-white flex flex-col justify-end" >
        <div className='w-full overflow-y-scroll scrollbar-thin'>
          <ul className="scroll-smooth flex flex-col" ref={ref}>
            {
              list.map((ele, index) => {
                return <li className={`w-1/3 max-sm:w-1/2 whitespace-pre-line break-words max-sm:mx-[1.5rem] mx-[7rem] p-5 max-sm:p-2 my-2 rounded-lg rounded-tl-xl rounded-br-xl ${ele.recv ? "self-start bg-green-200" : "self-end bg-gray-200"}`}
                  key={index}>{ele.message}<br /></li>
              })
            }
          </ul>
        </div>
        <form className='flex justify-center h-[6rem]'>
          <div className=' w-11/12 max-sm:w-full p-5 flex justify-between'>
            <textarea className='border scrollbar-none border-black border-opacity-10 resize-none outline-none w-full p-3 rounded-md align-middle shadow-lg shadow-gray-100'
              type='text'
              value={message}
              onChange={(e) => { setMessage(e.target.value) }} placeholder='Type a message ...'
              onKeyDown={handleKeypress}
            ></textarea>
            <div className={`px-3 mx-2 cursor-pointer border-none bg-green-500 rounded-lg ${message ? "opacity-100" : "opacity-50"} hover:opacity-50 flex justify-center gap-x-2`} onClick={handleSend}>
              <button className=' text-white select-none'>Send</button>
              <IoSend className='self-center text-white select-none' />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Home
