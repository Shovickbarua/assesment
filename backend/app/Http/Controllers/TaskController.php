<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Traits\CommonTrait;

class TaskController extends Controller
{
    use CommonTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $tasks = Task::all();
            return $this->sendResponse(['tasks' => $tasks, 'message' => 'Tasks fetched successfully.']);
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while fetching tasks.', 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:pending,in_progress,completed',
        ]);
        try {
            $task = Task::create($request->all());
            return $this->sendResponse(['task' => $task, 'message' => 'Task created successfully.'], 201);
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while creating the task.', 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        try {
            $task = Task::find($id);
            if (!$task) {
                return $this->sendError('Task not found.', 404);
            }
            return $this->sendResponse(['task' => $task, 'message' => 'Task fetched successfully.']);
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while fetching the task.', 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        try {
            $task = Task::find($id);
            if (!$task) {
                return $this->sendError('Task not found.', 404);
            }
            $task->update($request->all());
            return $this->sendResponse(['task' => $task, 'message' => 'Task updated successfully.']);
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while updating the task.', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $task = Task::find($id);
            if (!$task) {
                return $this->sendError('Task not found.', 404);
            }
            $task->delete();
            return $this->sendResponse(['message' => 'Task deleted successfully.']);
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while deleting the task.', 500);
        }
    }
}
