import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from "./layout/DefaultLayout.jsx"
import './App.css'
import Home from './pages/Home.jsx'
import Cerca from './pages/Cerca.jsx'
import Film from './pages/Film.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/film/:id' element={<Film />} />
          <Route element={<DefaultLayout />}>
            <Route path='/search' element={<Cerca />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
