import React from 'react'
import { IoIosPerson } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";

const Side_Nav = () => {
  return (
    <div className="h-screen w-[16%] bg-[#509B6F] flex flex-col justify-between">
       
        <div className="flex flex-col ">
             {/* LOGO */}
        <div className="w-full h-20 flex  gap-2 justify-center items-center">
            <img src="\src\assets\Logo_dark.png" alt="" height={50} width={50}/>
            <h1 className="text-white font-bold text-2xl">Ev-Charge</h1>
        </div>
        {/* LINKS */}
        <ul className="flex flex-col gap-8 mt-10">
            <li className="text-white flex flex-row w-full h-10 items-center gap-3 text-2xl font-bold opacity-90 ml-5">
                <IoIosPerson/>
                Profile
            </li>
            <li className="text-white flex flex-row w-full h-10 items-center gap-3 text-2xl font-bold opacity-90 ml-5">
                <IoCarSport />
                My Cars
            </li>
            <li className="text-white flex flex-row w-full h-10 items-center gap-3 text-2xl font-bold opacity-90 ml-5">
                <FaHistory />
                History
            </li>
            <li className="text-white flex flex-row w-full h-10 items-center gap-3 text-2xl font-bold opacity-90 ml-5 ">
                <BsFillLightningChargeFill />
                Switch
            </li>
        </ul>
        </div>
        
        {/* USER INFO */}
        <div className="w-full pl-2 pr-2 h-20 border-t-2 border-b-2 flex flex-row items-center">
            {/*Profile Photo*/}
            <div className="w-[30%] text-4xl text-white h-[80%] flex items-center justify-center ">
                <IoIosPerson/>
            </div>
            {/*User Info*/}
            <div className="w-[70%] flex flex-col text-white font-medium">
                <h1 className="text-lg">John Doe</h1>
                <h3>johndoe@gmail.com</h3>
            </div>
        </div>
    </div>
  )
}

export default Side_Nav