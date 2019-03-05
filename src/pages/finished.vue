<template>
	<div id="backlog">
		<div class="tableWrapper">
	      <el-table border stripe   :data="tableData" style="width: 100%">
	        <el-table-column align='center' :show-overflow-tooltip="true" :prop="item.prop" :label="item.label" :width="item.width" v-for="item in tableCols" :key="item.prop" :formatter="item.formatter"></el-table-column>
	      	<el-table-column align='center' label="操作" width="180">
	          <template slot-scope="scope">
	 					<!--<el-button type="text" @click="fn(scope)">详情</el-button>-->
	 					<el-button  @click="fn(scope)">详情</el-button>
	 				
	         </template>
	        </el-table-column>
	      </el-table>
    	</div>
    	<div class="pagerWrapper" style="float: right;">
		      <div class="block">
		        <el-pagination  @size-change="" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
		        </el-pagination>
		      </div>
		</div>
    	<new-add ref='newAdd'></new-add>
	</div>
</template>

<script>
	import {
    	dateFormat
 	} from '@/common/js/public.js'
	import newAdd from '@/components/newAdd'
	export default {
		components: {
			newAdd
		},
		data() {
			return {
			tableData: [{
		          id: 1,
		          section: 'vvvev11111111111',
		          vmname: 'wevwe',
		          systemname: 'ewew',
		          memory: 'weew',
		          ram: 'weew',
		          cpu: 'ewew',
		          number: 122,
		          startdate: '2019-1-23',
		          enddate: '2019-1-23',
		          remark: '测试嗷嗷嗷啊啊嗷嗷嗷啊啊嗷嗷嗷啊啊'
			}],
			tableCols: [{
				prop: 'applicant',
		        label: '申请人',
		        width: ''
		        }, {
		        prop: 'section',
		        label: '申请部门',
		        width: ''
		        }, {
		        prop: 'vmname',
		        label: '虚拟机名称',
		        width: ''
		        }, {
		        prop: 'systemname',
		        label: '操作系统',
		        width: ''
//		        },
		        }, {
		        prop: 'ram',
		        label: '内存',
		        width: '80'
		        }, {
		        prop: 'memory',
		        label: '硬盘',
		        width: ''
		        }, {
		        prop: 'cpu',
		        label: 'CPU',
		        width: ''
		        }, {
//				{
		        prop: 'number',
		        label: '数量',
		        width: '70'
		        }, {
		        prop: 'startdate',
		        label: '开始时间',
		        width: '',
		        formatter: (row, column) => {
		          if (row.startdate) {
		             return row.startdate ? dateFormat(new Date(row.startdate * 1), "yyyy-MM-dd") : '';
		          } else {
		            return ''
		          	}
		         }
		        }, {
		        prop: 'enddate',
		        label: '结束时间',
		        width: '',
		        formatter: (row, column) => {
		          if (row.enddate) {
		             return row.enddate ? dateFormat(new Date(row.enddate * 1), "yyyy-MM-dd") : '';
		          } else {
		            return ''
		          	}
		         }
		        }, {
		        prop: 'remark',
		        label: '备注',
		        width: ''
		        }],
		        total: 0,
			    pageSize: 15,
			    pageNum: 1
			}
		},
		methods: {
			fn(scope) {
				this.$refs.newAdd.dialogFn(scope)
			},
			handleCurrentChange(val) {
			      this.pageNum = val;
			      this.tableFn();
			 },
			tableFn() {
				this.$axios.post('VM/myOrder', {
					id: 1,
					pagesize: this.pageSize,
					currentpage: this.pageNum
				}).then(res => {
					this.tableData = res.data.totalList;
					this.total = res.data.totalRecord;
				})
			}
		},
		mounted() {
			this.tableFn()
		}
	}
</script>

<style>
</style>