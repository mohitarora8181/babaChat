'use client'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
import LoginButton from './components/LoginButton';
import SendMessageForm from './components/SendMessageForm';
import { useSession } from 'next-auth/react';
import ChatElements from './components/ChatElements';
import AllUsers from './components/AllUsers';
import { firestore } from "@firebase";
import { doc, setDoc } from "firebase/firestore";
import Loader from './components/Loader';
import Header from './components/Header';

let socket;
const Home = () => {
  const timestamp = new Date();
  const year = timestamp.getFullYear();
  const month = timestamp.getMonth() + 1;
  const day = timestamp.getDate();
  const today = day.toString() + "-" + month.toString() + "-" + year;

  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);
  const [relation, setRelation] = useState("");
  const [activeUser, setActiveUser] = useState({});
  const [currentUser, setcurrentUser] = useState(null);
  const [chatDates, setChatDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perfectDate, setPerfectDate] = useState(today);
  const ref = useRef(null);
  const sendButton = useRef(null);


  const { data: session } = useSession();

  useEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView()
  }, [list])

  useEffect(() => {
    if (session) {
      if (currentUser == null && session) {
        socketInitializer();
        setcurrentUser(session);
        localStorage.removeItem("relation")
      }
    }
  }, [session])


  async function socketInitializer() {
    await fetch("/api/socket");
    socket = io();
    socket.emit("newUserJoined", (session ? session.user.name : "New"));
    socket.on("newUser", ({ id, name }) => {
      // toast(`${name} Joined`, {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    })
    socket.on("user-disconnected", () => {
      toast(`someone leaved`, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })

    socket.on(`receive-message`, (data) => {
      let relDraft = "";
      if (localStorage.getItem("relation")) {
        relDraft = atob(localStorage.getItem("relation"));
      }
      if (relDraft == data.relation) {
        setList(list => [...list, { message: data.message, recv: true, sender: data.sender }]);
      }
    });
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!message) { return }
    socket.emit("send-message", {
      message,
      sender: session.user,
      relation
    });
    storeinDB(session.user, message);
    setList(list => [...list, { message, recv: false, sender: { name: "Me", image: session.user.image } }]);
    sendButton.current?.focus();
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

  const storeinDB = async (sender, inMessage) => {
    try {
      const document = doc(firestore, relation.toString(), today);
      await setDoc(document, {
        [timestamp.getTime()]: {
          message: inMessage,
          sender,
        }
      }, { merge: true })
    } catch (error) {
      console.log(error);
    }
    if(perfectDate != today){
      setPerfectDate(today);
    }
  }

  return (
    <div className='flex bg-white select-none'>
      <AllUsers setRelation={setRelation} relation={relation} setList={setList} setActiveUser={setActiveUser} setLoading={setLoading} setChatDates={setChatDates} perfectDate={perfectDate} />
      <div className="h-[98vh] pt-44 w-full max-sm:w-screen bg-white flex flex-col justify-end" >
        {relation && <Header activeUser={activeUser} chatDates={chatDates} setPerfectDate={setPerfectDate} today={today}  />}
        <div className={`w-full overflow-y-scroll scrollbar-thin ${perfectDate == today ? "mb-0" :"mb-10"}`}>
          <ul className="scroll-smooth flex flex-col" ref={ref}>
            <ChatElements list={list} />
          </ul>
        </div>
        {
          loading && <Loader />
        }
        <LoginButton />
        {relation && (perfectDate==today) && <SendMessageForm message={message} sendButton={sendButton} setMessage={setMessage} handleKeypress={handleKeypress} handleSend={handleSend} />}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
