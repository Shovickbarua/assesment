import { useState, useEffect } from 'react';
import TaskApi from '../api/TaskApi';
import { useNavigate, useParams } from 'react-router';

const TaskForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setState] = useState({
        title: '',
        description: '',
        priority: '',
        status: ''
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
            setState({
                ...state,
                [name]: value,
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const res = id
                ? await TaskApi.updateTask(id, state)
                : await TaskApi.createTask(state);
            if (res.success) {
                setMessage(res.data.message);
                navigate('/list');
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Unable to create task.';
            setMessage(message);
        }
    }

    const getTask = async (taskId) => {
        const res = await TaskApi.getTaskById(taskId);
        if (res.success) {
            setState(res.data.task);
        }
    }

    useEffect(() => {
        if(id){
            getTask(id);
        }
    }, [id]);

  return (
        <form className="px-4 mt-6" onSubmit={handleSubmit}>
            {message && 
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                <p className="font-bold">{message}</p>
            </div>
            }
            <div className="space-y-4 max-w-sm mx-auto">
                <div>
                    <label for="Title"
                        className="mb-2 text-slate-900 font-medium text-sm inline-block">Title</label>
                    <input type="text" id="Title" name="title" value={state.title} placeholder="Enter task title"  onChange={handleChange}
                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
                </div>
                <div>
                    <label for="Description"
                        className="mb-2 text-slate-900 font-medium text-sm inline-block">Description</label>
                    <textarea id="Description" name="description" value={state.description} placeholder="Enter task description" onChange={handleChange}
                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" ></textarea>
                </div>
                <div>
                    <label for="Priority"
                        className="mb-2 text-slate-900 font-medium text-sm inline-block">Priority</label>
                    <select id="Priority" name="priority" value={state.priority} onChange={handleChange}
                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600">
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div>
                    <label for="Status"
                        className="mb-2 text-slate-900 font-medium text-sm inline-block">Status</label>
                    <select id="Status" name="status" value={state.status}  onChange={handleChange}
                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600">
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type="submit"
                    className="!mt-2 py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Submit</button>
            </div>
        </form>
  )
}

export default TaskForm;