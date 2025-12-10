<template>
  <div class="task-form">
    <h2>{{ editingId ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Título:</label>
        <input 
          v-model="formData.title" 
          type="text" 
          id="title" 
          required
          placeholder="Ej: Comprar leche"
        />
      </div>

      <div class="form-group">
        <label for="description">Descripción:</label>
        <textarea 
          v-model="formData.description" 
          id="description"
          placeholder="Detalles de la tarea..."
        ></textarea>
      </div>

      <div class="form-group">
        <label for="priority">Prioridad:</label>
        <select v-model="formData.priority" id="priority">
          <option value="baja">Baja</option>
          <option value="normal">Normal</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">{{ editingId ? 'Actualizar' : 'Crear' }} Tarea</button>
        <button type="button" class="btn-secondary" @click="resetForm" v-if="editingId">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    initialData: {
      type: Object,
      default: null
    },
    editingId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formData: {
        title: '',
        description: '',
        priority: 'normal'
      }
    };
  },
  watch: {
    initialData(newVal) {
      if (newVal) {
        this.formData = { ...newVal };
      } else {
        this.resetForm();
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.formData);
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        title: '',
        description: '',
        priority: 'normal'
      };
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.task-form {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

h2 {
  margin-top: 0;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.form-actions {
  display: flex;
  gap: 10px;
}

.btn-primary, .btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}
</style>
