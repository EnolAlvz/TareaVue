export class Task {
  constructor(id, title, description = '', completed = false, priority = 'normal') {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.priority = priority;
    this.createdAt = new Date();
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  updateTask(title, description, priority) {
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
}
