import React from "react";
import Side_Nav from "../Side_Nav";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Provider_Info = () => {
  return (
    <div className="w-full h-screen flex flex-row">
      <Side_Nav />
      <div className="w-[84%] h-full flex items-center justify-center ">
        <div className="w-[60%] h-[85%] flex flex-col gap-6 rounded-2xl bg-[#1E1E1E] py-5 px-5">
          <div className="text-white gap-5 flex items-end ">
            <img src="\src\assets\person.png" alt="" width={40} />
            <h1 className="text-2xl font-bold">ROHAN JOSHI</h1>
            <p className="opacity-75">+91123456789</p>
          </div>
          <div className="w-[75%]">
            <p className="text-white text-lg">
              ADD: Sai Suman Complex, Near Akurdi Railway Station, Akurdi, Pune,
              Maharashtra 411035, India.
            </p>
          </div>
          <div className="flex gap-2">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold">Price : 200/Hr</h1>
          {/*BOOKING SLOTS*/}
          <div className="flex flex-col justify-center ">
            <h1 className="text-white text-4xl font-semibold text-center mb-5">Booking Slots</h1>
            <div className="select mb-8">
                 <select name="format" id="format" className="w-32 h-10 bg-white text-black font-bold">
                    <option value="" disabled selected className="text-white">Date</option>
                        <option>
                            For Today
                        </option>
                        <option>
                            For Tomorrow
                        </option>
                        
                    </select>
            </div>
            {/*SLOTS*/}
            <div className="grid grid-cols-3 grid-rows-2 gap-8">
                <div className="p-3 border-4 border-zinc-600 w-[200px] text-zinc-600 text-center font-bold">
                    <p>9:00 am - 10:00 am</p>
                </div>
                <div className="p-3 border-4 border-white w-[200px] text-white text-center font-bold">
                    <p>10:00 am - 11:00 am</p>
                </div>
                <div className="p-3 border-4 border-white w-[200px] text-white text-center font-bold">
                    <p>11:00 am - 12:00 pm</p>
                </div>
                <div className="p-3 border-4 border-white w-[200px] text-white text-center font-bold">
                    <p>12:00 am - 1:00pam</p>
                </div>
                <div className="p-3 border-4 border-zinc-600 w-[200px] text-zinc-600 text-center font-bold">
                    <p>1:00 am - 2:00 pm</p>
                </div>
                <div className="p-3 border-4 border-[#509B6F] w-[200px] text-[#509B6F] text-center font-bold">
                    <p>2:00 pm - 3:00 pm</p>
                </div>

            </div>
          </div>
          <Link className="bg-[#509B6F] w-32 px-2 text-center py-3 rounded-xl self-center">
            <h1 className="text-white font-semibold text-xl tracking-wider">Proceed</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Provider_Info;
