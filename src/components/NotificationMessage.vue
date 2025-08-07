<script setup>
import { defineProps } from 'vue';
const { notification } = defineProps({
  notification: Object,
});
</script>

<template>
  <div class="notification-container" :class="`notification-container-${notification.type}`">
    <h5 class="notification-title">{{ notification.title }}</h5>
    <p class="notification-message">{{ notification.message }}</p>
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
  padding: var(--padding-lg);
  border-radius: var(--radius-lg);
  position: fixed;
  top: 16px;
  right: 16px;
}
.notification-title {
  font-weight: 600;
  margin-bottom: var(--margin-md);
}

.notification-message {
  color: var(--color-secondary);
}
</style>
