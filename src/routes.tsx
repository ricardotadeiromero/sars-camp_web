import React from 'react'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List'
import Edit from './pages/Edit'
import Create from './pages/Create'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/cardapio'>
            <Route path='/cardapio' element={<List/>}/>
            <Route path='/cardapio/new' element={<Create/>} />
            <Route path='/cardapio/:id' element={<Edit/>}/>
        </Route>
    </Routes>
  )
}
