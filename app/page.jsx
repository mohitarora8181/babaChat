'use client'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
import LoginButton from './components/LoginButton';
import SendMessageForm from './components/SendMessageForm';
import { useSession } from 'next-auth/react';

let socket;
const Home = () => {
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);
  const [currentUser, setcurrentUser] = useState(null);
  const ref = useRef(null);

  const { data: session } = useSession();

  useEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView()
  }, [list])

  useEffect(() => {
    if (session) {
      if (currentUser == null && session) {
        socketInitializer();
        setcurrentUser(session);
      }
    }
  }, [session])

  async function socketInitializer() {
    await fetch("/api/socket");
    socket = io();
    socket.emit("newUserJoined", (session ? session.user.name : "New"));
    socket.on("newUser", ({ id, name }) => {
      toast(`${name} Joined`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
    socket.on("user-disconnected", () => {
      toast(`User leave`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
    socket.on("receive-message", (data) => {
      setList(list => [...list, { message: data.message, recv: true, sender: data.sender }]);
    });
  }

  function handleSend(e) {
    e.preventDefault();
    if (!message) { return }
    socket.emit("send-message", {
      message,
      sender: session.user
    });
    setList(list => [...list, { message, recv: false, sender: { name: "Me", image: session.user.image } }]);
    setMessage("");
  }

  const handleKeypress = (e) => {
    if (window.screen.width < 500) {
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend(e);
    }
  }

  return (
    <>
      <div className="h-[98vh] pt-20 w-screen bg-white flex flex-col justify-end" >
        <div className='w-full overflow-y-scroll scrollbar-thin'>
          <ul className="scroll-smooth flex flex-col" ref={ref}>
            {
              list.map((ele, index) => {
                return <li className={`w-1/3 max-sm:w-3/5 max-sm:mx-[1.5rem] mx-[7rem] ${ele.recv ? "self-start" : "self-end"}`}
                  key={index}>
                  {
                    list[index - 1] && list[index - 1].sender.name == ele.sender.name ? "" :
                      <div className={`flex gap-x-2 ${ele.recv ? "-ml-14 max-sm:-ml-0 justify-start" : "justify-end"}`}>
                        {ele.sender.name != "Me" && <img className='h-[48px] -ml-3 max-sm:h-[30px] rounded-full self-center' src={ele.sender.image}></img>}
                        <p className={`text-sm font-semibold mx-5 max-sm:mx-1 self-center`}>
                          {ele.sender.name}
                        </p>
                        {ele.sender.name === "Me" && <img className='h-[48px] -mr-14 max-sm:-mr-2 max-sm:h-[30px] rounded-full self-center' src={ele.sender.image}></img>}
                      </div>
                  }
                  <p className={`whitespace-pre-line break-words p-5 max-sm:p-2 my-1 rounded-lg rounded-tl-2xl rounded-br-2xl ${ele.recv ? "self-start bg-gradient-to-br from-green-200 to bg-green-100" : "self-end bg-gradient-to-br from-gray-200 to-gray-100"}`}>{ele.message}</p>
                </li>
              })
            }
          </ul>
        </div>
        <LoginButton />
        <SendMessageForm message={message} setMessage={setMessage} handleKeypress={handleKeypress} handleSend={handleSend} />
      </div>
      <ToastContainer />
    </>
  )
}

export default Home
