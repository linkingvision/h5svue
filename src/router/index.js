import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(Router)
Vue.use(iView);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
