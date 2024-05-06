import React from 'react'

const Header = ({activeUser}) => {
    return (
        <div className='w-2/3 flex px-5 absolute top-20 bg-white rounded-lg translate-x-12 p-2 border border-gray-400 gap-5'>
            <img className='h-[48px] max-sm:h-[30px] rounded-full self-center' src={activeUser.image}></img>
            <span className="self-center">
                <h1 className="h-fit text-lg font-bold self-center">{activeUser.name}</h1>
                <p className="text-xs text-gray-400">{activeUser.email}</p>
            </span>
        </div>
    )
}

export default Header
