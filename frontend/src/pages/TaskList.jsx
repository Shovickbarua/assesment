import {useEffect, useState} from 'react'
import TaskApi from '../api/TaskApi';
import { Link } from 'react-router';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");

    const fetchTasks = async() => {
        const response = await TaskApi.getTasks();
        console.log(response);
        if (response.success) {
            setTasks(response.data.tasks);
        }
    }

    const deleteTask = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");

        if (confirmDelete) {
            const res = await TaskApi.deleteTask(id);
            console.log('Task:', res);
            if(res.success){
                setMessage(res.data.message);
                fetchTasks();
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);
        
    
  return (
    <div className="overflow-x-auto px-4 md:px-8 mt-6">
        {message && 
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
            <p className="font-bold">{message}</p>
        </div>
        }
        <table className="w-full max-w-7xl mx-auto">
          <thead
            className="text-slate-900 text-left text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
            <tr>
                <th scope="col" className="pl-0 px-3 py-3.5">Title</th>
                <th scope="col" className="px-3 py-3.5">Description</th>
                <th scope="col" className="px-3 py-3.5">Priority</th>
                <th scope="col" className="px-3 py-3.5">Status</th>
                <th scope="col" className="pr-0 px-3 py-3.5">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm divide-y divide-slate-200">
                {tasks.map((task) => (
            <tr>
                <td className="pl-0 px-3 py-4 font-medium text-slate-900 whitespace-nowrap">
                    {task.title}
                </td>
                <td className="px-3 py-4 text-slate-500">
                    {task.description}
                </td>
                
                <td className="px-3 py-4 text-slate-500">
                    {task.priority}
                </td>
                <td className="px-3 py-4 text-slate-500">
                    {task.status}
                </td>
                <td className="pr-0 px-3 py-4 flex gap-3">
                  <Link to={`/edit/${task.id}`}
                      className="text-sm text-blue-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                      aria-label="Edit John Doe">
                      Edit
                  </Link>
                  <button
                      onClick={() => deleteTask(task.id)}
                      className="text-sm text-red-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                      aria-label="Delete John Doe">
                      Delete
                  </button>
                </td>
            </tr>
             ))}
          </tbody>
        </table>
    </div>
  )
}

export default TaskList