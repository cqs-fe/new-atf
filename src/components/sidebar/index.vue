<template>
	<aside>
  <div id="sidebar" class="nav-collapse">
    <ul class="sidebar-menu">
      <li class="sub-menu 0" @click="activeSub($event)">
        <a href="javascript:;" class="">
          <span class="">系统管理</span>
          <span class="arrow"></span>
        </a>
				<transition
					:duration="1000"
					v-on:before-enter="beforeEnter"
					v-on:enter="enter"
					v-on:leave="leave"
					v-bind:css="false"
				>
				 <ul class="sub 0-ul" v-if="subIndex==0">
						<li class="sub-menu">
							<a class="0-0" href="usermanagement.html">
								<span>用户管理</span>
							</a>
						</li>
						<!-- <li class="sub-menu">
									<a class="0-1" href="#">
											<span>权限设置</span>
									</a>
							</li>
							<li class="sub-menu">
									<a class="0-2" href="#">
											<span>数据字典设置</span>
									</a>
							</li> -->
					</ul>
				</transition>
      </li>
      <li class="sub-menu 1">
        <a href="javascript:;" class="">
          <!-- <i class="icon-th"></i> -->
          <span>测试过程配置</span>
          <span class="arrow"></span>
        </a>
        <ul class="sub 1-ul">
          <li class="sub-menu">
            <a class="1-0" href="testphase.html">
              <span>测试阶段</span>
            </a>
          </li>
          <li class="sub-menu">
            <a class="1-1" href="productLine.html">
              <span>业务线管理</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="sub-menu 2">
        <a href="javascript:;" class="">
          <!-- <i class="icon-th"></i> -->
          <span>测试基础设施</span>
          <span class="arrow"></span>
        </a>
        <ul class="sub 2-ul">
          <li class="sub-menu">
            <a class="2-0" href="aut.html">
              <span>被测系统管理</span>
            </a>
          </li>
          <li class="sub-menu">
            <a class="2-1" href="component.html">
              <span>自动化构件管理</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="sub-menu 3">
        <a href="javascript:;" class="">
          <span>项目测试</span>
          <span class="arrow"></span>
        </a>
        <ul class="sub 3-ul">
          <li class="sub-menu">
            <a class="3-0" href="testitems.html">
              <span>测试任务</span>
            </a>
          </li>
          <li class="sub-menu">
            <a class="3-1" href="testProject.html">
              <span>测试项目管理</span>
            </a>
          </li>
          <li class="sub-menu">
            <a class="3-2" href="caseManagement.html">
              <span>测试用例管理</span>
            </a>
          </li>
          <li class="sub-menu">
            <a class="3-3" href="datatable.html">
              <span>测试资源管理</span>
            </a>
          </li>
          <li class="sub-menu">
            <a class="3-4" href="scene.html">
              <span>测试场景</span>
            </a>
          </li>
          <li class="sub-menu">
            <a class="3-5" href="testroundManage.html">
              <span>测试轮次管理</span>
            </a>
          </li>
          <li class="sub-menu">
            <a class="3-6" href="testround.html">
              <span>测试计划及执行</span>
            </a>
          </li>
          <li class="sub-menu">
            <a class="3-7" href="testRecord.html">
              <span>执行记录管理</span>
            </a>
          </li>
          <!-- <li class="sub-menu">
								<a class="3-8" href="#">
										<span>统计及度量</span>
								</a>
						</li> -->
        </ul>
      </li>
      <li class="sub-menu 4">
        <a href="javascript:;" class="">
          <!-- <i class="icon-th"></i> -->
          <span>测试资产库</span>
          <span class="arrow"></span>
        </a>
        <ul class="sub 4-ul">

        </ul>
      </li>
    </ul>
    <!-- sidebar menu end-->
  </div>
</aside>
</template>

<script>
	import './index.css';
	import template from './index.tpl';

	export default {
		name: 'sidebar',
		props: {
			
		},
		data () {
			return {
				subIndex: 2
			}
		},
		methods: {
			activeSub (e) {
				this.subIndex = this.subIndex == 0 ? 3 : 0;
			},
			beforeEnter: function (el) {
				el.style.height = el.style.height + 'px'
				// el.style.transform.lOrigin = 'left'
			},
			enter: function (el, done) {
				// Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
				// Velocity(el, { fontSize: '1em' }, { complete: done })
				done()
			},
			leave: function (el, done) {
				// el.style.height = '0px'
				// Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
				// Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
				// Velocity(el, {
				// 	rotateZ: '45deg',
				// 	translateY: '30px',
				// 	translateX: '30px',
				// 	opacity: 0
				// }, { complete: done })
				done()
			}
		}
	}
</script>