
import './App.css'
import Board from './components/Board'

function App() {

  return (
    <div className='min-h-screen max-w-screen-2xl m-auto bg-gray-50 container'>
      <h1 className='text-center text-4xl font-black p-5 border-b-2 bg-white text-gray-950'>
        Kanban board dnd-kit
      </h1>
      <Board /> 
      
    </div>
  )
}

export default App
