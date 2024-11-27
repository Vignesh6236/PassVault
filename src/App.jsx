import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'

function App() {

  return (
    <div className='bg-gradient-to-r from-teal-300 via-green-300 to-teal-300 h-screen overflow-hidden'>
      <Navbar />
      <Manager />
    </div>
  )
}

export default App
