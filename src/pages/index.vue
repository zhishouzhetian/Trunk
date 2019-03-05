<template>
	<div id="Index">
	<el-container>
	  <el-header>
	  	<img src="../../static/img/logo.png" width="80" height="70"/>虚拟机管理
				<el-dropdown trigger="click" style="float: right;">
								<span class="el-dropdown-link" style="padding-left: 30px;cursor: pointer; color: white;display: inline-block;height: 46px;background:url(../../static/img/admins.png)0px 22px no-repeat;">
							    {{userName}}&nbsp;<i class="el-icon-caret-bottom el-icon--right"></i>
							  </span>
			    <el-dropdown-menu slot="dropdown">
			            <span @click="$router.push('/findPsd')"><el-dropdown-item><i class="el-icon-edit"></i>&nbsp;&nbsp;修改密码</el-dropdown-item></span>
			            <span @click="outFn"><el-dropdown-item><i class="el-icon-circle-cross"></i>&nbsp;&nbsp;退出</el-dropdown-item></span>
			          </el-dropdown-menu>
       			</el-dropdown>
	  </el-header>
	  <el-container>
	    <el-aside width="200px">
	    	<nav-Add :sidebar="sidebar"></nav-Add>
	    </el-aside>
	    <el-main>
	    	<router-view></router-view>
	    </el-main>
	  </el-container>
	</el-container>
	</div>
</template>
<script>
	import navAdd from '@/components/navAdd';
	export default {
		components: {
			navAdd
		},
		data() {
			return {
				sidebar: [],
				userName: '',
				menu: [
    					{
     						code: '999999',
     						desc: '首页',
     						webUrl: '/home',
     						icon: 'icon-shouye1-copy'
     					}, {
     						code: '100000',
     						desc: '概览',
     						webUrl: '/overview',
     						icon: 'icon-wenjian',
     						children: [
     							{
     								code: '100001',
		     						desc: '概览子页面',
		     						webUrl: 'system'
     							}
     						]
     					}, {
     						code: '200000',
     						desc: '系统管理',
     						webUrl: '/system',
     						icon: 'icon-xitongguanli',
     						children: [
     							{
     								code: '200001',
		     						desc: '系统管理子页面',
		     						webUrl: 'system'
     							}
     						]
     					}]
			}
		},
		methods: {
			addTab(data) {
       			 let targetName = '/' + data.address;
       			 this.$router.push(targetName);
			},
			outFn() {
				this.$axios.get('logout').then(res => {
						if (res.data === "已退出登录!") {
							this.$router.push('/');
						}
				})
			}
		},
		mounted() {
			 this.$EventBus.$on('addTab', (data) => {
         		this.addTab(data);
			});
		},
		created() {
			this.userName = sessionStorage.relName
			this.sidebar = JSON.parse(sessionStorage.menu)
		}
		
	}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    border: 0;
  }
  .el-menu {
          border: 0;
  }
  .el-menu-item:hover {
          background-color: rgba(79,88,106,1) !important;
  }
  .el-submenu__title:hover {
          background-color: rgba(79,88,106,1) !important;
  }
</style>