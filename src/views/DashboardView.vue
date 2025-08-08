<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const signOut = () => {
  auth.logout();
  if (!auth.isAuthenticated) router.push('/');
};
</script>

<template>
  <main class="main-container">
    <img class="main-image" src="../assets/images/dashboard.png" alt="" />
    <button @click="signOut" type="button" class="logout-button">Sign out</button>
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f2f0eb;
}
.main-image {
  width: 25%;
  margin-bottom: var(--margin-xl);
}
.logout-button {
  font-weight: 600;
  border-radius: var(--radius-lg);
  background-color: var(--color-primary);
  padding: var(--padding-md) var(--padding-lg);
  cursor: pointer;
}

.logout-button:hover {
  opacity: 0.85;
}

@media (max-width: 1280px) {
  .main-image {
    width: 30%;
  }
}

@media (max-width: 1024px) {
  .main-image {
    width: 40%;
  }
}
@media (max-width: 768px) {
  .main-image {
    width: 50%;
  }
}
@media (max-width: 640px) {
  .main-image {
    width: 90%;
  }
}
</style>
