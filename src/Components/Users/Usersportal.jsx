import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Viewmore from '../Pages/Viewmore'
import Products from '../Pages/Products'
import Home from '../Pages/Home'
import Navbar from './Navbar'

const Usersportal = () => {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route element={<Home/>} path='/' />
    <Route element={<Products/>} path='/Products' />
    <Route element={<Viewmore/>} path='/Viewmore' />

    </Routes>


    </>
  )
}

export default Usersportal