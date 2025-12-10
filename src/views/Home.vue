<template>
  <div class="home-view">
    <div class="container">
      <header class="app-header">
        <h1>📝 Gestor de Tareas</h1>
        <p>Organiza tus tareas de manera sencilla</p>
      </header>

      <main class="app-content">
        <TaskForm 
          :initialData="editingTask"
          :editingId="editingId"
          @submit="handleTaskSubmit"
          @cancel="cancelEdit"
        />

        <TaskList 
          :tasks="tasks"
          @toggle="toggleTaskComplete"
          @edit="startEdit"
          @delete="deleteTask"
        />
      </main>

      <footer class="app-footer">
        <p>Tareas completadas: {{ completedCount }} / {{ tasks.length }}</p>
      </footer>
    </div>
  </div>
</template>

<script>
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';
import { Task } from '../models/Task.js';
import { LocalStorageFactory } from '../services/StorageFactory.js';

export default {
  name: 'Home',
  components: {
    TaskForm,
    TaskList
  },
  data() {
    return {
      tasks: [],
      storage: null,
      editingId: null,
      editingTask: null
    };
  },
  computed: {
    completedCount() {
      return this.tasks.filter(t => t.completed).length;
    }
  },
  mounted() {
    this.storage = new LocalStorageFactory();
    this.loadTasks();
  },
  methods: {
    loadTasks() {
      this.tasks = this.storage.getTasks();
    },
    handleTaskSubmit(formData) {
      if (this.editingId) {
        // Actualizar tarea existente
        const task = this.tasks.find(t => t.id === this.editingId);
        if (task) {
          task.updateTask(formData.title, formData.description, formData.priority);
          this.storage.updateTask(this.editingId, task);
        }
        this.editingId = null;
        this.editingTask = null;
      } else {
        // Crear nueva tarea
        const id = Date.now();
        const newTask = new Task(id, formData.title, formData.description, false, formData.priority);
        this.tasks.push(newTask);
        this.storage.addTask(newTask);
      }
    },
    toggleTaskComplete(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.toggleComplete();
        this.storage.updateTask(id, task);
      }
    },
    startEdit(task) {
      this.editingId = task.id;
      this.editingTask = { ...task };
    },
    cancelEdit() {
      this.editingId = null;
      this.editingTask = null;
    },
    deleteTask(id) {
      if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.storage.deleteTask(id);
      }
    }
  }
};
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.container {
  max-width: 700px;
  margin: 0 auto;
}

.app-header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  padding-top: 20px;
}

.app-header h1 {
  font-size: 2.5em;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.app-header p {
  margin: 10px 0 0 0;
  font-size: 1.1em;
  opacity: 0.9;
}

.app-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.app-footer {
  text-align: center;
  color: white;
  margin-top: 30px;
  padding: 15px;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  font-weight: bold;
}
</style>
