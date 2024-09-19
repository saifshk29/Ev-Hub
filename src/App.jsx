import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cars_Selection from './Components/Partials/Cars_Selection';
import Nearby_Charger from  './Components/Partials/Nearby_Charger';
import Provider_Info from './Components/Partials/Provider_Info';
function App() {
 

  return (
    <div className="w-screen overflow-x-hidden h-screen bg-[#333333] flex">
        <Routes>
           <Route path="/" element={<Cars_Selection/>}></Route>
           <Route path="/nearbycars" element={<Nearby_Charger/>}></Route>
           <Route path="/providerinfo" element={<Provider_Info/>}></Route>
        </Routes>
    </div>
  )
}

export default App

