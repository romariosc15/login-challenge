<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { mockedFetch } from '@/utils/fetch';
const router = useRouter();
const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
const signIn = () => {
  const response = mockedFetch('/api/auth/login');
  if (response.type === 'success') {
    router.push('/dashboard');
  }
};
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
  display: inline-block;
  margin-bottom: 0.5rem;
}

.login-input {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 1rem;
  padding: var(--padding-sm) var(--padding-md);
  border-radius: 0.25rem;
  border: 1px solid var(--color-border);
}

.login-link {
  display: inline-block;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--color-text);
}

.login-button {
  width: 100%;
  background-color: var(--color-primary);
  padding-top: var(--padding-sm);
  padding-bottom: var(--padding-sm);
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
  position: absolute;
  right: 1.25rem;
  bottom: 28px;
  background: none;
  cursor: pointer;
}

.login-password-button,
.login-button,
.login-link,
.login-label {
  font-size: var(--font-size-sm);
}
</style>
