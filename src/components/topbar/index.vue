<template>
  <header class="header white-bg">
    <div class="header-container">
      <div class="sidebar-toggle-box">
          <div data-original-title="点击折叠" data-placement="right" class="icon-reorder tooltips"></div>
      </div>
      <!--logo start-->
      <a class="logo"><span>ATF</span></a>
      <!--logo end-->

      <div class="top-nav">
        <!--user info start-->
        <ul class="nav pull-right top-menu">
          <!-- user login dropdown start-->
          <li class="dropdown">
              <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                <img alt="" src="../../../assets/images/avatar1.jpg">
                <span class="username">李唤</span>
                <b class="caret"></b>
              </a>
              <ul class="dropdown-menu extended logout">
                <div class="log-arrow-up"></div>
                <li><a href="#"><i class="icon-suitcase"></i>个人中心</a></li>
                <li><a href="#"><i class="icon-cog"></i>设置</a></li>
                <li><a href="#"><i class="icon-bell-alt"></i> 通知</a></li>
                <li><a id="logout"><i class="icon-key"></i> 注销</a></li>
              </ul>
          </li>
          <!-- user login dropdown end -->
        </ul>
        <!--search & user info end-->
      </div>
      <!-- <script type="text/javascript">
          document.querySelector('#logout').onclick = function() {
              if(sessionStorage.getItem('userId')) {
                  sessionStorage.setItem('userId', '')
                  document.location.href = 'Login.html'
              }
          }
      </script> -->
    </div>
  </header>
</template>

<script>
 export default {
   name: 'topbar',
   data () {}
 }
</script>

<style scoped>
.header {
  min-height: 60px;
  padding: 0 30px;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1002;
}
.white-bg {
    background: #fff;
    border-bottom: 1px solid #f1f2f7;
}

.wrapper {
    display: inline-block;
    margin-top: 60px;
    padding: 15px;
    width: 100%;
}

a.logo {
    font-size: 24px;
    color: #2e2e2e;
    float: left;
    margin-top: 14px;
    text-transform: uppercase;
}

a.logo:hover, a.logo:focus {
    text-decoration: none;
    outline: none;
}

a.logo span {
    color: #FF6C60;
}
/*notification*/
.top-nav {
  overflow: visible;
}
#top_menu .nav > li, ul.top-menu > li {
    float: left;
}

.notify-row {
    float: left;
    margin-top: 15px;
    margin-left: 65px;
}

ul.top-menu > li > a {
    color: #666666;
    font-size: 16px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    border:1px solid #f0f0f8 !important;
    padding: 2px 6px;
    margin-right: 15px;
}

ul.top-menu > li > a:hover, ul.top-menu > li > a:focus {
    border:1px solid #f0f0f8 !important;
    background-color: #fff!important;
    border-color: #f0f0f8 !important;
    text-decoration: none;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    color: #2E2E2E !important;
}

.notify-row .badge {
    position: absolute;
    right: -10px;
    top: -10px;
    z-index: 100;
}

.dropdown-menu.extended {
    max-width: 300px !important;
    min-width: 160px !important;
    top: 42px;
    width: 235px !important;
    padding: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.176) !important;
    border: none !important;
    border-radius: 4px;
    -webkit-border-radius: 4px;
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
    /* Safari and Chrome */
    .dropdown-menu.extended  {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.176) !important;
    };
}

.dropdown-menu.extended li p {
    background-color: #F1F2F7;
    color: #666666;
    margin: 0;
    padding: 10px;
    border-radius: 4px 4px 0px 0px;
    -webkit-border-radius: 4px 4px 0px 0px;
}

.dropdown-menu.extended li p.green {
    background-color: #a9d86e;
    color: #fff;
}

.dropdown-menu.extended li p.red {
    background-color: #ff6c60;
    color: #fff;
}

.dropdown-menu.extended li p.yellow {
    background-color: #fcb322;
    color: #fff;
}

.dropdown-menu.extended li a {
    border-bottom: 1px solid #EBEBEB !important;
    font-size: 12px;
    list-style: none;
}

.dropdown-menu.extended li a {
    padding: 15px 10px !important;
    width: 100%;
    display: inline-block;
}

.dropdown-menu.extended li a:hover {
    background-color: #F7F8F9 !important;
    color: #2E2E2E;
}

