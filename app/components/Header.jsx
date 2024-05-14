import React, { useEffect, useRef } from 'react'


const Header = ({ activeUser, chatDates, setPerfectDate, today }) => {

    let options = [];

    if (chatDates) {
        chatDates.forEach(doc => {
            options.push(doc.id);
        });
        if (!options.find((ele) => ele == today)) {
            options.unshift(today);
        }
    }

    const changeDate = (e) => {
        setPerfectDate(e.target.value);
    }

    useEffect(() => {
        setPerfectDate(today);
    }, [activeUser])

    return (
        <div className={`flex max-sm:flex-col w-[65%] max-sm:w-[90%] justify-between align-middle px-5 absolute top-20 bg-white rounded-lg translate-x-12 max-sm:translate-x-4 p-2 border border-gray-400 gap-5`}>
            <div className='flex gap-5' onClick={() => { console.log(today); setDefaultDate(today) }}>
                <img className='h-[48px] max-sm:h-[30px] rounded-full self-center' src={activeUser.image}></img>
                <span className="self-center">
                    <h1 className="h-fit text-lg font-bold self-center">{activeUser.name}</h1>
                    <p className="text-xs text-gray-400">{activeUser.email}</p>
                </span>
            </div>

            <select className='self-center outline-none cursor-pointer border border-gray-200 p-2' defaultValue={today} onChange={(e) => changeDate(e)}>
                {options.map((e)=>{
                    return <option className='bg-gray-200' key={e}>{e}</option>
                })}
            </select>
        </div>
    )
}

export default Header
