<template>
  <form class="user-form" @submit.prevent="$emit('submit', form)">
    <div>
      <label for="name">Nom</label>
      <input id="name" v-model="form.name" required aria-required="true" />
    </div>
    <div>
      <label for="email">Email</label>
      <input id="email" v-model="form.email" type="email" required aria-required="true" />
    </div>
    <div>
      <label for="role">Rôle</label>
      <select id="role" v-model="form.role" required aria-required="true">
        <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
      </select>
    </div>
    <div class="form-actions">
      <button class="btn-primary" type="submit">{{ submitLabel }}</button>
      <button class="btn-secondary" type="button" @click="$emit('cancel')">Annuler</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "UserForm",
  props: {
    user: Object,
    roles: Array,
    submitLabel: {
      type: String,
      default: "Enregistrer"
    }
  },
  data() {
    return {
      form: this.user ? { ...this.user } : { name: '', email: '', role: '' }
    };
  },
  watch: {
    user(newUser) {
      this.form = newUser ? { ...newUser } : { name: '', email: '', role: '' };
    }
  }
};
</script>

<style scoped>
.user-form {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 400px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,138,155,0.07);
  padding: 24px;
}
label {
  font-weight: bold;
  color: #008a9b;
  margin-bottom: 4px;
}
input, select {
  padding: 10px;
  border: 1px solid #e4e9f2;
  border-radius: 6px;
  font-size: 1em;
  margin-top: 2px;
  margin-bottom: 8px;
  width: 100%;
  transition: border 0.2s;
}
input:focus, select:focus {
  border: 1.5px solid #008a9b;
  outline: none;
}
.form-actions {
  display: flex;
  gap: 10px;
}
.btn-primary {
  background: linear-gradient(90deg, #008a9b 0%, #ffd600 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.btn-primary:hover, .btn-primary:focus {
  background: #ffd600;
  color: #008a9b;
}
.btn-secondary {
  background: #008a9b;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.btn-secondary:hover, .btn-secondary:focus {
  background: #ffd600;
  color: #008a9b;
}
@media (max-width: 600px) {
  .user-form {
    padding: 8px;
  }
  input, select {
    font-size: 0.95em;
    padding: 7px;
  }
}
</style>
