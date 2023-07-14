// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import md5 from 'js-md5'
import VueCookies from 'vue-cookies'
// v-md-editor
import VMdEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs
import hljs from 'highlight.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
// gateway
axios.defaults.baseURL = 'http://127.0.0.1:20000/'
Vue.prototype.$md5 = md5
Vue.use(VueCookies)
VMdEditor.use(githubTheme, {
  Hljs: hljs
})
Vue.use(VMdEditor)
VMdPreview.use(githubTheme, {
  Hljs: hljs
})
Vue.use(VMdPreview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
