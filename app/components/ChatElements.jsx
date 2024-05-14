const ChatElements = ({ list }) => {
    return (
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
                <p className={`text-sm ${ele.sender.name === "Me" ? " text-end" : " text-start"}`}>{ele.time}</p>
            </li>
        })
    )
}

export default ChatElements
