import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
import { useAuthStore } from '@/stores/auth';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createWebHistory } from 'vue-router';

vi.mock('@/stores/auth', async () => {
  const actual = await vi.importActual('@/stores/auth');
  return {
    ...actual,
    useAuthStore: vi.fn(),
  };
});

describe('LoginForm.vue', () => {
  let loginMock;

  beforeEach(() => {
    loginMock = vi.fn().mockResolvedValue(undefined);

    useAuthStore.mockReturnValue({
      login: loginMock,
      isAuthenticated: false,
      isLoading: false,
      isNotificationVisible: false,
      notification: {
        title: '',
        message: '',
        type: '',
        isVisible: false,
      },
    });
  });

  const createRouterInstance = () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/dashboard', name: 'dashboard', component: { template: '<div>Dashboard</div>' } },
      ],
    });
    const routerPushSpy = vi.spyOn(router, 'push');
    return { router, routerPushSpy };
  };

  it('renders login form correctly', () => {
    const { router } = createRouterInstance();

    const wrapper = mount(LoginForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
          router,
        ],
      },
    });

    expect(wrapper.find('input#email').exists()).toBe(true);
    expect(wrapper.find('input#password').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('toggles password visibility', async () => {
    const { router } = createRouterInstance();

    const wrapper = mount(LoginForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
          router,
        ],
      },
    });

    const toggleButton = wrapper.find('.login-password-button');
    const passwordInput = wrapper.find('input#password');

    expect(passwordInput.attributes('type')).toBe('password');
    await toggleButton.trigger('click');
    expect(passwordInput.attributes('type')).toBe('text');
  });

  it('calls login and redirects on success', async () => {
    const { router, routerPushSpy } = createRouterInstance();

    useAuthStore.mockReturnValue({
      login: loginMock,
      isAuthenticated: true,
      isLoading: false,
      isNotificationVisible: false,
      notification: {
        title: '',
        message: '',
        type: '',
        isVisible: false,
      },
    });

    const wrapper = mount(LoginForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
          router,
        ],
      },
    });

    await wrapper.find('input#email').setValue('romariosc15@outlook.com');
    await wrapper.find('input#password').setValue('123-123');
    await wrapper.find('form').trigger('submit.prevent');

    expect(loginMock).toHaveBeenCalledWith({
      email: 'romariosc15@outlook.com',
      password: '123-123',
    });

    vi.useFakeTimers();
    vi.advanceTimersByTime(2500);
    expect(routerPushSpy).toHaveBeenCalledWith('/dashboard');
  });
});
