import React from 'react'
import KanbanBoard from './components/Kanban_board'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar/>
      <KanbanBoard />
    </div>
  )
}

export default App