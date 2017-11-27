<template>
	<aside id="sidebar-wrapper">
  <div id="sidebar" class="nav-collapse">
    <ul class="sidebar-menu">
      <li class="sub-menu" :class="{ active:activeIndex==item.key }" v-for="item of menuItems" :key="item.key" @click="activeSub(item.key)">
        <a>
          <span>{{item.name}}</span>
          <span class="arrow" :class="{ open: activeIndex==item.key }"></span>
        </a>
        <transition
					:duration="1000"
					v-on:before-enter="beforeEnter"
					v-on:enter="enter"
					v-on:leave="leave"
          v-on:after-enter="afterEnter"
          v-on:before-leave="beforeLeave"
          v-on:after-leave="afterLeave"
				>
				 <ul class="sub" v-show="activeIndex==item.key">
						<li :class="['sub-menu', { active: activeSubIndex==subItem.key }]"  v-for="subItem of item.subMenuItems" :key="subItem.key">
							<a :href="subItem.url">
								<span>{{subItem.name}}</span>
							</a>
						</li>
					</ul>
				</transition>
      </li>
    </ul>
    <!-- sidebar menu end-->
  </div>
</aside>
</template>

<script src="./index.js"></script>