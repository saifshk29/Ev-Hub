import React from 'react'
import { FaStar } from "react-icons/fa";
import { IoMdNavigate } from "react-icons/io";
import { Link } from "react-router-dom";
const Card = () => {
  return (
    <div className="bg-[#1E1E1E] text-white p-4 rounded-xl shadow-lg flex flex-col justify-evenly w-60 h-72">
        <div className="flex  items-center gap-2">
            <img src="\src\assets\Plug.svg" alt="Plug Icon" className="w-12 mb-4" />
            <h4 className="text-2xl font-semibold mb-2">Rohan Joshi</h4>
        </div>
      
      <div className="w-full flex flex-col">
        <h2 className="mb-2 text-xl font-medium">
          2 km <span className="text-gray-400 font-semibold text-lg">200/Hr</span>
        </h2>
        
        <p className="text-gray-400 mb-4 text-2xl">Akurdi Station</p>
        <div className="flex justify-center mb-4 gap-2">
          
            <FaStar  className="text-yellow-500" />
            <FaStar  className="text-yellow-500" />
            <FaStar  className="text-yellow-500" />
            <FaStar  className="text-yellow-500" />
            <FaStar  className="text-white" />
          
        </div>
        <Link className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        to="/providerinfo">
          <IoMdNavigate className="mr-2" />
          Navigate
        </Link>
      </div>
    </div>
  )
}

export default Card