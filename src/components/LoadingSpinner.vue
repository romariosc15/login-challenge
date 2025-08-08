<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner {
  width: var(--font-size-xs);
  height: var(--font-size-xs);
  margin-left: auto;
  margin-right: auto;
  border: 3px solid transparent;
  border-top: 4px solid var(--color-text);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
