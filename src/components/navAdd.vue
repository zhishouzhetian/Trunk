<template>
	<el-menu background-color="rgba(50,55,66,1)" text-color='#A1B0C8' active-text-color='#fff'  class="el-menu-vertical-demo"   :router='false' :unique-opened='true'>
	            <keep-alive v-for="item in sidebar" :key='item.id' include="">
	                <el-menu-item @click='handleClick(item)'  :index="item.name" v-if="!(item.children&&item.children.length)"><span slot='title'>{{item.name}}</span></el-menu-item>
	                <el-submenu background-color="#fff"  v-if="item.children&&item.children.length" :index='item.name'>
	                        <template slot="title"><span slot='title'>{{item.name}}</span></template>
	                        <div v-for="item2 in item.children" :key='item2.id'>
	                                <el-menu-item  @click='handleClick(item2)' v-if="!(item2.children&&item2.children.length)" :index="item2.name"><span slot='title'>{{item2.name}}</span></el-menu-item>
	                        </div>
	                </el-submenu>
	            </keep-alive>
    </el-menu>
</template>
<script>
	export default {
		props: ['sidebar'],
		methods: {
			handleClick(data) {
				this.$EventBus.$emit('addTab', data);
			}
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