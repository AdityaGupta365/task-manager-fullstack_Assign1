using TaskManagerApi.Models;

namespace TaskManagerApi.Services;

public class TaskService : ITaskService
{
    private readonly List<TaskItem> _tasks = new();
    private int _nextId = 1;

    public IEnumerable<TaskItem> GetAllTasks()
    {
        return _tasks;
    }

    public TaskItem? GetTaskById(int id)
    {
        return _tasks.FirstOrDefault(t => t.Id == id);
    }

    public TaskItem CreateTask(string description)
    {
        var task = new TaskItem
        {
            Id = _nextId++,
            Description = description,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };

        _tasks.Add(task);
        return task;
    }

    public TaskItem? UpdateTask(int id, string? description, bool? isCompleted)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return null;

        if (!string.IsNullOrWhiteSpace(description))
        {
            task.Description = description;
        }

        if (isCompleted.HasValue)
        {
            task.IsCompleted = isCompleted.Value;
        }

        return task;
    }

    public bool DeleteTask(int id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return false;

        _tasks.Remove(task);
        return true;
    }
}