import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from "./layout/DefaultLayout.jsx"
import './App.css'
import Home from './pages/Home.jsx'
import Cerca from './pages/Cerca.jsx'
import Film from './pages/Film.jsx'
import NotFound from './pages/NotFound.jsx'
import { WatchListProvider } from './context/WatchListContext.jsx'
import WatchList from './pages/WatchList.jsx'

function App() {

  return (
    <>
      <WatchListProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route element={<DefaultLayout />}>
              <Route path='/watchlist' element={<WatchList />} />
              <Route path='/film/:id' element={<Film />} />
              <Route path='/search' element={<Cerca />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WatchListProvider>

    </>
  )
}

export default App
