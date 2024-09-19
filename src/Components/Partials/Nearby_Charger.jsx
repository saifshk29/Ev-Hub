import React from 'react'
import Side_Nav from '../Side_Nav';
import Card from './Card';

document.title ="Nearby_Charging"
const Nearby_Charger = () => {
  return (
    <div className="w-full h-screen flex flex-row">
        <Side_Nav/>
        <div className="flex flex-col h-full justify-center items-center w-[84%] gap-5">
            {/*Map*/}
            <div className="">
                <img src="src\assets\map.png" alt="" width={750} className="rounded-xl"/>
            </div>
            {/*Nearby Ev Charging Stations*/}
            <div className="h-72 w-[80%]  flex gap-5 overflow-x-auto overflow-y-hidden flex-nowrap">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    </div>
  )
}

export default Nearby_Charger