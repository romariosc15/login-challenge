import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { mockedFetch } from '@/utils/fetch';

export const useAuthStore = defineStore('auth', () => {
  let data = {};
  const token = ref(localStorage.getItem('token'));
  const isLoading = ref(false);
  const isNotificationVisible = ref(false);

  const notification = ref({
    title: '',
    message: '',
    type: '',
    isVisible: false,
  });

  const setNotification = ({ title, message, type }) => {
    notification.value = {
      title,
      message,
      type,
      isVisible: true,
    };
  };

  const isAuthenticated = computed(() => !!token.value);

  const login = async ({ email, password }) => {
    isLoading.value = true;
    try {
      const response = await mockedFetch('/api/auth/login', {
        body: JSON.stringify({ email: email, password: password }),
      });
      data = await response.json();
      if (data.type === 'success') {
        token.value = data.token;
        localStorage.setItem('token', data.token);
      }
      setNotification({
        title: data.title,
        message: data.message,
        type: data.type,
      });
    } finally {
      isLoading.value = false;
      isNotificationVisible.value = true;
      setTimeout(() => (isNotificationVisible.value = false), 2500);
    }
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem('token');
  };

  return {
    token,
    isLoading,
    isNotificationVisible,
    notification,
    isAuthenticated,
    login,
    logout,
  };
});
