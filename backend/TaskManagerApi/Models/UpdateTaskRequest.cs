namespace TaskManagerApi.Models;

public class UpdateTaskRequest
{
    public string? Description { get; set; }
    public bool? IsCompleted { get; set; }
}