import './index.css';

export default {
    name: 'sidebar',
    props: {
        activeIndex: {
            default: 0
        },
        activeSubIndex: {
            default: '0-0'
        }
    },
    data () {
        return {
            menuItems: [{
                key: '0',
                name: '系统管理',
                subMenuItems: [{
                    key: '0-0',
                    name: '用户管理',
                    url: 'usermanagement.html'
                }]
            }, {
                key: '1',
                name: '测试过程配置',
                subMenuItems: [{
                    key: '1-0',
                    name: '测试阶段',
                    url: 'testphase.html'
                }, {
                    key: '1-1',
                    name: '业务线管理',
                    url: 'productLine.html'
                }]
            }, {
                key: '2',
                name: '测试基础设施',
                subMenuItems: [{
                    key: '2-0',
                    name: '被测系统管理',
                    url: 'aut.html'
                }, {
                    key: '1-1',
                    name: '自动化构件管理',
                    url: 'component.html'
                }]
            }, {
                key: '3',
                name: '项目测试',
                subMenuItems: [{
                    key: '3-0',
                    name: '测试任务',
                    url: 'testitems.html'
                }, {
                    key: '3-1',
                    name: '测试项目管理',
                    url: 'testProject.html'
                }, {
                    key: '3-2',
                    name: '测试用例管理',
                    url: 'caseManagement.html'
                }, {
                    key: '3-3',
                    name: '测试资源管理',
                    url: 'datatable.html'
                }, {
                    key: '3-4',
                    name: '测试场景',
                    url: 'scene.html'
                }, {
                    key: '3-5',
                    name: '测试轮次管理',
                    url: 'testroundManage.html'
                }, {
                    key: '3-6',
                    name: '测试计划及执行',
                    url: 'testround.html'
                }, {
                    key: '3-7',
                    name: '执行记录管理',
                    url: 'testRecord.html'
                }]
            }, {
                key: '4',
                name: '测试资产库',
                subMenuItems: []
            }]
        }
    },
    methods: {
        activeSub (key) {
            this.activeIndex = key;
        },
        beforeEnter: function (el) {
            if (!el.dataset) el.dataset = {};
        
            el.style.height = '0';
        },
        enter: function (el, done) {
            el.dataset.oldOverflow = el.style.overflow;
            if (el.scrollHeight !== 0) {
              el.style.height = el.scrollHeight + 'px';
            } else {
              el.style.height = '';
            }
        
            el.style.overflow = 'hidden';
        },
        afterEnter: function(el) {
            el.style.height = '';
            el.style.overflow = el.dataset.oldOverflow;
        },
        beforeLeave: function(el) {
            if (!el.dataset) el.dataset = {};
            el.dataset.oldOverflow = el.style.overflow;    
            el.style.height = el.scrollHeight + 'px';
            el.style.overflow = 'hidden';
        },
        leave: function (el, done) {
            if (el.scrollHeight !== 0) {
                el.style.height = 0;
              }
        }, 
        afterLeave: function(el) {
            el.style.height = '';
            el.style.overflow = el.dataset.oldOverflow;
        }
    }
}