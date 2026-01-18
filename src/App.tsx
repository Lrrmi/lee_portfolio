import { Outlet } from '@tanstack/react-router'

import { Navbar } from './components/Navbar'

function App() {

  return (
    <div className="min-h-screen">
    <Navbar />
    <Outlet />
    </div>
  )
}

export default App
