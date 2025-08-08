<script setup>
import { ref, defineModel } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import NotificationMessage from './NotificationMessage.vue';

const auth = useAuthStore();
const router = useRouter();
const email = defineModel('email');
const password = defineModel('password');
const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
const signIn = async () => {
  await auth.login({ email: email.value, password: password.value });
  if (auth.isAuthenticated) setTimeout(() => router.push('/dashboard'), 2500);
};
</script>

<template>
  <div class="login-card">
    <form @submit.prevent="signIn" action="POST">
      <h4 class="login-title">Login</h4>
      <div>
        <label class="login-label" for="email">Email</label>
        <input
          v-model="email"
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
          v-model="password"
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
        <button :disabled="auth.isLoading" type="submit" class="login-button">Sign in</button>
      </div>
    </form>
    <NotificationMessage v-show="auth.isNotificationVisible" :notification="auth.notification" />
  </div>
</template>

<style scoped>
.login-card {
  background-color: white;
  width: 20%;
  padding: 2rem 2.5rem;
}

.login-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  text-align: center;
}

.login-label {
  display: inline-block;
  margin-bottom: var(--margin-md);
}

.login-input {
  box-sizing: border-box;
  width: 100%;
  padding: var(--padding-md) var(--padding-lg);
  border: 1px solid var(--color-border);
}

.login-link {
  display: inline-block;
  font-weight: 500;
  text-decoration: none;
  color: var(--color-text);
}

.login-button {
  width: 100%;
  background-color: var(--color-primary);
  padding: var(--padding-md) 0;
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
}

.login-title,
.login-input,
.login-link {
  margin-bottom: var(--margin-xl);
}

.login-card,
.login-input,
.login-button {
  border-radius: var(--radius-lg);
}

.login-password-button,
.login-button {
  font-weight: 600;
  cursor: pointer;
}

.login-password-button,
.login-button,
.login-link,
.login-label {
  font-size: var(--font-size-sm);
}
.login-button[disabled] {
  cursor: not-allowed;
}
</style>
