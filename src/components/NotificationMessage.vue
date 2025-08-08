<script setup>
import { computed } from 'vue';
const props = defineProps({
  notification: Object,
});
const imageSrc = computed(() => {
  switch (props.notification.type) {
    case 'success':
      return new URL('../assets/images/check.png', import.meta.url).href;
    case 'error':
      return new URL('../assets/images/error.png', import.meta.url).href;
    default:
      return null;
  }
});
</script>

<template>
  <div
    class="notification-container"
    :class="{
      'notification-container-success': props.notification.type === 'success',
      'notification-container-error': props.notification.type === 'error',
    }"
  >
    <img
      v-if="imageSrc"
      class="notification-image"
      :src="imageSrc"
      :alt="`${props.notification.type} icon`"
    />
    <div class="notification-content">
      <h5 class="notification-title">{{ props.notification.title }}</h5>
      <p class="notification-message">{{ props.notification.message }}</p>
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
  left: 50%;
  transform: translateX(-50%);
}

.notification-image {
  width: 50px;
}

.notification-title {
  font-weight: 600;
  font-size: var(--font-size-lg);
  margin-bottom: var(--margin-md);
}

.notification-message {
  color: var(--color-secondary);
}
</style>
