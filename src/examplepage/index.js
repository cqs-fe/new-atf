import Vue from 'vue';
import Sidebar from '@/components/sidebar/index.vue';
import Topbar from '@/components/topbar/index.vue';
import Footerbar from '@/components/footerbar/index.vue';
import './index.css';
import ElementUI from 'element-ui';


Vue.use(ElementUI, { size: 'small' });
new Vue({
  el: '#root',
  data: {
    tableData: [{
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }]
  },
  components: { Sidebar, Topbar, Footerbar }
})