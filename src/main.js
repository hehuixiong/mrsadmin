// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import ElementUi from 'element-ui';
Vue.use(ElementUi)


//导入login模块
import login from './components/admin/account/login.vue';
import layout from './components/admin/layout.vue';
import goodslist from './components/admin/goods/goodslist.vue';
import goodsadd from './components/admin/goods/goodsadd.vue';
import goodsedit from './components/admin/goods/goodsedit.vue';
import goodscatelist from './components/admin/goods/goodscatelist.vue';

//定义路由规则
var router = new VueRouter({
  routes: [{
    name: 'default', //自动 跳转到指定页面
    path: '/',
    redirect: '/admin'
  }, {
    name: 'login', //登录页面
    path: '/login',
    component: login
  }, {
    name: 'layout', //主页面
    path: '/admin',
    component: layout,
    children: [{
        name: 'goodslist', //购物管理-内容管理页面
        path: 'goodslist',
        component: goodslist
      },
      {
        name: 'goodsadd', //购物管理-内容管理-新增页面
        path: 'goodsadd',
        component: goodsadd
      },
      {
        name: 'goodsedit', //购物管理-内容管理-编辑页面
        path: 'goodsedit/:id',
        component: goodsedit
      },
      {
        name: 'goodscatelist', //购物管理类别管理页面
        path: 'goodscatelist',
        component: goodscatelist
      }
    ]
  }]
})

//导入axios的使用
import axios from 'axios';
//绑定到Vue原型中，将来每次组件都可以使用，this.$http去调用即可
Vue.prototype.$http = axios;
//设定axios的基本url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';
//设定axios的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;

import '../static/theme_rms/index.css';
import '../static/css/site.css';

//判断用户是否登录过，如果没有登录过，跳转到login页面
// router.beforeEach((to, from, next) => {
//   if (to.name == "login") {
//     next();
//   } else {
//     axios.get("/admin/account/islogin").then(res => {
//       if (res.data.code == "logined") {
//         next();
//       } else {
//         router.push({
//           name: "login"
//         });
//       }
//     });
//   }
// })
//过滤器
Vue.filter("addTime", function (input, gs) {
  var date = new Date(input);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var mi = date.getMinutes();
  var s = date.getSeconds();
  if (gs == "YYYY-MM-DD") {
    return y + "-" + m + "-" + d;
  } else {
    return y + "-" + m + "-" + d + " | " + h + ":" + mi + ":" + s;
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: create => create(App)
})
