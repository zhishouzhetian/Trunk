import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
	mode: 'history',
  	routes: [
	  	 {
	  	 	path: '/',
		    component: resolve => require(['@/pages/login'], resolve),
		    name: 'Login'
	  	}, {
			    path: '/404',
			    component: resolve => require(['@/pages/404'], resolve),
			    name: ''
	  	}, {
			    path: '/findPsd',
			    component: resolve => require(['@/pages/findPsd'], resolve),
			    name: '修改密码'
	  	}, {
		    path: '*',
		    redirect: {
		      path: '/404'
		    }
	  	}, {
      	path: '/',
	    component: resolve => require(['@/pages/index'], resolve),
	    name: '首页',
//	    redirect: '/virtualMachineApply',
	    children: [
	   		 {
		    	path: '/virtualMachineApply',
			    component: resolve => require(['@/pages/virtualMachineApply'], resolve),
			    name: '虚拟机申请'
		   	}, {
		    	path: '/myApplyFor',
			    component: resolve => require(['@/pages/myApplyFor'], resolve),
			    name: '我的申请'
		   	}, {
		    	path: '/inquire',
			    component: resolve => require(['@/pages/inquire'], resolve),
			    name: '虚拟机搜索'
		   	}, {
		    	path: '/backlog',
			    component: resolve => require(['@/pages/backlog'], resolve),
			    name: '待办'
		   	}, {
		    	path: '/finished',
			    component: resolve => require(['@/pages/finished'], resolve),
			    name: '已办'
		   	}
	    ]
    }
  ]
})
