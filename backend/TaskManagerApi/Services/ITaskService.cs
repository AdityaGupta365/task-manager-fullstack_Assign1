using TaskManagerApi.Models;

namespace TaskManagerApi.Services;

public interface ITaskService
{
    IEnumerable<TaskItem> GetAllTasks();
    TaskItem? GetTaskById(int id);
    TaskItem CreateTask(string description);
    TaskItem? UpdateTask(int id, string? description, bool? isCompleted);
    bool DeleteTask(int id);
}