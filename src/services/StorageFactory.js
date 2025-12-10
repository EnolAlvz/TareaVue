import { Task } from '../models/Task.js';

// Clase abstracta (simulada)
export class StorageFactory {
  getTasks() {
    throw new Error('getTasks() debe ser implementado');
  }

  addTask(task) {
    throw new Error('addTask() debe ser implementado');
  }

  deleteTask(id) {
    throw new Error('deleteTask() debe ser implementado');
  }

  updateTask(id, task) {
    throw new Error('updateTask() debe ser implementado');
  }
}

// Implementación con LocalStorage
export class LocalStorageFactory extends StorageFactory {
  constructor() {
    super();
    this.key = 'tasks_app';
    this.initializeTasks();
  }

  initializeTasks() {
    if (!localStorage.getItem(this.key)) {
      localStorage.setItem(this.key, JSON.stringify([]));
    }
  }

  getTasks() {
    const tasks = JSON.parse(localStorage.getItem(this.key)) || [];
    return tasks.map(t => {
      const task = new Task(t.id, t.title, t.description, t.completed, t.priority);
      task.createdAt = new Date(t.createdAt);
      return task;
    });
  }

  addTask(task) {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  deleteTask(id) {
    const tasks = this.getTasks().filter(t => t.id !== id);
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  updateTask(id, updatedTask) {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem(this.key, JSON.stringify(tasks));
    }
  }
}
