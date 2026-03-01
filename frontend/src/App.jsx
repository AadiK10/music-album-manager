import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AddAlbum from './components/AddAlbum'
import Navbar from './components/Navbar'
import ShowAlbum from './components/ShowAlbum'
import EditAlbum from './components/EditAlbum'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/add' element = {<AddAlbum/>}/>
          <Route path='/show/:id' element = {<ShowAlbum/>}/>
          <Route path='/edit/:id' element = {<EditAlbum/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
