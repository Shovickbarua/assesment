import { BrowserRouter, Routes, Route, Link } from 'react-router'
import TaskForm from './pages/TaskForm';
import TaskList from './pages/TaskList';

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <nav className="flex p-4">
          <Link to="/create" className="border p-2 rounded bg-blue-500 text-white">
            Create Task
            </Link>
            <Link to="/list" className="border p-2 rounded bg-green-500 text-white">
              Task List
            </Link>
        </nav>
        <Routes>
          <Route path="/create" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
          <Route path="/list" element={<TaskList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;