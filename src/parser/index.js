import Vue from 'vue';
import Sidebar from '@/components/sidebar/index.vue';
import Topbar from '@/components/topbar/index.vue';
import Footerbar from '@/components/footerbar/index.vue';

import Xml from './xml/index.vue';
import './index.scss';

new Vue({
  el: '#root',
  data: {
    activeTab: 'json'
  },
  components: { Sidebar, Topbar, Footerbar, Xml }
})