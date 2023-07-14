import Vue from 'vue'
import Router from 'vue-router'
// import MainContainer from '@/components/MainContainer'
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/views/Main'
import WriteNote from '@/views/WriteNote'
import ReadNote from '@/views/ReadNote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/write_note',
      name: 'WriteNote',
      component: WriteNote
    },
    {
      path: '/read_note',
      name: 'ReadNote',
      component: ReadNote
    }
  ]
})
