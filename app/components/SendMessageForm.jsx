import { IoSend } from "react-icons/io5";
import { useSession } from "next-auth/react";

const SendMessageForm = ({ message, sendButton, setMessage, handleKeypress, handleSend }) => {
    const { data: session } = useSession();

    if (session) {
        return (
            <form className='flex justify-center h-[6rem] max-sm:h-[5.7rem]'>
                <div className=' w-11/12 max-sm:w-full max-sm:px-3 p-5 flex justify-between'>
                    <textarea className='border text-black placeholder-gray-400 scrollbar-none border-black border-opacity-10 resize-none outline-none w-full p-3 pl-6 rounded-full align-middle shadow-lg shadow-gray-100'
                        type='text'
                        value={message}
                        ref={sendButton}
                        autoFocus
                        onChange={(e) => { setMessage(e.target.value) }} placeholder='Type a message.....'
                        onKeyDown={handleKeypress}
                    ></textarea>
                    <div className={`px-3 self-center -ml-20 mx-2 w-[3rem] h-[3rem] max-sm:h-[2.5rem] max-sm:w-[2.5rem] cursor-pointer border-none bg-green-500 rounded-full ${message ? "opacity-100" : "opacity-50"} hover:opacity-50 flex justify-center gap-x-2`} onClick={handleSend}>
                        <button className=' text-white select-none'>
                            <IoSend className='self-center text-white select-none' />
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default SendMessageForm
