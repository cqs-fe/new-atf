import Vue from 'vue';
// import App from './index.vue';
import Sidebar from '@/components/sidebar/index.vue';
import Topbar from '@/components/topbar/index.vue';
import Footerbar from '@/components/footerbar/index.vue';

new Vue({
  el: '#root',
  components: { Sidebar, Topbar, Footerbar }
})