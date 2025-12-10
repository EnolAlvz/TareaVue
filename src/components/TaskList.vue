<template>
  <div class="task-list">
    <h2>Mis Tareas ({{ tasks.length }})</h2>
    
    <div class="filter-buttons">
      <button 
        @click="filterStatus = 'todas'"
        :class="{ active: filterStatus === 'todas' }"
      >
        Todas
      </button>
      <button 
        @click="filterStatus = 'pendientes'"
        :class="{ active: filterStatus === 'pendientes' }"
      >
        Pendientes
      </button>
      <button 
        @click="filterStatus = 'completadas'"
        :class="{ active: filterStatus === 'completadas' }"
      >
        Completadas
      </button>
    </div>

    <div v-if="filteredTasks.length === 0" class="no-tasks">
      <p>No hay tareas para mostrar</p>
    </div>

    <div v-else class="tasks-container">
      <div 
        v-for="task in filteredTasks" 
        :key="task.id"
        class="task-item"
        :class="{ completed: task.completed, [task.priority]: true }"
      >
        <div class="task-header">
          <input 
            type="checkbox" 
            :checked="task.completed"
            @change="$emit('toggle', task.id)"
            class="task-checkbox"
          />
          <h3 class="task-title">{{ task.title }}</h3>
          <span class="priority-badge">{{ capitalizeFirst(task.priority) }}</span>
        </div>
        
        <p v-if="task.description" class="task-description">{{ task.description }}</p>
        
        <div class="task-footer">
          <small>{{ formatDate(task.createdAt) }}</small>
          <div class="task-actions">
            <button class="btn-edit" @click="$emit('edit', task)">Editar</button>
            <button class="btn-delete" @click="$emit('delete', task.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      filterStatus: 'todas'
    };
  },
  computed: {
    filteredTasks() {
      if (this.filterStatus === 'pendientes') {
        return this.tasks.filter(t => !t.completed);
      } else if (this.filterStatus === 'completadas') {
        return this.tasks.filter(t => t.completed);
      }
      return this.tasks;
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    capitalizeFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
};
</script>

<style scoped>
.task-list {
  margin-top: 20px;
}

h2 {
  color: #333;
  margin-bottom: 15px;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-buttons button {
  padding: 8px 15px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-buttons button.active {
  border-color: #007bff;
  background-color: #007bff;
  color: white;
}

.filter-buttons button:hover {
  border-color: #007bff;
}

.no-tasks {
  text-align: center;
  padding: 30px;
  color: #999;
  background: #f9f9f9;
  border-radius: 4px;
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-item {
  background: white;
  border-left: 4px solid #ffc107;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: opacity 0.3s;
}

.task-item.completed {
  opacity: 0.6;
  background: #f5f5f5;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #999;
}

.task-item.alta {
  border-left-color: #dc3545;
}

.task-item.normal {
  border-left-color: #007bff;
}

.task-item.baja {
  border-left-color: #28a745;
}

.task-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-title {
  flex: 1;
  margin: 0;
  color: #333;
}

.priority-badge {
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.task-item.alta .priority-badge {
  background-color: #dc3545;
}

.task-item.normal .priority-badge {
  background-color: #007bff;
}

.task-item.baja .priority-badge {
  background-color: #28a745;
}

.task-description {
  color: #666;
  margin: 8px 0 10px 30px;
  font-size: 14px;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

small {
  color: #999;
  font-size: 12px;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-delete {
  padding: 5px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}

.btn-edit {
  background-color: #007bff;
  color: white;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}
</style>
