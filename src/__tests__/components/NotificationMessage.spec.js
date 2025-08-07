import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Notification from './Notification.vue';

describe('Notification.vue', () => {
  it('renders success notification correctly', () => {
    const notification = {
      type: 'success',
      title: 'Success!',
      message: 'Your action was successful.',
    };

    const wrapper = mount(Notification, {
      props: { notification },
    });

    expect(wrapper.classes()).toContain('notification-container-success');
    expect(wrapper.find('img').attributes('src')).toContain('check.png');
    expect(wrapper.find('.notification-title').text()).toBe(notification.title);
    expect(wrapper.find('.notification-message').text()).toBe(notification.message);
  });

  it('renders error notification correctly', () => {
    const notification = {
      type: 'error',
      title: 'Error!',
      message: 'Something went wrong.',
    };

    const wrapper = mount(Notification, {
      props: { notification },
    });

    expect(wrapper.classes()).toContain('notification-container-error');
    expect(wrapper.find('img').attributes('src')).toContain('error.png');
    expect(wrapper.find('.notification-title').text()).toBe(notification.title);
    expect(wrapper.find('.notification-message').text()).toBe(notification.message);
  });

  it('does not render image for unknown type', () => {
    const notification = {
      type: 'info',
      title: 'Info',
      message: 'Just so you know.',
    };

    const wrapper = mount(Notification, {
      props: { notification },
    });

    expect(wrapper.find('img').exists()).toBe(false);
  });
});
