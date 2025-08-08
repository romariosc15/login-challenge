import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NotificationMessage from '../../components/NotificationMessage.vue';

const mountNotification = (type, title, message) => {
  return mount(NotificationMessage, {
    props: {
      notification: { type, title, message },
    },
  });
};

describe('NotificationMessage.vue', () => {
  it('renders success notification correctly', () => {
    const wrapper = mountNotification(
      'success',
      'Signed in',
      'You will be redirected to your dashboard.',
    );

    expect(wrapper.classes()).toContain('notification-container-success');
    expect(wrapper.find('img').attributes('src')).toContain('check.png');
    expect(wrapper.find('.notification-title').text()).toBe('Signed in');
    expect(wrapper.find('.notification-message').text()).toBe(
      'You will be redirected to your dashboard.',
    );
  });

  it('renders error notification correctly', () => {
    const wrapper = mountNotification('error', 'Sign in error', 'Invalid credentials.');

    expect(wrapper.classes()).toContain('notification-container-error');
    expect(wrapper.find('img').attributes('src')).toContain('error.png');
    expect(wrapper.find('.notification-title').text()).toBe('Sign in error');
    expect(wrapper.find('.notification-message').text()).toBe('Invalid credentials.');
  });

  it('does not render image for unknown type', () => {
    const wrapper = mountNotification('', '', '');

    expect(wrapper.find('img').exists()).toBe(false);
  });
});
