<script setup>
import { ref, onMounted } from 'vue';
const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
const signIn = async () => {
  const res = await fetch('/api/auth/login');
  const json = await res.json();
  console.log(json);
};
onMounted(() => {
  window.fetch = async (url) => {
    return {
      ok: true,
      status: 200,
      json: async () => ({ type: 'success', message: 'Signed in successfully', url }),
    };
  };
});
</script>

<template>
  <div class="login-card">
    <form @submit.prevent="signIn" action="POST">
      <h4 class="login-title">Login</h4>
      <div>
        <label class="login-label" for="email">Email</label>
        <input
          required
          placeholder="Enter your email"
          class="login-input"
          id="email"
          name="email"
          type="email"
        />
      </div>
      <div class="password-container">
        <label class="login-label" for="password">Password</label>
        <input
          required
          placeholder="Enter your password"
          class="login-input"
          id="password"
          name="password"
          :type="isPasswordVisible ? 'text' : 'password'"
        />
        <button type="button" @click="togglePasswordVisibility" class="login-password-button">
          {{ isPasswordVisible ? 'Hide' : 'Show' }}
        </button>
      </div>
      <div>
        <a class="login-link" href="#">Forgot password?</a>
        <button type="submit" class="login-button">Sign in</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-card {
  background-color: white;
  width: 20%;
  padding: 2rem 2.5rem;
  border-radius: 1rem;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
}

.login-label {
  font-size: 0.875rem;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.login-input {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  border: 1px solid #f2f0eb;
}

.login-link {
  display: inline-block;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  color: black;
}

.login-button {
  font-size: 0.875rem;
  width: 100%;
  background: #fdc987;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.login-button:hover {
  opacity: 0.85;
}

.password-container {
  position: relative;
}

.login-password-button {
  font-size: 0.875rem;
  position: absolute;
  right: 1.25rem;
  bottom: 28px;
  background: none;
  cursor: pointer;
}
</style>
