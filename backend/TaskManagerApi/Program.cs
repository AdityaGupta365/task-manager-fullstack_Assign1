using Microsoft.AspNetCore.Mvc;
using TaskManagerApi.Models;
using TaskManagerApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddSingleton<ITaskService, TaskService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

// Map endpoints
app.MapGet("/api/tasks", (ITaskService taskService) =>
{
    return Results.Ok(taskService.GetAllTasks());
})
.WithName("GetTasks")
.WithOpenApi();

app.MapGet("/api/tasks/{id}", (int id, ITaskService taskService) =>
{
    var task = taskService.GetTaskById(id);
    return task != null ? Results.Ok(task) : Results.NotFound();
})
.WithName("GetTaskById")
.WithOpenApi();

app.MapPost("/api/tasks", ([FromBody] CreateTaskRequest request, ITaskService taskService) =>
{
    if (string.IsNullOrWhiteSpace(request.Description))
    {
        return Results.BadRequest("Description is required");
    }

    var task = taskService.CreateTask(request.Description);
    return Results.Created($"/api/tasks/{task.Id}", task);
})
.WithName("CreateTask")
.WithOpenApi();

app.MapPut("/api/tasks/{id}", (int id, [FromBody] UpdateTaskRequest request, ITaskService taskService) =>
{
    var task = taskService.UpdateTask(id, request.Description, request.IsCompleted);
    return task != null ? Results.Ok(task) : Results.NotFound();
})
.WithName("UpdateTask")
.WithOpenApi();

app.MapDelete("/api/tasks/{id}", (int id, ITaskService taskService) =>
{
    var result = taskService.DeleteTask(id);
    return result ? Results.NoContent() : Results.NotFound();
})
.WithName("DeleteTask")
.WithOpenApi();
// Use PORT environment variable for deployment
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.Run($"http://0.0.0.0:{port}");
// app.Run();