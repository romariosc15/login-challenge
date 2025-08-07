<script setup>
import { defineProps } from 'vue';
const { notification } = defineProps({
  notification: Object,
});
</script>

<template>
  <div class="notification-container" :class="`notification-container-${notification.type}`">
    <img
      v-if="notification.type === 'success'"
      class="notification-image"
      src="../assets/images/check.png"
      alt=""
    />
    <img
      v-else-if="notification.type === 'error'"
      class="notification-image"
      src="../assets/images/error.png"
      alt=""
    />
    <div class="notification-content">
      <h5 class="notification-title">{{ notification.title }}</h5>
      <p class="notification-message">{{ notification.message }}</p>
    </div>
  </div>
</template>

<style scoped>
.notification-container-success {
  background-color: var(--success-bg);
  border: 1px solid var(--success-border);
}
.notification-container-error {
  background-color: var(--error-bg);
  border: 1px solid var(--error-border);
}
.notification-container {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  padding: var(--padding-lg);
  border-radius: var(--radius-lg);
  position: fixed;
  top: 16px;
  right: 16px;
}

.notification-image {
  width: 50px;
}

.notification-title {
  font-weight: 600;
  margin-bottom: var(--margin-md);
}

.notification-message {
  color: var(--color-secondary);
}
</style>
