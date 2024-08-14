
import './App.css'
import Board from './components/Board'

function App() {

  return (
    <div className='min-h-screen max-w-screen-2xl m-auto bg-gray-50 container'>
      <header className='border-b-2 bg-white text-gray-950 flex flex-col justify-center items-center w-full p-5'>
        <h1 className='text-center text-4xl font-black  '>
          Kanban board dnd-kit
        </h1>
        <div className="copyright">
          &copy; 2024 Kelvin Nguyen | Nguyen Phuoc Loc
        </div>
      </header>
      <Board />

    </div>
  )
}

export default App