.dropdown-menu.tasks-bar .task-info .desc {
    font-size: 13px;
    font-weight: normal;
}

.dropdown-menu.tasks-bar .task-info .percent {
    display: inline-block;
    float: right;
    font-size: 13px;
    font-weight: 600;
    padding-left: 10px;
    margin-top: -4px;
}

.dropdown-menu.extended .progress {
    margin-bottom: 0 !important;
    height: 10px;
}

.dropdown-menu.inbox li a .photo img {
    border-radius: 2px 2px 2px 2px;
    float: left;
    height: 40px;
    margin-right: 4px;
    width: 40px;
}

.dropdown-menu.inbox li a .subject {
    display: block;
}

.dropdown-menu.inbox li a .subject .from {
    font-size: 12px;
    font-weight: 600;
}

.dropdown-menu.inbox li a .subject .time {
    font-size: 11px;
    font-style: italic;
    font-weight: bold;
    position: absolute;
    right: 5px;
}

.dropdown-menu.inbox li a .message {
    display: block !important;
    font-size: 11px;
}

.top-nav  {
    margin-top: 7px;
}

.top-nav ul.top-menu > li .dropdown-menu.logout {
    width: 268px !important;

}

.top-nav li.dropdown .dropdown-menu {
    float: right;
    right: 0;
    left: auto;
}

.dropdown-menu.extended.logout > li {
    float: left;
    text-align: center;
    width: 33.3%;
}

.dropdown-menu.extended.logout > li:last-child {
    float: left;
    text-align: center;
    width: 100%;
    background: #a9d96c;
    border-radius: 0 0 3px 3px;
}

.dropdown-menu.extended.logout > li:last-child > a, .dropdown-menu.extended.logout > li:last-child > a:hover {
    color: #fff;
    border-bottom: none !important;
    text-transform: uppercase;
}

.dropdown-menu.extended.logout > li:last-child > a:hover > i{
    color: #fff;
}

.dropdown-menu.extended.logout > li > a {
    color: #a4abbb;
    border-bottom: none !important;
}

.dropdown-menu.extended.logout > li > a:hover {
    background: none !important;
    color: #50c8ea;
}

.dropdown-menu.extended.logout > li > a:hover i {
    color: #50c8ea;
}

.dropdown-menu.extended.logout > li > a i {
    font-size: 17px;
}

.dropdown-menu.extended.logout > li > a > i {
    display: block;
}

.top-nav .username {
    font-size: 13px;
    color: #555555;
}

.top-nav ul.top-menu > li > a {
    border: 1px solid #eeeeee;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    padding: 6px;
    background: none;
    margin-right: 0;
}
.top-nav ul.top-menu > li {
    margin-left: 10px;
}

.top-nav ul.top-menu > li > a:hover, .top-nav ul.top-menu > li > a:focus {
    border:1px solid #F1F2F7;
    background: #F1F2F7;

}

.top-nav .dropdown-menu.extended.logout {
    top: 50px;
}

.top-nav .nav .caret {
    border-bottom-color: #A4AABA;
    border-top-color: #A4AABA;
}
.top-nav ul.top-menu > li > a:hover .caret {
    border-bottom-color: #000;
    border-top-color: #000;
}

.log-arrow-up {
    background: url("../../../assets/images/arrow-up.png") no-repeat;
    width: 20px;
    height: 11px;
    position: absolute;
    right: 20px;
    top: -10px;
}

/*----*/

.notify-arrow {
    border-style: solid;
    border-width: 0 9px 9px;
    height: 0;
    margin-top: 0;
    opacity: 0;
    position: absolute;
    left: 7px;
    top: -18px;
    transition: all 0.25s ease 0s;
    width: 0;
    z-index: 10;
    margin-top: 10px;
    opacity: 1;
}

.notify-arrow-yellow {
    border-color: transparent transparent #FCB322;
    border-bottom-color: #FCB322 !important;
    border-top-color: #FCB322 !important;
}
.notify-arrow-red {
    border-color: transparent transparent #ff6c60;
    border-bottom-color: #ff6c60 !important;
    border-top-color: #ff6c60 !important;
}
.notify-arrow-green {
    border-color: transparent transparent #a9d86e;
    border-bottom-color: #a9d86e !important;
    border-top-color: #a9d86e !important;
}
.top-menu img {
  height: 30px;
}
</style>

