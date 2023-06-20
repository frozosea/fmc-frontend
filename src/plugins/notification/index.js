import ToastComponent from './js/Component.vue';
import {useToast} from './js/api';
import ToastPositions from './js/positions';

const ToastPlugin = {
  install: (app, options = {}) => {
    let instance = useToast(options);
    app.config.globalProperties.$notification = instance;
    app.provide('$notification', instance)
  }
}

export default ToastPlugin;
export {useToast, ToastPlugin, ToastComponent, ToastPositions}
